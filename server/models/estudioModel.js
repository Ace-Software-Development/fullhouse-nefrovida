const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../constantsProject");

function obtenerValorResultado(json) {
    const tipoValor = json.idParametro.idTipoValor.nombre;

    if(tipoValor === "Numérico") {
        const valorNum = json.valorNum;
        return valorNum
    }
    else if(tipoValor === "Texto") {
        const valorString = json.valorString;
        return valorString
    }
    else {
        const valorBool = json.valorBool;
        if(valorBool) {
            return "Positivo"
        }
        else{
            return "Negativo"
        }
    }
}

function obtenerValorReferenciaParametro(json) {
    console.log(json.idParametro.idTipoValor.nombre);
    const tipoValor = json.idParametro.idTipoValor.nombre;

    if(tipoValor === "Numérico") {
        const valorMin = json.idParametro.valorMin;
        const valorMax = json.idParametro.valorMax;
        const tieneRango = json.idParametro.tieneRango;

        if(tieneRango) {
            return valorMin + " - " + valorMax
        }
        else{
            return valorMin
        }
    }
    else if(tipoValor === "Texto") {
        const valorString = json.idParametro.valorString;
        return valorString
    }
}

exports.obtenerEstudioPaciente = async(idEstudio) => {
    const tablaEstudio = Parse.Object.extend(CONSTANTS.ESTUDIO);
    const queryObtenerEstudio = new Parse.Query(tablaEstudio);
    queryObtenerEstudio.include(CONSTANTS.IDTIPOESTUDIO);
    try {
        const estudio = await queryObtenerEstudio.get(idEstudio);
        
        const tablaResultado = Parse.Object.extend(CONSTANTS.RESULTADO);
        const queryResultados = new Parse.Query(tablaResultado);
        
        queryResultados.include(CONSTANTS.IDPARAMETRO);
        queryResultados.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);

        queryResultados.equalTo(CONSTANTS.IDESTUDIO, estudio);
        try {
            const parametros = await queryResultados.find();

            const jsonEstudio = JSON.parse(JSON.stringify(estudio));
            const jsonParametros = JSON.parse(JSON.stringify(parametros));
            
            const arrParametros = [];

            jsonParametros.map(el => {
                arrParametros.push({
                    nombreParametro: el.idParametro.nombre,
                    unidadParametro: el.idParametro.unidad,
                    valorResultado: obtenerValorResultado(el),
                    valorReferenciaParametro: obtenerValorReferenciaParametro(el)
                });
            })

            const estudioPaciente = {
                idEstudio: idEstudio,
                nombreTipoEstudio: jsonEstudio.idTipoEstudio.nombre,
                fechaEstudio: jsonEstudio.fecha,
                descripcionTipoEstudio: jsonEstudio.idTipoEstudio.descripcion,
                parametros: arrParametros,
                observacionesEstudio: jsonEstudio.observaciones
            };

            return {
                estudio: estudioPaciente,
                error: null
            }
        } catch (error) {
            return {
                paciente: null,
                error: error.message
            }
        }
    } catch (error) {
        return {
            paciente: null,
            error: error.message
        }
    }
}