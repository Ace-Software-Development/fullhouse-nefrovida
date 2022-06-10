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

/**
 * asyncRegistrarParametro Función asíncrona para registrar un nuevo parámetro, 
 * llama a la función registrarParametro en el modelo de parámetro.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.registrarParametro = async(request, response) => {
    try {
        const results = await parametroModel.registrarParametro(request.body);

        // Envía error en caso de ser necesario
        if (results.error) {
            return response.status(400).send( {
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            })
        }
        // Respuesta exitosa
        response.status(200).send( {
            success: 'true',
            data: results,
            message: 'Parámetro creado exitosamente'
        })
    } catch(error) {
        // Envía error en caso de ser necesario
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
}

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