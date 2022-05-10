const parse = require('parse/node');
const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

const Paciente = Parse.Object.extend('Paciente');

function initializeParse() {
    const APP_ID     = process.env.APP_ID
    const MASTER_KEY = process.env.MASTER_KEY
    const SERVER_URL = process.env.SERVER_URL

    Parse._initialize(APP_ID, "", SERVER_URL)
    Parse.serverURL = SERVER_URL
}

exports.registrarPaciente = function(data) {
    initializeParse()
    return new Promise( function (resolve, reject) {
        exports.buscarPorCurp(data.curp).then(function(results){
            if(results.error !== "No se encontró un paciente con ese CURP") {
                return resolve({
                    type: 'REGISTRO',
                    error: 'El paciente ya se encuentra registrado con ese CURP'
                })
            }
            else {
                const paciente = new Paciente

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
                paciente.set('activo', true)

                paciente.save()
                .then((paciente) => {
                    return resolve({
                        type: 'REGISTRO',
                        data: paciente,
                        error: null
                    })
                }, (error) => {
                    return resolve({
                        type: 'REGISTRO',
                        data: null,
                        error: error.message
                    })
                });
            }
        })
    })
}

exports.buscarPorCurp = function (curp) {
    return new Promise( function (resolve, reject) {
        exports.asyncBuscarPorCurp(curp, function(object, error) {
            if ( error ) {
                return resolve({
                    type: 'CONSULTA',
                    data: null,
                    error: error.message
                })
            }

            if ( !object ) {
                return resolve({
                    type: 'CONSULTA',
                    data: null,
                    error: 'No se encontró un paciente con ese CURP'
                })
            }

            if ( !object.get("activo")) {
                return resolve({
                    type: 'CONSULTA',
                    data: null,
                    error: 'El paciente fue eliminado anteriormente.'
                })
            }

            return resolve({
                type: 'CONSULTA',
                data: object,
                error: null
            })
        })
    })
}

exports.asyncBuscarPorCurp = async (curp, callback) => {
    initializeParse()
    
    var table = Parse.Object.extend('Paciente')
    var query = new Parse.Query(table)
    query.equalTo("curp", curp)

    try {
        var results = await query.first()
        callback(results, null)
    } catch (error) {
        callback(null, error)
    }
}

exports.consultarPacientes = async () => {
    initializeParse()

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
    initializeParse();

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