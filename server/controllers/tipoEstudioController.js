const tipoEstudio = require('../models/tipoEstudioModel')


/**
* asyncConsularParametrosDeEstudio Función asíncrona para obtener todos los parámetros 
* de un estudio; recibe el ID del estudio que desea buscar.
* @returns Lista con todos los parámetros del tipo de estudio y la información del tipo de estudio.
*/
module.exports.consultarTipoEstudio = async(request, response) => {
    const id = request.query.id;
    try {
        const results = await tipoEstudio.consularParametrosDeEstudio(id);

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
