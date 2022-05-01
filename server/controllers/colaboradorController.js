const colaboradorModel = require("../models/colaboradorModel");

module.exports.registrarColaborador = async(request, response) => {
    colaboradorModel.registrarColaborador(request.body.data)
    .then(function(results){
        if(results.error){
            return response.status(404).send({
                status: "error",
                message: results.error
            })
        }
        response.status(200).send({
            status: "success",
            colaborador: results.colaborador,
            message: "Colaborador registrado"
        })
    }).catch((error) => {
        response.status(404).send({
            status: "error catch",
            message: error
        })
    })
}

module.exports.iniciarSesionColaborador = async(request, response) => {
    colaboradorModel.iniciarSesionColaborador(request.body.data)
    .then(function(results){
        if(results.error){
            return response.status(404).send({
                status: "error",
                message: results.error
            })
        }
        response.status(200).send({
            status: "success",
            colaborador: results.colaborador,
            message: "Inicio de sesión exitoso!!"
        })
    }).catch((error) => {
        response.status(404).send({
            status: "error catch",
            message: error
        })
    })
}