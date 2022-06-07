const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require('../constantsProject');


const Parametro = Parse.Object.extend(CONSTANTS.PARAMETRO);

/**
 * asynconsultarParametro Función asíncrona para consultar todos los parámetros de nefrovida
 * @returns Todos los parámetros registrados en nefrovida
 */
exports.consultarParametros = async () => {
    const table = Parse.Object.extend(CONSTANTS.PARAMETRO);
    let query = new Parse.Query(table);

    try {
        const results = await query.find();

        if (!results) {
            return {
                data: null,
                error: 'No hay parámetros registrados actualmente'
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
