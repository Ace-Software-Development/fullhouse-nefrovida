let CONSTANTS = require('../constantsProject');

const Rol = Parse.Object.extend(CONSTANTS.ROL);

/**
 * Iniciar Sesión: IT3-3 (https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit?usp=sharing)
 * obtenerRol Función asíncrona que retorna rol a buscar en base de datos.
 * @param {number} id identificador del rol a buscar
 * @returns json conteniendo el rol o mensaje de error.
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
 * obtenerRoles Función asíncrona que retorna lista de roles exitentes en base de datos.
 * @returns json con lista de roles o mensaje de error.
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