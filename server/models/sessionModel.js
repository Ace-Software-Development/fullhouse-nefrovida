let CONSTANTS = require("../constantsProject");
const colaboradorModel = require('../models/colaboradorModel');
const rolModel = require('../models/rolModel');

/**
 * obtenerSession funcion que retorna promesa de llamar funcion asincrona.
 * @param {string} token 
 * @returns json conteniendo el rol o mensaje de error.
 */
exports.obtenerSession = function(token) {
    return new Promise( function(resolve, reject) {
        exports.asyncObtenerSession(token, function(nombreRol, error) {
            if (error) {
                return resolve( {
                    rol: null,
                    message: error
                });
            }
            return resolve( {
                rol: nombreRol,
                message: error
            });
        })
    })
}

/**
 * obtenerSession Función asíncrona que retorna session activa o error que expiró en base de datos.
 * @param {string} token identificador de la session
 * @returns json conteniendo el rol o mensaje de error.
 */

exports.asyncObtenerSession = async(token, callback) => {
    try {
        // Obtener datos de sessión actual de usuario.
        var session = await Parse.Session.current();
        const sessJSON = session.toJSON();
        // Verificar que coincida token almacenado en session de React
        if(token == sessJSON.sessionToken) {
            try {
                // Obtener objeto de usuario
                const colab = await colaboradorModel.obtenerColaborador(sessJSON.user.objectId);
                if(colab.error) {
                    callback(null, colab.error.message);
                }
                const colabJSON = colab.colaborador.toJSON();
                // Obtener rol de usuario
                const rol = await rolModel.obtenerRol(colabJSON.idRol.objectId);
                if(rol.error) {
                    callback(null, rol.error);
                }
                // Retornar rol que tiene usuario
                const nombreRol = rol.rol.get(CONSTANTS.NOMBRE);
                callback(nombreRol, null);
            } catch(error) {
                callback(null, errr.message);
            }
        } 
        // En caso de que token de sessión de React no sea válido, cerrar sesión.
        else {
            await Parse.User.logOut();
            callback(null, "Sesion invalida");
        }
        
        
    } catch(error) {
        await Parse.User.logOut();
        callback(null, "Sesion invalida");
    }
}
