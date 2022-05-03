let CONSTANTS = require("../constantsProject");

const Rol = Parse.Object.extend(CONSTANTS.ROL);

/**
 * asyncObtenerRol Función asíncrona que retorna rol a buscar en base de datos.
 * recibe id del rol a buscar
*/
exports.obtenerRol = async(id) => {
    const queryRol = new Parse.Query(Rol);
    queryRol.equalTo(CONSTANTS.OBJECTID, id);

    try {
        var rol = await queryRol.first();
        return {
            rol: rol,
            error: null
        }
    } catch(error) {
        return {
            rol: null,
            error: error.message
        }
    }
}

/**
 * asyncObtenerRoles Función asíncrona que retorna lista completa de roles existentes en base de datos
*/
exports.obtenerRoles = async() => {
    const queryRoles = new Parse.Query(Rol);

    try {
        var roles = await queryRoles.find();
        return {
            roles: roles,
            error: null
        };
    } catch(error) {
        return {
            roles: null,
            error: error.message
        };
    }
}