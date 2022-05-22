const tipoEstudio = require('../models/tipoEstudioModel')

module.exports.consultarTipoEstudio = async(request, response) => {
    const id = request.params.id;
    try {
        const results = await tipoEstudio.consularParametrosDeEstudio(id);
        console.log(results)
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
