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
 * asyncRegistrarResultadosEstudio Función asíncrona para registrar los resultados de cada 
 * parámetro de un estudio.
 * @param {Object} data Información enviada en el body, debe incluir información del estudio
 * y el resultado de cada parámetro
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.registrarConsulta = async(data) => {
    console.log("hola", data)
    // Crear un nuevo estudio y asignar la fecha y las observaciones
    const consulta = new NotaMedica;
    consulta.set(CONSTANTS.FECHA, data.fecha);
    consulta.set(CONSTANTS.NOTAS, data.notas);
    consulta.set(CONSTANTS.CURP, data.curp);

    // Buscar el paciente por curp para asignarlo al estudio.
    const tablaPaciente = Parse.Object.extend(CONSTANTS.PACIENTE);
    let query = new Parse.Query(tablaPaciente);
    query.equalTo(CONSTANTS.CURP, data.curp);
    
    try {
        const paciente = await query.first();

        // Mostrar error en caso de que el paciente no este registrado
        if (!paciente) {
            return results(null, 'No se encontró un paciente con ese CURP');
        }

        // Asignar el pointer de idPaciente al estudio, y asignar la química que lo creo.
        consulta.set(CONSTANTS.IDPACIENTE, paciente);

        try {
            const colaborador = await obtenerColaboradorUsuario(data.usuario);
            consulta.set(CONSTANTS.IDUSUARIO, colaborador.colaborador);
            // Guardar el nuevo estudio
            const results = await consulta.save()
            return resultsConsulta(results, null);       
        } catch (error) {
            return resultsConsulta(null, error.message);

        }
    } catch (error) {
        return resultsConsulta(null, error.message);
    }
}