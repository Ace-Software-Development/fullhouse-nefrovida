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

exports.obtenerRolColaborador = async() => {
    const queryObtenerRol = new Parse.Query(CONSTANTS.ROL);
    queryObtenerRol.equalTo("objectId", objectId);
    try{
        const datosColab = await queryObtenerRol.find();
        for(let i=0; i<datosColab.length; i++){
            rolColab = datosColab[i].get(CONSTANTS.NOMBRE);
        }
        return rolColab;
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        return error.message;
    }
}

exports.iniciarSesionColaborador = async(params, idRolColab, rol) => {    
    try {
        const colab = await Parse.User.logIn(params.correo, params.password);

        const queryObtenerColaborador = new Parse.Query(Parse.User);
        queryObtenerColaborador.equalTo(CONSTANTS.CORREO, params.correo);

        try{
            const datosColab = await queryObtenerColaborador.first();
            idRolColab = datosColab.get(CONSTANTS.IDROL);
            console.log(idRolColab);

            const queryObtenerRolColab = new Parse.Query(CONSTANTS.ROL);
            queryObtenerRolColab.equalTo("objectId", idRolColab);
    
            try{
                const rolColab = await queryObtenerRolColab.first();
                rol = rolColab.get(CONSTANTS.NOMBRE);
                console.log(rol);

                return {
                    colaboradores: rol,
                    error: null
                }
    
            } catch (error) {
                // Show the error message somewhere and let the user try again.
                return error.message;
            }

        } catch (error) {
            // Show the error message somewhere and let the user try again.
            return error.message;
        }
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        return {
            colaboradores: null,
            error: error.message
        }
    }
}

exports.cerrarSesionColaborador = async() => {    
    try {
        const colab = await Parse.User.logOut();
        return {
            colaboradores: colab,
            error: null
        }
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        return {
            colaboradores: null,
            error: error.message
        }
    }
}