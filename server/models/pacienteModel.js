const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require('../constantsProject');


const Paciente = Parse.Object.extend(CONSTANTS.PACIENTE);


/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns 
 */
function resultsPaciente(data, error) {
    return {
        data: data,
        error: error
    }
}


/**
 * asyncRegistrarPaciente Función asíncrona para registrar un nuevo paciente, 
 * recibe los datos del paciente a guardar.
 * @param {object} data - Objeto que contenga la información del nuevo paciente
 * @returns Información del nuevo paciente o un error en caso de existir.
 */
exports.registrarPaciente = async(data) => {
    
    try {
        const pacienteCurp = await exports.buscarPorCurp(data.curp);
        if (pacienteCurp.data) {
            return resultsPaciente(pacienteCurp.data, 'El paciente ya se encuentra registrado con ese CURP o folio');
        }

        const paciente = new Paciente();

        // Estandarizar el formato de los nombres, cada nombre debe iniciar con mayúscula y luego incluir minúsculas.
        let nombre = data.nombre.split(' ');
        for (let i = 0; i < nombre.length; i++) {
            nombre[i] = nombre[i][0].toUpperCase() + nombre[i].substr(1).toLowerCase();
        }
        nombre = nombre.join(' ');

        // Estandarizar el formato de los apellidos paternos, cada apellidos debe iniciar con mayúscula y luego incluir minúsculas.
        let apellidoPaterno = data.apellidoPaterno.split(' ');
        for (let i = 0; i < apellidoPaterno.length; i++) {
            apellidoPaterno[i] = apellidoPaterno[i][0].toUpperCase() + apellidoPaterno[i].substr(1).toLowerCase();
        }
        apellidoPaterno = apellidoPaterno.join(' ');

        let apellidoMaterno;
        // Estandarizar el formato de los apellidos maternos, cada apellidos debe iniciar con mayúscula y luego incluir minúsculas.
        if (data.apellidoMaterno) {
            apellidoMaterno = data.apellidoMaterno.split(' ');
            for (let i = 0; i < apellidoMaterno.length; i++) {
                apellidoMaterno[i] = apellidoMaterno[i][0].toUpperCase() + apellidoMaterno[i].substr(1).toLowerCase();
            }
            apellidoMaterno = apellidoMaterno.join(' ');
        }

        paciente.set(CONSTANTS.CURP, data.curp);
        paciente.set(CONSTANTS.NOMBRE, nombre);
        paciente.set(CONSTANTS.APELLIDOPATERNO, apellidoPaterno);
        paciente.set(CONSTANTS.APELLIDOMATERNO, apellidoMaterno);
        paciente.set(CONSTANTS.FECHANACIMIENTO, data.fechaNacimiento);
        paciente.set(CONSTANTS.CORREO, data.correo);
        paciente.set(CONSTANTS.SEXO, data.sexo);
        paciente.set(CONSTANTS.ESTATURA, data.estatura);
        paciente.set(CONSTANTS.PESO, data.peso);
        paciente.set(CONSTANTS.TELEFONO, data.telefono);
        paciente.set(CONSTANTS.ACTIVO, true);

        try {
            const results = await paciente.save()
            return resultsPaciente(results, null);
        } catch (error) {
            return resultsPaciente(null, error.message);

        }

    } catch (error) {
        return resultsPaciente(null, error.message);
    }
}


/**
 * asyncBuscarPorCurp Función asíncrona para buscar a un paciente por su curp. 
 * @param {string} curp - Curp del paciente a buscar
 * @returns Información del paciente en caso de encontrarlo o un error en caso de no existir.
 */
exports.buscarPorCurp = async (curp) => {
    
    const Table = Parse.Object.extend(CONSTANTS.PACIENTE);
    let query = new Parse.Query(Table);
    query.equalTo(CONSTANTS.CURP, curp);

    try {
        const results = await query.first();
        // Enviar error si no existe un paciente con ese curp
        if ( !results ) {
            return resultsPaciente(null, 'No se encontró un paciente con ese CURP');
        }
        // Enviar el error si el paciente no esta activo
        if ( !results.get(CONSTANTS.ACTIVO)) {
            return resultsPaciente(null, 'El objeto fue eliminado anteriormente.');
        }
        return resultsPaciente(results, null);

    } catch (error) {
        return resultsPaciente(null, error.message);
    }
}


/**
 * asyncObtenerEstudiosPaciente Función asíncrona para consultar todos los estudios de un paciente de nefrovida
 * @param {string} curp - Curp del paciente a buscar
 * @param {string} nombre - Nombre del tipo de estudio a buscar
 * @param {string} ascendente - Los datos se ordenan por fecha de manera ascendente o no
 * @returns Todos los estudios de un paciente registrados en nefrovida
 */
 exports.obtenerEstudiosPaciente = async(curp, nombre, ascendente) => {

    const tablaEstudio = Parse.Object.extend(CONSTANTS.ESTUDIO);
    const queryObtenerEstudios = new Parse.Query(tablaEstudio);
    queryObtenerEstudios.include(CONSTANTS.IDTIPOESTUDIO);
    queryObtenerEstudios.include(CONSTANTS.IDUSUARIO);
    queryObtenerEstudios.equalTo(CONSTANTS.IDPACIENTE, curp);

    // Los datos se ordenan por fecha de manera ascendente o no
    if((ascendente == 'true') || (ascendente == ' ')) {
        queryObtenerEstudios.ascending(CONSTANTS.FECHA);
    }
    else {
        queryObtenerEstudios.descending(CONSTANTS.FECHA);
    }

    try {
        const estudios = await queryObtenerEstudios.find();
        const jsonEstudios = JSON.parse(JSON.stringify(estudios));

        //Guardar nombres de los tipos de estudio del paciente
        let arrTiposEstudio = [];
        jsonEstudios.map(el => {
            arrTiposEstudio.push(el.idTipoEstudio.nombre);
        })
        arrTiposEstudio = arrTiposEstudio.filter((item,index)=>{
            return arrTiposEstudio.indexOf(item) === index;
        })
        // Ordenar tipos de estudio
        arrTiposEstudio.sort();

        // Guardar en forma de json para el front
        let jsonTiposEstudio = [];
        for(let i=0; i<arrTiposEstudio.length; i++) {
            jsonTiposEstudio.push({
                value: arrTiposEstudio[i],
                option: arrTiposEstudio[i]
            })
        }

        //Obtener los estudios por nombre de tipo de estudio
        const arrEstudios = [];

        jsonEstudios.map(el => {
            // Por un tipo de estudio
            if(nombre == el.idTipoEstudio.nombre) {
                arrEstudios.push({
                    objectIdEstudio: el.objectId,
                    nombreTipoEstudio: el.idTipoEstudio.nombre,
                    codigoTipoEstudio: el.idTipoEstudio.codigo,
                    nombreColaborador: el.idUsuario.nombre + ' ' + el.idUsuario.apellidoPaterno + ' ' + el.idUsuario.apellidoMaterno,
                    fechaEstudio: el.fecha
                });
            }
            // Todos los tipos de estudio
            else if(nombre == ' ') {
                arrEstudios.push({
                    objectIdEstudio: el.objectId,
                    nombreTipoEstudio: el.idTipoEstudio.nombre,
                    codigoTipoEstudio: el.idTipoEstudio.codigo,
                    nombreColaborador: el.idUsuario.nombre + ' ' + el.idUsuario.apellidoPaterno + ' ' + el.idUsuario.apellidoMaterno,
                    fechaEstudio: el.fecha
                });
            }
        })

        return {
            estudios: arrEstudios,
            tiposEstudio: jsonTiposEstudio,
            error: null
        }

    } catch(error) {
        return {
            estudios: null,
            error: error.message
        }
    }

}