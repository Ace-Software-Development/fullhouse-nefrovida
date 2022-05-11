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
