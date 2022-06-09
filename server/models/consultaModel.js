let CONSTANTS = require("../constantsProject");
const { obtenerColaboradorUsuario } = require("./colaboradorModel");

const NotaMedica = Parse.Object.extend(CONSTANTS.NOTAMEDICA);

/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns - Datos y el error
 */
function resultsConsulta(data, error) {
    return {
        data: data,
        error: error
    }
}

/**
 * asyncRegistrarConsulta función asíncrona para registrar los resultados de cada 
 * parámetro de un estudio.
 * @param {Object} data Información enviada en el body, debe incluir información del
 * resumen de consulta
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.registrarConsulta = async(data) => {

    // Crear un nuevo resumen de consulta y asignar la fecha y la nota
    const consulta = new NotaMedica;
    consulta.set(CONSTANTS.FECHA, data.fecha);
    consulta.set(CONSTANTS.NOTAS, data.notas);
    consulta.set(CONSTANTS.CURP, data.curp);

    // Buscar el paciente por curp para asignarlo al resumen de consulta.
    const tablaPaciente = Parse.Object.extend(CONSTANTS.PACIENTE);
    let query = new Parse.Query(tablaPaciente);
    query.equalTo(CONSTANTS.CURP, data.curp);
    
    try {
        const paciente = await query.first();

        // Mostrar error en caso de que el paciente no este registrado
        if (!paciente) {
            return results(null, 'No se encontró un paciente con ese CURP');
        }

        // Asignar el pointer de idPaciente al resumen de consulta, y asignar el usuario que lo creo.
        consulta.set(CONSTANTS.IDPACIENTE, paciente);

        try {
            const colaborador = await obtenerColaboradorUsuario(data.usuario);
            consulta.set(CONSTANTS.IDUSUARIO, colaborador.colaborador);
            
            // Guardar el nuevo resumen de consulta
            const results = await consulta.save()
            return resultsConsulta(results, null);       
        } catch (error) {
            return resultsConsulta(null, error.message);

        }
    } catch (error) {
        return resultsConsulta(null, error.message);
    }
}


/**
 * asyncObtenerEstudioPaciente Función asíncrona para obtener el resumen de consulta de un paciente.
 * @param {string} notas - Identificador del resumen. 
 * @returns Información del resumen de consulta de un paciente.
 */
exports.obtenerConsulta = async(curp) => {
    //Buscar paciente
    const queryObtenerIdPaciente = new Parse.Query(Paciente);
    queryObtenerIdPaciente.equalTo(CONSTANTS.CURP, curp);
    const idPaciente = await queryObtenerIdPaciente.first();

    const tablaNotaMedica = Parse.Object.extend(CONSTANTS.NOTAMEDICA);
    const queryObtenerConsulta = new Parse.Query(tablaNotaMedica);
    queryObtenerConsulta.include(CONSTANTS.NOTAS);
    queryObtenerConsulta.include(CONSTANTS.FECHA);
    queryObtenerConsulta.equalTo(CONSTANTS.IDPACIENTE, idPaciente);

    try {
        const consulta = await queryObtenerConsulta.find();
        const jsonConsulta = JSON.parse(JSON.stringify(consulta));

        //Obtener los estudios por nombre de tipo de estudio
        const arrConsulta = [];

        return {
            consulta: arrConsulta,
            notaMedica: jsonConsulta,
            error: null
        }

    } catch(error) {
        return {
            consultas: null,
            error: error.message
        }
    }
} 

