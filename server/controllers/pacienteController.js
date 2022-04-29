const pacienteModel = require('../models/pacienteModel')

module.exports.crearPaciente = async(request, response) => {
    pacienteModel.registrarPaciente(request.body)
    .then(function(results) {
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                message: "Error. " + results.error
            })
        }
        response.status(200).send({
            success: 'true',
            message: "Paciente creado exitosamente"
        })
    })
}
