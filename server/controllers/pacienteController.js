const pacienteModel = require('../models/pacienteModel')

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
                    message: "Error. " + results.error
                })
            }
            response.status(200).send( {
                success: 'true',
                data: results,
                message: "Paciente creado exitosamente"
            })
        } catch (error) {
        }

    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: "Error. " + error.message
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
                message: "Error. " + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: "Pacientes obtenidos exitosamente."
        });
    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: "Error. " + error.message
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
    let curp = request.params.curp;

    try {
        const results = await pacienteModel.buscarPorCurp(curp);

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: "Error. " + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
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
    try {
        let nombre = request.params.nombre;
        const results = await pacienteModel.buscarPorNombre(nombre)
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: "Error. " + results.error
            });
        }
        response.status(200).send({
            status: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        });
    }
}