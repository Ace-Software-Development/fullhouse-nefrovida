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
        //Prueba
        const estudio = {
            idPaciente: id,
            nombreTipoEstudio: "Estudio de Química Sanguínea",
            fechaEstudio: "05/05/2022",
            descripcionTipoEstudio: "Estudio para tomar los datos de la química sanguínea de las personas.",
            parametros: [
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
            ],
            observacionesEstudio: "Se realizó el estudio 2 veces para verificar los datos obtenidos."
        };
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