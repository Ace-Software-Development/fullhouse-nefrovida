let CONSTANTS = require("../constantsProject");

const Rol = Parse.Object.extend(CONSTANTS.ROL);

exports.obtenerRol = function(id){
    return new Promise(function(resolve, reject){
        exports.asyncObtenerRol(id, function(rol, error){
            if(error){
                return resolve({
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

exports.asyncObtenerRol = async(id, callback) => {
    const queryRol = new Parse.Query(Rol);
    query.equalTo(CONSTANTS.OBJECTID, id);

    try{
        var rol = await queryRol.first();
        callback(rol, null);
    } catch(error){
        callback(null, error);
    }

}