const parametroModel = require('../models/parametroModel');

/**
 * asyncConsultarTiposDeValor Función asíncrona para obtener la información de un
 * los tipos de valores.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarTiposDeValor = async(request, response) => {
    try {
        const results = await parametroModel.consultarTiposDeValor();

        console.log = JSON.parse(JSON.stringify(results));

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
            status: 'success',
            data: results,
            message: 'Tipos de datos consultados exitosamente.'
        })

    } catch(error) {
        response.status(400).send({
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
}