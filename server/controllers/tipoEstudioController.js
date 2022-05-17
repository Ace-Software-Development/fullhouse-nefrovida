const tipoEstudio = require('../models/tipoEstudioModel')

module.exports.consultarTipoEstudio = async(request, response) => {
    let id = request.params.id

    try {
        const result = await tipoEstudio.consultarTipoEstudio(id)
    } catch (error) {
        
    }
}
