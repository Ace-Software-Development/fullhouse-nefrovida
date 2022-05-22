const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

/*
// Query's que no se si jale
const paciernte = Parse.Object.extend({});
//const estudio = Parse.Object.extend({"ESTUDIO"});
//const tipoEstudio = Parse.Object.extend({"TIPOESTUDIO"});

const queryPaciente = new Parse.Query(paciente);
//const queryEstudio = new Parse.Query(estudio);
//const queryTipoEstuio = new Parse.Query(tipoEstudio);
*/


class Parametro{
    constructor(nombreParametro, unidadParametro, valorResultado, valorReferenciaParametro) {
        this.nombreParametro = nombreParametro;
        this.unidadParametro = unidadParametro;
        this.valorResultado = valorResultado;
        this.valorReferenciaParametro = valorReferenciaParametro;
    }
}

class Estudio{
    constructor(idPaciente, nombreTipoEstudio, fechaEstudio, descripcionTipoEstudio, parametros, observacionesEstudio) {
        this.idPaciente = idPaciente;
        this.nombreTipoEstudio = nombreTipoEstudio;
        this.fechaEstudio = fechaEstudio;
        this.descripcionTipoEstudio = descripcionTipoEstudio;
        this.parametros = parametros;
        this.observacionesEstudio = observacionesEstudio;
    }
}

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
    const estudioPaciente = new Estudio(id, "Estudio de Química Sanguínea", "05/05/2022", "Estudio para tomar los datos de la química sanguínea de las personas.", [
        {
            nombreParametro: "Sangre",
            unidadParametro: "ml",
            valorResultado: "59",
            valorReferenciaParametro: "50 - 60"
        },
        {
            nombreParametro: "Glucosa",
            unidadParametro: "mg/dL",
            valorResultado: "25",
            valorReferenciaParametro: "5 - 20"
        },
        {
            nombreParametro: "Leucositos",
            unidadParametro: "ml",
            valorResultado: "100",
            valorReferenciaParametro: "100 - 150"
        },
        {
            nombreParametro: "Heterositos",
            unidadParametro: "mg/dL",
            valorResultado: "28",
            valorReferenciaParametro: "50 - 100"
        }
    ], "Se realizó el estudio 2 veces para verificar los datos obtenidos.");

    try {
        //Prueba
        const result = {
            idPaciente: estudioPaciente.id,
            nombreTipoEstudio: estudioPaciente.nombreTipoEstudio,
            fechaEstudio: estudioPaciente.fechaEstudio,
            descripcionTipoEstudio: estudioPaciente.descripcionTipoEstudio,
            parametros: estudioPaciente.parametros,
            observacionesEstudio: estudioPaciente.observacionesEstudio
        };
        return {
            estudio: result,
            error: null
        }
    } catch (error) {
        return {
            paciente: null,
            error: error.message
        }
    }
}