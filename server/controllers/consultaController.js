const consultaModel = require('../models/consultaModel')

/**
* asyncRegistrarResultadosEstudio Funciòn asíncrona para registrar los resultados de un
* nuevo estudio para un paciente.
* @param {object} request Información enviados al servidor
* @param {object} response Respuesta de la petición al servidor
* @returns Respuesta de la petición
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


/**
 * asyncConsultarEstudioPaciente Función asíncrona para obtener la información de un
 * resumen de consulta de un paciente en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarDetalleConsulta = async(request, response) => {
    const notas = request.query.id;
    try {
        const results = await consultaModel.obtenerConsulta(notas);
        if (results.error) {
            return response.status(404).send( {
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send( {
            success: 'success',
            notas: results,
            message: 'Resumen de consulta obtenido exitosamente'
        });
        
    } catch(error) {
        response.status(200).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        });
    }
}