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
    let curp = request.params.curp
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

module.exports.consultarPorNombre = async(request, response) => {
    try {
        let nombre = request.params.nombre;
        const results = await pacienteModel.buscarPorNombre(nombre)
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: "Error. " + results.error
            })
        }
        response.status(200).send({
            status: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        })
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: "Paciente obtenido exitosamente"
        })
    }
}