let CONSTANTS = require('../constantsProject');

/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns 
 */
function resultsTipoValor(data, error) {
    return {
        data: data,
        error: error
    }
}

/**
 * asynConsultarTiposDeValor Función asíncrona para consultar todos los tipos de valor
 * @returns Todos los tipos de valor
 */
exports.consultarTiposDeValor = async() => {
    const table = Parse.Object.extend(CONSTANTS.TIPOVALOR);
    let query = new Parse.Query(table);

    try {
        //Obtener todos los tipos de datos.
        const results = await query.find();

        if (!results) {
            return resultsTipoValor(null, 'No hay tipos de valor registrados actualmente.');
        }

        return resultsTipoValor(results, null);
    } catch(error) {
        return resultsTipoValor(null, error.message);
    }
}