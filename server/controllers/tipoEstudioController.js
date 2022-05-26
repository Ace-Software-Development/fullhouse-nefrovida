const tipoEstudioModel = require('../models/tipoEstudioModel')

/**
 * asyncConsularParametrosDeEstudio Función asíncrona para consultar todos los parámetros de
 * un estudio. Llama la función de consularParametrosDeEstudio dentro del modelo.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarParametrosDeEstudio = async(request, response) => {
    // Obtiene el ID del estudio de la ruta
    let idTipoEstudio = request.query.id;

    try {
        const results = await tipoEstudioModel.consularParametrosDeEstudio(idTipoEstudio);

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
            message: 'Parámetros obtenidos exitosamente.'
        })

    } catch(error) {
        response.status(400).send({
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
} 