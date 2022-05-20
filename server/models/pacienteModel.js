const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

exports.obtenerEstudioPaciente = async(id) => {
    /*
    var queryObtenerEstudioPaciente = new Parse.Query(CONSTANTS.PACIENTE);
    queryObtenerEstudioPaciente.equalTo(CONSTANTS.NOMBREPACIENTE, params.nombre);
    try {
        const paciente = await queryObtenerEstudioPaciente.first();
        return {
            paciente: paciente,
            error: null
        }
    } catch (error) {
        return {
            paciente: null,
            error: error.message
        }
    }*/

    try {
        const estudio = id;
        return {
            estudio: estudio,
            error: null
        }
    } catch (error) {
        return {
            paciente: null,
            error: error.message
        }
    }
}