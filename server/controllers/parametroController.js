const parametroModel = require('../models/parametroModel');

/**
 * asyncConsultarParametros Función asíncrona para obtener la información de todos los
 * parametros registrados en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarParametros = async(request, response) => {
    try {
        const results = await parametroModel.consultarParametros();

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
            message: 'Parámetros obtenidos exitosamente.'
        });
    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        });
    }
}