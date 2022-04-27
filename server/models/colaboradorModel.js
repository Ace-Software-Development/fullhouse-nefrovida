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

exports.asyncRegistrarColaborador = async(params, callback) => {
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
        callback(colab, null);
    } catch (error) {
        callback(null, error);
    }
}