const consultaModel = require('../models/consultaModel')

/**
 * asyncRegistrarResultadosEstudio Funciòn asíncrona para registrar los resultados de un
 * nuevo estudio para un paciente.
*/
module.exports.registrarConsulta = async(request, response) => {
    try {
        const results = await consultaModel.registrarConsulta(request.body);
        // Envía error en caso de ser necesario
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            })
        }
        // Respuesta exitosa
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Consulta registrada exitosamente.'
        })

    } catch(error) {
        response.status(400).send({
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
} 