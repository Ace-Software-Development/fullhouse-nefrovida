const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

const Paciente = Parse.Object.extend(CONSTANTS.PACIENTE);

/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns 
 */
function resultsPaciente(data, error) {
    return {
        data: data,
        error: error
    }
}

/**
 * asyncRegistrarPaciente Función asíncrona para registrar un nuevo paciente, 
 * recibe los datos del paciente a guardar.
 * @param {object} data - Objeto que contenga la información del nuevo paciente
 * @returns Información del nuevo paciente o un error en caso de existir.
 */
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

/**
 * asyncBuscarPorCurp Función asíncrona para buscar a un paciente por su curp. 
 * @param {string} curp - Curp del paciente a buscar
 * @returns Información del paciente en caso de encontrarlo o un error en caso de no existir.
 */
exports.buscarPorCurp = async (curp) => {
    
    var Table = Parse.Object.extend(CONSTANTS.PACIENTE);
    var query = new Parse.Query(Table);
    query.equalTo(CONSTANTS.CURP, curp);

    try {
        var results = await query.first();
        if ( !results ) {
            return resultsPaciente(null, 'No se encontró un paciente con ese CURP');
        }
        if ( !results.get(CONSTANTS.ACTIVO)) {
            return resultsPaciente(null, 'El objeto fue eliminado anteriormente.');
        }
        return resultsPaciente(results, null);

    } catch (error) {
        return resultsPaciente(null, error.message);
    }
}

exports.consultarPacientes = async () => {
    console.log("modelo");

    var table = Parse.Object.extend(CONSTANTS.PACIENTE)
    var query = new Parse.Query(table)
    
    try {
        var results = await query.find()

        if (!results) {
            return {
                data: null,
                error: 'No hay pacientes registrados actualmente'
            }
        }

        return {
            data: results,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error.message
        }
    }
    
}

exports.buscarPorNombre = async(nombre) => {

    nombre = nombre.toLowerCase();
    const palabras = nombre.split(' ');

    var table = Parse.Object.extend(CONSTANTS.PACIENTE);
    var query = new Parse.Query(table);

    try {
        var pacientes = await query.find();
        var results = []

        var json_res = JSON.parse(JSON.stringify(pacientes));

        for (let i = 0; i < json_res.length; i++){
            var nombreCompleto = json_res[i].nombre + " " + json_res[i].apellidoPaterno + " ";

            if (json_res[i].apellidoMaterno) {
                nombreCompleto += json_res[i].apellidoMaterno
            }

            nombreCompleto = nombreCompleto.toLowerCase();
            
            let includes = true;
            for (let j = 0; j < palabras.length; j++) {
                if (!nombreCompleto.includes(palabras[j])) {
                    includes = false;
                }
            }
            if (includes) {
                results.push(json_res[i]);
            }
            results.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
        }

        return {
            data: results,
            error: null
        }

    } catch(error) {
        return {
            data: null,
            error: error.message
        }
    }

}