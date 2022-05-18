const tipoEstudio = require('../models/tipoEstudioModel')

module.exports.consultarTipoEstudio = async(request, response) => {
    const id = request.params.id;
    try {
        response = await tipoEstudio.consultarTipoEstudio(id);
        return response;
    }
    catch (error) {
        
    }
}
