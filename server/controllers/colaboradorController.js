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

module.exports.iniciarSesionColaborador = async(request, response) => {
    try {
        console.log(request);
        console.log(request.body);
        console.log(request.body.data);
        const results = await colaboradorModel.iniciarSesionColaborador(request.body);
        if (results.error) {
            return response.status(404).send( {
                colaborador: null,
                message: results.error
            });
        }

        request.session.isLoggedIn = true;
        request.session.usuario = results.colaborador.username;
        request.session.rol = results.rol;
        
        return response.status(200).send( {
            colaborador: results.colaborador,
            message: "Inicio de Sesion exitoso!!"
        });
        
    } catch(error) {
        return response.status(404).send( {
            colaborador: null,
            message: error.message
        });
    }
}

module.exports.cerrarSesionColaborador = async(request, response) => {
    try {
        console.log(request.body);
        console.log(request.body.data);
        const results = await colaboradorModel.cerrarSesionColaborador(request.body);
        if (results.error) {
            return response.status(404).send( {
                message: results.error
            });
        }

        // Destruir session
        request.session = null;

        return response.status(200).send( {
            message: "Sesion Cerrada correctamente"
        });
        
    } catch(error) {
        return response.status(404).send( {
            message: error.message
        });
    }
}