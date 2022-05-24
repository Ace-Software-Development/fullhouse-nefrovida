let CONSTANTS = require("../constantsProject");

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

        // Obtener el tipo de estudio
        let tipoEstudio = await query.get(idTipoEstudio);

        // Enviar error en caso de no encontrar dicho tipo de Estudio
        if (!tipoEstudio) {
            return results(null, 'No se encontró dicho estudio.');
        }

        // Obtener de la tabla ParametroEstudio todos los registros cuyo 
        // pointer a idTipoEstudio sea el estudio.
        table = Parse.Object.extend(CONSTANTS.PARAMETROESTUDIO);
        var queryParametros = new Parse.Query(table);
        queryParametros.include(CONSTANTS.IDPARAMETRO);
        queryParametros.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);
        queryParametros.equalTo(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);
        queryParametros.select(CONSTANTS.IDPARAMETRO);

        try {
            var parametros = await queryParametros.find();
        
            // Mostrar error si no hay parámetros
            if (!parametros || parametros === []) {
                return results(null, 'No hay parámetros registrados para este tipo de estudio.');
            }

            // Añadir la información del tipo de estudio a los resultados
            parametros.push(tipoEstudio);

            return results(parametros, null);
        } catch(error) {
            // Devolver error al obtener los parámetros
            return results(null, error.message);
        }
    } catch(error) {
        // Devolver error al obtener los parámetros
        return results(null, error.message);
    }
}
