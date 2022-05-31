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

/**
 * asyncRegistrarResultadosEstudio Función asíncrona para registrar los resultados de cada 
 * parámetro de un estudio.
 * @param {Object} data Información enviada en el body, debe incluir información del estudio
 * y el resultado de cada parámetro
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.registrarResultadosEstudio = async(data) => {
    
    // Crear un nuevo estudio y asignar la fecha y las observaciones
    const estudio = new Estudio;
    estudio.set(CONSTANTS.FECHA, data.fecha);
    estudio.set(CONSTANTS.OBSERVACIONES, data.observaciones);

    // Asignar el pointer de idTipoEstudio al tipo de estudio recibido
    const tipoEstudio = new TipoEstudio();
    tipoEstudio.set(CONSTANTS.OBJECTID, data.idTipoEstudio);
    estudio.set(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);

    // Buscar el paciente por curp para asignarlo al estudio.
    const tablaPaciente = Parse.Object.extend(CONSTANTS.PACIENTE);
    let query = new Parse.Query(tablaPaciente);
    query.equalTo(CONSTANTS.CURP, data.curp);
    
    try {
        const paciente = await query.first();

        // Mostrar error en caso de que el paciente no este registrado
        if (!paciente) {
            return results(null, 'No se encontró un paciente con ese CURP');
        }

        // Asignar el pointer de idPaciente al estudio, y asignar la química que lo creo.
        estudio.set(CONSTANTS.IDPACIENTE, paciente);
        estudio.set(CONSTANTS.IDUSUARIO, Parse.User.current());

        try {
            // Guardar el nuevo estudio
            const estudioSaved = await estudio.save();

            // Crear una lista de resultados donde almacenaremos el resultado de cada parámetro.
            let resultados = [];
            for (let i = 0; i < data.parametros.length; i++) {
                const query = new Parse.Query(Parametro);
                query.include(CONSTANTS.IDTIPOVALOR);
                
                try {
                    const parametro = await query.get(data.parametros[i].objectId);
                    // Asignar el pointer del idEstudio al estudio creado previamente.
                    let resultado = new Resultado();
                    resultado.set(CONSTANTS.IDESTUDIO, estudioSaved);

                    // Asignar el pointer del idEstudio al estudio creado previamente.
                    resultado.set(CONSTANTS.IDPARAMETRO, parametro);

                    let jsonParam = JSON.parse(JSON.stringify(parametro));

                    // Asignar el resultado del parámetro dependiendo que tipo de dato recibe el parámetro
                    if (jsonParam.idTipoValor.nombre === 'Numérico') {
                        resultado.set(CONSTANTS.VALORNUM, Number(data.parametros[i].valor));
                    }
                    else if (jsonParam.idTipoValor.nombre === 'Positivo/Negativo') {
                        if (data.parametros[i].valor === 'positivo') {
                            resultado.set(CONSTANTS.VALORBOOL, true);
                        }
                        else {
                            resultado.set(CONSTANTS.VALORBOOL, false);
                        }
                    }
                    else if (jsonParam.idTipoValor.nombre === 'Texto') {
                        data.parametros[i].valor && resultado.set(CONSTANTS.VALORSTRING, data.parametros[i].valor);
                    }

                    resultados.push(resultado);
                } catch(error) {
                    // Mostrar error en caso de borrar los parámetros.
                    return results(null, error.message);
                }
                
            }

            try {
                // Guardar todos los resultados de cada parámetro
                await Parse.Object.saveAll(resultados);
                return results(resultados, null);

            } catch(error) {
                // En caso de que no se guarde algún resultado, buscar los resultados cuyo pointer de 
                // idEstudio sea el creado previamente.
                let tabla = Parse.Object.extend(CONSTANTS.RESULTADO);
                let queryResultadosGuardados = new Parse.Query(tabla);
                queryResultadosGuardados.equalTo(CONSTANTS.IDESTUDIO, estudioSaved);

                try {
                    // Obtener los resultados guardados
                    let resultadosGuardados = await queryResultadosGuardados.find();

                        // Destruir cada uno de los resultados
                        for (let i = 0; i < resultadosGuardados.length; i++) {
                            await resultadosGuardados[i].destroy();
                        }

                        // Destruir el estudio
                        await estudioSaved.destroy();
                        return results(null, 'No se pudo guardar el resultado, intente nuevamente.');

                } catch(error) {
                    // Mostrar error en caso de borrar los parámetros.
                    return results(null, error.message);
                }
            }
        } catch (error) {
            // Mostrar error en caso de guardar el estudio
            return results(null, error.message);
        }
    } catch (error) {
        // Mostrar error en caso de no encontrar el paciente
        return results(null, error.message);
    }
}
