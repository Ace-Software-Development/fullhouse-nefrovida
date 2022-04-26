const colaboradorModel = require("../models/colaboradorModel");

module.exports.registrarColaborador = async(request, response) => {
    colaboradorModel.registrarColaborador(request.body.data).then(function(results){
        if(results.error){
            return response.status(404).send({
                status: "error",
                message: results.error
            })
        }

        response.status(200).send({
            status: "success",
            message: "Listo para registrar Colaborador"
        })
    })
    response.status()
}