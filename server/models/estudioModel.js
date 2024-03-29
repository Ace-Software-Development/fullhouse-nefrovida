let CONSTANTS = require("../constantsProject");
const { obtenerColaboradorUsuario } = require("./colaboradorModel");

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
    estudio.set(CONSTANTS.ACTIVO, true);

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
        

        try {
            const colaborador = await obtenerColaboradorUsuario(data.usuario);
            estudio.set(CONSTANTS.IDUSUARIO, colaborador.colaborador);
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

/**
 * Función auxiliar para devolver el resultado
 * de un parametro obtenido en un estudio.
 * @param {JSON} json - JSON de query
 * @returns valor del resultado
 */
function obtenerValorResultado(json) {
    const tipoValor = json.idParametro.idTipoValor.nombre;

    if(tipoValor === 'Numérico') {
        const valorNum = json.valorNum;
        return valorNum
    }
    else if(tipoValor === 'Texto') {
        const valorString = json.valorString;
        return valorString
    }
    else {
        const valorBool = json.valorBool;
        if(valorBool) {
            return 'Positivo'
        }
        else{
            return 'Negativo'
        }
    }
}


/**
 * Función auxiliar para devolver el valor de referencia
 * de un parametro en un estudio.
 * @param {JSON} json - JSON de query
 * @returns valor de referencia
 */
function obtenerValorReferenciaParametro(json) {
    const tipoValor = json.idParametro.idTipoValor.nombre;

    if(tipoValor === 'Numérico') {
        const valorMin = json.idParametro.valorMin;
        const valorMax = json.idParametro.valorMax;
        const tieneRango = json.idParametro.tieneRango;

        if(tieneRango) {
            return valorMin + ' - ' + valorMax
        }
        else{
            return valorMin
        }
    }
    else if(tipoValor === 'Texto') {
        const valorString = json.idParametro.valorString;
        return valorString
    }
    else {
        const valorBool = json.idParametro.valorBool;
        if(valorBool) {
            return 'Positivo'
        }
        else{
            return 'Negativo'
        }
    }
}


/**
 * asyncObtenerEstudioPaciente Función asíncrona para obtener el estudio de un paciente.
 * @param {string} idEstudio - Identificador del estudio
 * @returns Información del detalle de estudio de un paciente.
 */
exports.obtenerEstudioPaciente = async(idEstudio) => {
    const tablaEstudio = Parse.Object.extend(CONSTANTS.ESTUDIO);
    const queryObtenerEstudio = new Parse.Query(tablaEstudio);
    queryObtenerEstudio.limit(999999);
    queryObtenerEstudio.include(CONSTANTS.IDTIPOESTUDIO);
    queryObtenerEstudio.include(CONSTANTS.IDPACIENTE);
    try {
        const estudio = await queryObtenerEstudio.get(idEstudio);
        
        const tablaResultado = Parse.Object.extend(CONSTANTS.RESULTADO);
        const queryResultados = new Parse.Query(tablaResultado);
        
        queryResultados.include(CONSTANTS.IDPARAMETRO);
        queryResultados.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);

        queryResultados.equalTo(CONSTANTS.IDESTUDIO, estudio);
        try {
            const parametros = await queryResultados.find();

            // Enviar el error si el estudio no esta activo
            if ( !estudio.get(CONSTANTS.ACTIVO)) {
                return { 
                    estudio: null,
                    error: 'El estudio fue eliminado anteriormente.'
                }
            }

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
                nombrePaciente: jsonEstudio.idPaciente.nombre + " " + jsonEstudio.idPaciente.apellidoPaterno + " " + jsonEstudio.idPaciente.apellidoMaterno,
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
                estudio: null,
                error: error.message
            }
        }
    } catch (error) {
        return {
            estudio: null,
            error: 'No se encontró dicho estudio del paciente.'
        }
    }
}


/**
 * asyncEliminarEstudio Función asíncrona para eliminar un estudio del paciente.
 * @param {Object} data Información enviada en el body, debe incluir información del estudio
 * y el resultado de cada parámetro
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.eliminarEstudio = async(data) => {
    const query = new Parse.Query(CONSTANTS.ESTUDIO);
    query.equalTo(CONSTANTS.OBJECTID, data.idEstudio);
    const result = await query.first();
    result.set(CONSTANTS.ACTIVO, false);
    try{
        await result.save();
        return {
            estudio: result,
            error: null
        }
    } catch (error) {
        return {
            estudio: null,
            error: 'No se pudo eliminar el estudio.'
        }
    }
}