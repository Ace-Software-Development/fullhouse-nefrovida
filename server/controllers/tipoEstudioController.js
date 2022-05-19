const tipoEstudio = require('../models/tipoEstudioModel')

module.exports.consultarTipoEstudio = async(request, response) => {
    console.log("here")
    const id = request.params.id;
    try {
        response = await tipoEstudio.consultarTipoEstudio(id);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}
