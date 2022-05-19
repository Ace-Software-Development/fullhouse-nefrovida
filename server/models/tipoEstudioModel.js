let CONSTANTS = require("../constantsProject");

exports.consularParametrosDeEstudio = async(idTipoEstudio) => {

    var table = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
    let query = new Parse.Query(table);
    
    try {
        let tipoEstudio = await query.get(idTipoEstudio);

        table = Parse.Object.extend(CONSTANTS.PARAMETROESTUDIO);
        var queryParametros = new Parse.Query(table);
        queryParametros.include(CONSTANTS.IDPARAMETRO);
        queryParametros.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);
        queryParametros.equalTo(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);
        queryParametros.select(CONSTANTS.IDPARAMETRO);

        try {
            var results = await queryParametros.find();
            
            if (!results || results === []) {
                return {
                    data: null,
                    error: 'No hay parámetros registrados para este tipo de estudio.'
                }
            }

            results.push(tipoEstudio);
            const res = {
                ...tipoEstudio,
                ...results
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
    } catch(error) {
        return {
            data: null,
            error: error.message
        }
    }

}
