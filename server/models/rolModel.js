let CONSTANTS = require("../constantsProject");

const Rol = Parse.Object.extend(CONSTANTS.ROL);

/**
 * obtenerRol retorna promesa con rol, nombre y descripción.
 * recibe id del rol a buscar.
*/
exports.obtenerRol = function(id) {
    return new Promise(function(resolve, reject) {
        exports.asyncObtenerRol(id, function(rol, error) {
            if (error) {
                return resolve( {
                    rol: null,
                    error: error.message
                });
            }
            return resolve({
                rol: rol,
                error: null
            });
        });
    });
}

/**
 * asyncObtenerRol Función asíncrona que retorna rol a buscar en base de datos.
 * recibe id del rol a buscar
*/
exports.asyncObtenerRol = async(id, callback) => {
    const queryRol = new Parse.Query(Rol);
    queryRol.equalTo(CONSTANTS.OBJECTID, id);

    try {
        var rol = await queryRol.first();
        callback(rol, null);
    } catch(error) {
        callback(null, error);
    }
}

/**
 * obtenerRoles retorna promesa con lista de roles
*/
exports.obtenerRoles = function() {
    return new Promise(function(resolve, reject) {
        exports.asyncObtenerRoles(function(roles, error) {
            if (error) {
                return resolve( {
                    roles: null,
                    error: error.message
                });
            }
            return resolve( {
                roles: roles,
                error: null
            });
        });
    });
}

/**
 * asyncObtenerRoles Función asíncrona que retorna lista completa de roles existentes en base de datos
*/
exports.asyncObtenerRoles = async(callback) => {
    const queryRoles = new Parse.Query(Rol);

    try {
        var roles = await queryRoles.find();
        callback(roles, null);
    } catch(error){
        callback(null, error);
    }
}