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


function resultsRegistrarColaborador(colab, error){
    return {
        colaborador: colab,
        error: error
    };
}

exports.asyncRegistrarColaborador = async(params) => {
    const queryCorreoUnico = new Parse.Query(Colaborador);
    queryCorreoUnico.equalTo(CONSTANTS.CORREO, params.correo);
    
    try {
        var colaboradorC = await queryCorreoUnico.first();
        if (colaboradorC) {
            return resultsRegistrarColaborador(colaboradorC, "Ya existe un empleado registrado con dicho correo electrónico.");
        }
        // Si no existe un empleado con dicho correo aún.
        const queryTelefonoUnico = new Parse.Query(Colaborador);
        queryTelefonoUnico.equalTo(CONSTANTS.TELEFONO, params.telefono);

        try {
            var colaboradorT = await queryTelefonoUnico.first();
            if (colaboradorT) {
                return resultsRegistrarColaborador(colaboradorT, "Ya existe un empleado registrado con dicho teléfono.");
            }
            // Si no existe un empleado con dicho teléfono aún, crear registro.
            const colaborador = new Colaborador();
            colaborador.set(CONSTANTS.IDCOLABORADOR, params.usuario);
            colaborador.set(CONSTANTS.NOMBRE, params.nombre);
            colaborador.set(CONSTANTS.APELLIDOPATERNO, params.paterno);
            colaborador.set(CONSTANTS.APELLIDOMATERNO, params.materno);
            colaborador.set(CONSTANTS.FECHANACIMIENTO, params.nacimiento);
            colaborador.set(CONSTANTS.SEXO, params.sexo);
            colaborador.set(CONSTANTS.CORREO, params.correo);
            colaborador.set(CONSTANTS.TELEFONO, params.telefono);
            colaborador.set(CONSTANTS.CONTRASENA, params.password)
            colaborador.set(CONSTANTS.ACTIVO, true);
            colaborador.set(CONSTANTS.IDROL, params.idRol);

            try {
                var colab = await colaborador.save();
                return resultsRegistrarColaborador(colab, null);

            } catch(error) {
                return resultsRegistrarColaborador(null, error.message);
            }
            
        } catch(errorT) {
            return resultsRegistrarColaborador(null, errorT.message);
        }

    } catch(errorC) {
        return resultsRegistrarColaborador(null, errorC.message);
    }
}