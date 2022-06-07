const pacienteModel = require('../models/pacienteModel');


/**
 * asyncMostrarEstudiosPaciente Función asíncrona para obtener la información de los
 * estudios registrados de un paciente en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.mostrarEstudiosPaciente = async(request, response) => {
    // Se obtiene los parametros desde la query del front
    const queryJSON = JSON.parse(request.query.id);
    const curp = queryJSON.idPaciente;
    const nombreTipoEstudio = queryJSON.nombreTipoEstudio;
    const ascendente = queryJSON.ascendente;
    
    try {
        const results = await pacienteModel.obtenerEstudiosPaciente(curp, nombreTipoEstudio, ascendente);
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            status: 'success',
            estudios: results.estudios,
            tiposEstudio: results.tiposEstudio,
            message: 'estudios obtenido exitosamente'
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: 'estudios obtenido exitosamente'
        });
    }
}


/**
 * asyncCrearPaciente Función asíncrona para registrar un nuevo paciente, 
 * llama a la función registrarPaciente en el modelo de paciente.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.crearPaciente = async(request, response) => {
    try {
        const results = await pacienteModel.registrarPaciente(request.body);

        try {
            if (results.error) {
                return response.status(400).send( {
                    status: 'error',
                    data: null,
                    message: 'Error. ' + results.error
                })
            }
            response.status(200).send( {
                success: 'true',
                data: results,
                message: 'Paciente creado exitosamente'
            })
        } catch (error) {
        }

    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
}


/**
 * asyncConsultarPacientes Función asíncrona para obtener la información de todos los
 * pacientes registrados en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarPacientes = async(request, response) => {
    try {
        const results = await pacienteModel.consultarPacientes();

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Pacientes obtenidos exitosamente.'
        });
    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        });
    }
}


/**
 * asyncConsutarDetallePaciente Función asíncrona para consultar la información 
 * de un paciente, buscandolo por curp.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consutarDetallePaciente = async(request, response) => {
    // Se obtiene el curp de los parametros de la ruta
    const curp = request.query.id;

    try {
        const results = await pacienteModel.buscarPorCurp(curp);

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Paciente obtenido exitosamente'
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: 'Paciente obtenido exitosamente'
        });
    }
}


/**
 * asyncConsultarPorNombre Función asíncrona para buscar un paciente por nombre,
 * se devuelven los pacientes cuyo nombre o apellidos contengan la string recibida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarPorNombre = async(request, response) => {
    // Se obtiene el curp de los parametros de la ruta
    const nombre = request.query.id;
    try {
        const results = await pacienteModel.buscarPorNombre(nombre)
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            status: 'success',
            data: results,
            message: 'Paciente obtenido exitosamente'
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: 'Paciente obtenido exitosamente'
        });
    }
}


/**
 * asyncEditarPaciente Función asíncrona para registrar un nuevo paciente, 
 * llama a la función registrarPaciente en el modelo de paciente.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
 module.exports.editarPaciente = async(request, response) => {
    try {
        const results = await pacienteModel.updatePaciente(request.body);

        try {
            if (results.error) {
                return response.status(400).send( {
                    status: 'error',
                    data: null,
                    message: 'Error. ' + results.error
                })
            }
            response.status(200).send( {
                success: 'true',
                data: results,
                message: 'Paciente creado exitosamente'
            })
        } catch (error) {
        }

    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
}