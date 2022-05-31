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