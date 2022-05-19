const tipoEstudioModel = require('../models/tipoEstudioModel')

module.exports.consularParametrosDeEstudio = async(request, response) => {
    let idTipoEstudio = request.params.idTipoEstudio;

    try {
        const results = await tipoEstudioModel.consularParametrosDeEstudio(idTipoEstudio);

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            })
        }
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