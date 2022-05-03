const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

exports.obtenerTodos = async() => {
    var queryObtenerTodos = new Parse.Query(Parse.User);
    queryObtenerTodos.include(CONSTANTS.IDROL);
    queryObtenerTodos.select(CONSTANTS.NOMBRE, CONSTANTS.APELLIDOPATERNO /
        CONSTANTS.APELLIDOMATERNO, CONSTANTS.FECHANACIMIENTO, CONSTANTS.SEXO,
        CONSTANTS.CORREO, CONSTANTS.TELEFONO, CONSTANTS.ACTIVO, CONSTANTS.IDROL);
    try {
        const colabs = await queryObtenerTodos.find();
        return {
            colaboradores: colabs,
            error: null
        }
    } catch (error) {
        return {
            colaboradores: null,
            error: error.message
        }
    }
}


function resultsRegistrarColaborador(colab, error){
    return {
        colaborador: colab,
        error: error
    };
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

exports.registrarColaborador = async(params) => {
    const queryTelefonoUnico = new Parse.Query(Parse.User);
    queryTelefonoUnico.equalTo(CONSTANTS.TELEFONO, params.telefono);

    try {
        const colaboradorT = await queryTelefonoUnico.first();
        if (colaboradorT) {
            return resultsRegistrarColaborador(colaboradorT, "Ya existe un empleado registrado con dicho teléfono.");
        }
        // Si no existe un empleado con dicho teléfono aún, crear registro.
        const colaborador = new Parse.User();
        colaborador.set(CONSTANTS.USUARIO, params.usuario);
        colaborador.set(CONSTANTS.NOMBRE, params.nombre);
        colaborador.set(CONSTANTS.APELLIDOPATERNO, params.paterno);
        colaborador.set(CONSTANTS.APELLIDOMATERNO, params.materno);
        colaborador.set(CONSTANTS.CORREO, params.correo);
        colaborador.set(CONSTANTS.TELEFONO, params.telefono);
        colaborador.set(CONSTANTS.CONTRASENA, params.password)
        colaborador.set(CONSTANTS.ACTIVO, true);
        colaborador.set(CONSTANTS.IDROL, params.idRol);

        try {
            const colab = await colaborador.signUp();
            return resultsRegistrarColaborador(colab, null);

        } catch(error) {
            if (error.code === Parse.Error.INVALID_EMAIL_ADDRESS) {
                return resultsRegistrarColaborador(null, "El correo electrónico ingresado es inválido.");
            }
            else if (error.code === Parse.Error.USERNAME_MISSING) {
                return resultsRegistrarColaborador(null, "El usuario ingresado es inválido o está faltante.");
            }
            else if (error.code === Parse.Error.PASSWORD_MISSING) {
                return resultsRegistrarColaborador(null, "La contraseña ingresada es inválida o está faltante.");
            }
            else if (error.code === Parse.Error.USERNAME_TAKEN) {
                return resultsRegistrarColaborador(null, "El usuario ingresado ya se encuentra en uso.");
            }
            else if (error.code === Parse.Error.EMAIL_TAKEN) {
                return resultsRegistrarColaborador(null, "El correo electrónico ingresado ya se encuentra en uso.");
            }
            else if (error.code === Parse.Error.EMAIL_MISSING) {
                return resultsRegistrarColaborador(null, "Correo electrónico faltante.");
            }
            return resultsRegistrarColaborador(null, error.message + " " + error.code);
        }
        
    } catch(errorT) {
        return resultsRegistrarColaborador(null, errorT.message);
    }
}

exports.asyncIniciarSesionColaborador = async(params, callback) => {    
    console.log(params.username);
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