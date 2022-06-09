let CONSTANTS = require('../constantsProject');

const TipoValor = Parse.Object.extend(CONSTANTS.TIPOVALOR);
const Parametro = Parse.Object.extend(CONSTANTS.PARAMETRO);

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
    let query = new Parse.Query(TipoValor);

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

/**
 * asyncRegistrarParametro Función asíncrona para registrar un nuevo parámetro, 
 * recibe los datos del parámetro a guardar.
 * @param {object} data - Objeto que contenga la información del nuevo parámetro
 * @returns Información del nuevo parámetro o un error en caso de existir.
 */
exports.registrarParametro = async(data) => {
    // Crear parametro
    const parametro = new Parametro();

    // Guardar los datos del parametro
    parametro.set(CONSTANTS.NOMBRE, data.nombre);
    parametro.set(CONSTANTS.CODIGO, data.codigo);
    parametro.set(CONSTANTS.UNIDAD, data.unidad);
    parametro.set(CONSTANTS.VALORMIN, data.valInicial);
    parametro.set(CONSTANTS.VALORMAX, data.valFinal);
    parametro.set(CONSTANTS.VALORBOOL, data.valBool);
    parametro.set(CONSTANTS.VALORSTRING, data.valString);

    const query = new Parse.Query(TipoValor);

    try {
        // Obtener el tipo de valor con su objectId
        const tipoValor = await query.get(data.tipoParametro);
        parametro.set(CONSTANTS.IDTIPOVALOR, tipoValor);

        try {
            // Guardar el parámetro
            const results = await parametro.save();
            return resultsTipoValor(results, null);
        } catch(error) {
            // Mostrar error al guardar el parámetro
            return resultsTipoValor(null, error.message);
        }

    } catch (error) {
        // Mostrar error al obtener el tipo de valor.
        return resultsTipoValor(null, 'Error al obtener el tipo de parámetro.');
    }
}