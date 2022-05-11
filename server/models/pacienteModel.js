const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

const Paciente = Parse.Object.extend('Paciente');

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

        paciente.set('curp', data.curp);
        paciente.set('nombre', data.nombre);
        paciente.set('apellidoPaterno', data.apellidoPaterno);
        paciente.set('apellidoMaterno', data.apellidoMaterno);
        paciente.set('fechaNacimiento', data.fechaNacimiento);
        paciente.set('correo', data.correo);
        paciente.set('sexo', data.sexo);
        paciente.set('estatura', data.estatura);
        paciente.set('peso', data.peso);
        paciente.set('telefono', data.telefono);
        paciente.set('activo', true);

        try {
            const results = await paciente.save()
            return resultsPaciente(paciente, null);
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