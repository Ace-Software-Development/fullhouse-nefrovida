const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

const Paciente = Parse.Object.extend(CONSTANTS.PACIENTE);

function resultsPaciente(data, error) {
    return {
        data: data,
        error: error
    }
}

exports.registrarPaciente = async(data) => {
    
    try {
        const pacienteCurp = await exports.buscarPorCurp(data.curp);
        if (pacienteCurp.data) {
            return resultsPaciente(pacienteCurp.data, 'El paciente ya se encuentra registrado con ese CURP');
        }

        const paciente = new Paciente();

        paciente.set(CONSTANTS.CURP, data.curp);
        paciente.set(CONSTANTS.NOMBRE, data.nombre);
        paciente.set(CONSTANTS.APELLIDOPATERNO, data.apellidoPaterno);
        paciente.set(CONSTANTS.APELLIDOMATERNO, data.apellidoMaterno);
        paciente.set(CONSTANTS.FECHANACIMIENTO, data.fechaNacimiento);
        paciente.set(CONSTANTS.CORREO, data.correo);
        paciente.set(CONSTANTS.SEXO, data.sexo);
        paciente.set(CONSTANTS.ESTATURA, data.estatura);
        paciente.set(CONSTANTS.PESO, data.peso);
        paciente.set(CONSTANTS.TELEFONO, data.telefono);
        paciente.set(CONSTANTS.ACTIVO, true);

        try {
            const results = await paciente.save()
            return resultsPaciente(results, null);
        } catch (error) {
            return resultsPaciente(null, error.message);

        }

    } catch (error) {
        return resultsPaciente(null, error.message);
    }
}

exports.buscarPorCurp = async (curp) => {
    
    var Table = Parse.Object.extend('Paciente');
    var query = new Parse.Query(Table);
    query.equalTo('curp', curp);

    try {
        var results = await query.first();
        if ( !results ) {
            return resultsPaciente(null, 'No se encontró un paciente con ese CURP');
        }
        if ( !results.get('activo')) {
            return resultsPaciente(null, 'El objeto fue eliminado anteriormente.');
        }
        return resultsPaciente(results, null);

    } catch (error) {
        return resultsPaciente(null, error.message);
    }
}