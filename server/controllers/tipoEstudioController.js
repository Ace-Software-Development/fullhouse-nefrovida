const tipoEstudio = require('../models/tipoEstudioModel')

module.exports.consultarTipoEstudio = async(request, response) => {
    const id = request.params.id;
    try {
        const result = await tipoEstudio.consultarTipoEstudio(id);
        return result;
    }
    catch (error) {
        
    }
}
