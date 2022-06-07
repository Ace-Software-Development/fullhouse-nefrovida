const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require('../constantsProject');


const ParametroEstudio = Parse.Object.extend(CONSTANTS.PARAMETROESTUDIO);

/**
 * asyncRegistrarParametroEstudio Función asíncrona para registrar un nuevo parametroEstudio,
 * recibe los datos del parámetro y tipo de estudio a guardar.
 * @param {object} data - Objeto que contenga la información del nuevo parámetro y tipo de estudio
 * @returns Información del nuevo parámetro y tipo de estudio o un error en caso de existir.
 */
exports.registrarParametroEstudio = async(idParametro, idTipoEstudio) => {
    try {
        const parametroEstudio = new ParametroEstudio();

        const Parametro = Parse.Object.extend(CONSTANTS.PARAMETRO)
        let parametroPointer = new Parametro();
        parametroPointer.id = idParametro;

        parametroEstudio.set(CONSTANTS.IDPARAMETRO, parametroPointer);


        const TipoEstudio = Parse.Object.extend(CONSTANTS.TIPOESTUDIO)
        let tipoEstudioPointer = new TipoEstudio();
        tipoEstudioPointer.id = idTipoEstudio;

        parametroEstudio.set(CONSTANTS.IDTIPOESTUDIO, tipoEstudioPointer);


        const resultsParametroEstudio = await parametroEstudio.save()

        return results(resultsParametroEstudio, null);

    } catch (error) {

        return results(null, error.message);
    }

}