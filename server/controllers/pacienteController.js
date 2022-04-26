const pacienteModel = require('../models/pacienteModel')

module.exports.crearPaciente = async(req, res) => {
    pacienteModel.crearPaciente(req.body).then(function(results) {
        if (response.error) {
            return res.status(400).send({
                status: 'error',
                message: "Error al crear un paciente. " + response.error
            })
        }
    
        res.status(200).send({
            success: 'true',
            message: "Paciente creado exitosamente"
        })
    })
}