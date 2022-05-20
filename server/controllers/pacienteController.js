const pacienteModel = require('../models/pacienteModel');

module.exports.consultarEstudioPaciente = async(request, response) => {
    const id = request.params.id;
    try {
        const results = await pacienteModel.obtenerEstudioPaciente(id);
        if (results.error) {
            return response.status(404).send( {
                estudio: null,
                message: results.error
            });
        }
        response.status(200).send( {
            estudio: results.estudio,
            message: "Estudio de paciente obtenido!!!"
        });
        
    } catch(error) {
        response.status(404).send( {
            estudio: null,
            message: error.message
        });
    }
}