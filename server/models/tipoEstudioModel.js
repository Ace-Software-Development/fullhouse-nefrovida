let CONSTANTS = require("../constantsProject");

/**
 * asyncConsularParametrosDeEstudio Función asíncrona para obtener todos los parámetros 
 * de un estudio; recibe el ID del estudio que desea buscar.
 * @param {string} idTipoEstudio ObjectId del tipo de estudio
 * @returns Lista con todos los parámetros del tipo de estudio y la información del tipo de estudio.
 */
exports.consularParametrosDeEstudio = async(idTipoEstudio) => {

    var table = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
    let query = new Parse.Query(table);
    
    try {
        // Obtiene el objeto de tipoEstudio con dicho ID.
        let tipoEstudio = await query.get(idTipoEstudio);

        table = Parse.Object.extend(CONSTANTS.PARAMETROESTUDIO);
        var queryParametros = new Parse.Query(table);
        // Se incluyen los objetos de parámetros y de tipoValor, pues es información necesaria.
        queryParametros.include(CONSTANTS.IDPARAMETRO);
        queryParametros.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);
        // Buscamos en la tabla de ParametroEstudio todos los registros que contengan dicho estudio. 
        queryParametros.equalTo(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);
        queryParametros.select(CONSTANTS.IDPARAMETRO);

        try {
            var results = await queryParametros.find();
            
            // Mostrar error si no hay parámetros
            if (!results || results === []) {
                return {
                    data: null,
                    error: 'No hay parámetros registrados para este tipo de estudio.'
                }
            }

            // Añadir la información del tipo de estudio a los resultados
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
            // Devolver error al obtener los parámetros
            return {
                data: null,
                error: error.message
            }
        }
    } catch(error) {
        // Devolver error al buscar el tipo de estudio
        return {
            data: null,
            error: error.message
        }
    }

}
