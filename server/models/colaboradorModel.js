const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

const Colaborador = Parse.Object.extend(CONSTANTS.COLABORADOR);

exports.obtenerTodos = async(callback) => {
    var queryObtenerTodos = new Parse.Query(Colaborador);
    queryObtenerTodos.include(CONSTANTS.IDROL);
    queryObtenerTodos.select(CONSTANTS.NOMBRE, CONSTANTS.APELLIDOPATERNO /
        CONSTANTS.APELLIDOMATERNO, CONSTANTS.FECHANACIMIENTO, CONSTANTS.SEXO,
        CONSTANTS.CORREO, CONSTANTS.TELEFONO, CONSTANTS.ACTIVO, CONSTANTS.IDROL);
    try {
        const results = await queryObtenerTodos.find();
        callback(results, null);
    } catch (error) {
        callback(null, error);
    }
}

exports.registrarColaborador = function(params){
    return new Promise(function(resolve, reject){
        exports.asyncRegistrarColaborador(params, function(colaborador, error){
            if(error){
                return resolve({
                    type: 'REGISTRO',
                    colaborador: colaborador,
                    error: error.message
                });
            }

            return resolve({
                type: 'REGISTRO',
                colaborador: colaborador,
                error: null
            });
        });
    });
}

exports.iniciarSesionColaborador = function(params){
    return new Promise(function(resolve, reject){
        exports.asyncIniciarSesionColaborador(params, function(colaborador, error){
            if(error){
                return resolve({
                    type: 'REGISTRO',
                    colaborador: colaborador,
                    error: error.message
                });
            }

            return resolve({
                type: 'REGISTRO',
                colaborador: colaborador,
                error: null
            });
        });
    });
}

exports.cerrarSesionColaborador = function(params){
    return new Promise(function(resolve, reject){
        exports.asyncCerrarSesionColaborador(params, function(colaborador, error){
            if(error){
                return resolve({
                    type: 'REGISTRO',
                    colaborador: colaborador,
                    error: error.message
                });
            }

            return resolve({
                type: 'REGISTRO',
                colaborador: colaborador,
                error: null
            });
        });
    });
}

/*exports.asyncRegistrarColaborador = async(params, callback) => {
    const colaborador = new Colaborador();

    colaborador.set(CONSTANTS.IDCOLABORADOR, params.idColaborador);
    colaborador.set(CONSTANTS.NOMBRE, params.nombre);
    colaborador.set(CONSTANTS.APELLIDOPATERNO, params.paterno);
    colaborador.set(CONSTANTS.APELLIDOMATERNO, params.materno);
    colaborador.set(CONSTANTS.FECHANACIMIENTO, params.nacimiento);
    colaborador.set(CONSTANTS.SEXO, params.sexo);
    colaborador.set(CONSTANTS.CORREO, params.correo);
    colaborador.set(CONSTANTS.TELEFONO, params.telefono);
    colaborador.set(CONSTANTS.CONTRASENA, params.contrasena)
    colaborador.set(CONSTANTS.ACTIVO, true);
    colaborador.set(CONSTANTS.IDROL, params.idRol);

    try {
        var colab = await colaborador.save();
        callback(colab, null);
    } catch (error) {
        callback(null, error);
    }
}*/

exports.asyncRegistrarColaborador = async(params, callback) => {
    const user = new Parse.User();
    user.set(CONSTANTS.USERNAME, params.username);
    user.set(CONSTANTS.PASSWORD, params.password);
    user.set(CONSTANTS.EMAIL, params.email);

    // other fields can be set just like with Parse.Object
    user.set(CONSTANTS.PHONE, params.phone);
    //user.ser(CONSTANTS.EMAILVERIFIED, params.emailVerified);
    
    try {
        var colab = await user.signUp();
        callback(colab, null);
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        callback(null, error);
    }
}

exports.asyncIniciarSesionColaborador = async(params, callback) => {    
    try {
        const colab = await Parse.User.logIn(params.username, params.password);
        callback(colab, null);
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        callback(null, error);
    }
}

exports.asyncCerrarSesionColaborador = async(params, callback) => {    
    try {
        const colab = await Parse.User.logOut(params.username, params.password);
        callback(colab, null);
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        callback(null, error);
    }
}