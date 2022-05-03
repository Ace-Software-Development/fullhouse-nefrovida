const colaboradorModel = require('../models/colaboradorModel');
const rolModel = require('../models/rolModel');

module.exports.getRegistrarColaborador = async(request, response) => {
    try {
        const results = await rolModel.obtenerRoles();
        if (results.error) {
            return response.status(404).send( {
                roles: null,
                message: results.error
            });
        }
        response.status(200).send( {
            roles: results.roles,
            message: "Lista de roles en base de datos"
        });
    } catch(error) {
        response.status(404).send( {
            roles: null,
            message: error.message
        });
    }
}

module.exports.registrarColaborador = async(request, response) => {
    try {
        const results = await colaboradorModel.registrarColaborador(request.body.data);
        if (results.error) {
            return response.status(404).send( {
                colaborador: null,
                message: results.error
            });
        }
        response.status(200).send( {
            colaborador: results.colaborador,
            message: "Colaborador registrado"
        });

    } catch(error) {
        response.status(404).send( {
            colaborador: null,
            message: error.message
        });
    }
}
