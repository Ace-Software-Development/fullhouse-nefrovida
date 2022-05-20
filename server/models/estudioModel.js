let CONSTANTS = require("../constantsProject");

const Estudio = Parse.Object.extend(CONSTANTS.ESTUDIO);
const TipoEstudio = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
const Resultado = Parse.Object.extend(CONSTANTS.RESULTADO);
const Parametro = Parse.Object.extend(CONSTANTS.PARAMETRO);

/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns 
 */
function results(data, error) {
    return {
        data: data,
        error: error
    }
}

exports.registrarResultadosEstudio = async(data) => {
    const estudio = new Estudio;
    console.log("data", data);

    estudio.set(CONSTANTS.FECHA, data.fecha);
    estudio.set(CONSTANTS.OBSERVACIONES, data.observaciones);

    var tipoEstudio = new TipoEstudio();
    tipoEstudio.set(CONSTANTS.OBJECTID, data.idTipoEstudio);

    estudio.set(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);

    var tablaPaciente = Parse.Object.extend(CONSTANTS.PACIENTE);
    var query = new Parse.Query(tablaPaciente);
    query.equalTo(CONSTANTS.CURP, data.curp);
    
    try {
        var paciente = await query.first();
        console.log('paciente', paciente);
        if (!paciente) {
            return results(null, 'No se encontró un paciente con ese CURP');
        }

        estudio.set(CONSTANTS.IDPACIENTE, paciente);
        // estudio.set(CONSTANTS.IDQUIMICO, Parse.User.current());

        console.log('estudio', JSON.parse(JSON.stringify(estudio)));
    

        try {
            const estudioSaved = await estudio.save();

            var resultados = [];
            for (let i = 0; i < data.parametros.length; i++) {
                var resultado = new Resultado();
                resultado.set(CONSTANTS.IDESTUDIO, estudioSaved);

                var parametro = new Parametro();
                parametro.set(CONSTANTS.OBJECTID, data.parametros[i].objectId);
                resultado.set(CONSTANTS.PARAMETRO, parametro);

                if (data.parametros[i].valorNum) {
                    resultado.set(CONSTANTS.VALORNUM, data.parametros[i].valorNum);
                }

                //data.parametros[i].valorNum && resultado.set(CONSTANTS.VALORNUM, data.parametros[i].valorNum);
                data.parametros[i].valorBool && resultado.set(CONSTANTS.VALORBOOL, data.parametros[i].valorBool);
                data.parametros[i].valorString && resultado.set(CONSTANTS.VALORSTRING, data.parametros[i].valorString);

                resultados.push(resultado);
                console.log('resultado', JSON.parse(JSON.stringify(resultado)));
            }

            console.log('resultados', JSON.parse(JSON.stringify(resultados)));

            try {
                Parse.Object.saveAll(resultados);
                return {
                    data: resultados,
                    error: null
                }

            } catch(error) {
                return {
                    data: null,
                    error: error.message
                }
            }
        } catch (error) {
            return {
                data: null,
                error: error.message
            }
        }
    } catch (error) {
        return {
            data: null,
            error: error.message
        }
    }

}
