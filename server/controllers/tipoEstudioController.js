const tipoEstudio = require('../models/tipoEstudioModel')


/**
* asyncConsultarParametrosDeEstudio Función asíncrona para obtener todos los parámetros
 * asyncEliminarEstudioPaciente Funciòn asíncrona para registrar los resultados de un
 * nuevo estudio para un paciente.
*/
module.exports.eliminarTipoEstudio = async(request, response) => {
    try {
        const results = await tipoEstudio.borrarTipoEstudio(request.body);
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
            data: results.tipoEstudio,
            message: 'Tipo de estudio eliminado exitosamente.'
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
* asyncConsularParametrosDeEstudio Función asíncrona para obtener todos los parámetros 
* de un estudio; recibe el ID del estudio que desea buscar.
* @param {object} request Información enviados al servidor
* @param {object} response Respuesta de la petición al servidor
* @returns Lista con todos los parámetros del tipo de estudio y la información del tipo de estudio.
*/
module.exports.consultarTipoEstudio = async(request, response) => {
    const id = request.query.id;
    try {
        const results = await tipoEstudio.consultarParametrosDeEstudio(id);

        if (results.error) {
            return response.status(400).send( {
                status: 'error',
                data: null,
                message: "Error: " + results.error
            })
        }
        response.status(200).send( {
            success: 'true',
            data: results,
            message: "tipo estudio consultado exitosamente"
        })
    }
    catch (error) {
        response.status(400).send( {
            success: 'false',
            data: error,
            message: "Error al consultar este tipo de estudio"
        })
    }
}


/**
* consultarTiposDeEstudio Función asíncrona para obtener todos los tipos de estudio.
* @param {object} request Información enviados al servidor
* @param {object} response Respuesta de la petición al servidor
* @returns Lista con todos los tipo de estudio.
*/
module.exports.consultarTiposEstudio = async(request, response) => {
    try {
        const results = await tipoEstudio.consultarTiposDeEstudio();
        response.status(200).send( {
            success: 'true',
            data: results,
            message: "tipos de estudio consultados exitosamente"
        })
    }
    catch (error) {
        response.status(400).send( {
            success: 'false',
            data: error,
            message: "Error al consultar tipos de estudio "
        })
    }
}


/**
 * asyncRegistrarTipoEstudio Función asíncrona para registrar un nuevo TipoEstudio,
 * llama a la función registrarTipoEstudio en el modelo de TipoEstudio.
 * @param {object} request Información enviada al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.registrarTipoEstudio = async(request, response) => {
    try {
        const results = await tipoEstudio.registrarTipoEstudio(request.body);

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
                message: 'Tipo estudio creado exitosamente'
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