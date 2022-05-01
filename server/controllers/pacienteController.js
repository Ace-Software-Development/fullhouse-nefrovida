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

module.exports.consultarPacientes = async(request, response) => {
    pacienteModel.consultarPacientes()
    .then (function (results) {
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: "Error. " + results.error
            })
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: "Pacientes obtenidos exitosamente."
        })
    })
}

module.exports.consutarDetallePaciente = async(request, response) => {
    let curp = request.body.data.curp
    console.log(request.body.data.curp)
    pacienteModel.buscarPorCurp(curp)
    .then (function (results) {
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: "Error. " + results.error
            })
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        })
    })
}