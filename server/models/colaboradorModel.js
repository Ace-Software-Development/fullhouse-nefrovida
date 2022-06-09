const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require('../constantsProject');
const rolModel = require('../models/rolModel');
const seguridad = require('../util/seguridad');

/**
 * obtenerTodos Función asíncrona que retorna lista completa de colaboradores registrados en base de datos.
 * @returns json con lista de colaboradores o mensaje de error.
 */
exports.obtenerTodos = async() => {
    var queryObtenerTodos = new Parse.Query(Parse.User);
    queryObtenerTodos.include(CONSTANTS.IDROL);
    queryObtenerTodos.select(CONSTANTS.NOMBRE, CONSTANTS.APELLIDOPATERNO /
        CONSTANTS.APELLIDOMATERNO, CONSTANTS.FECHANACIMIENTO, CONSTANTS.SEXO,
        CONSTANTS.CORREO, CONSTANTS.TELEFONO, CONSTANTS.ACTIVO, CONSTANTS.IDROL);
    try {
        const colabs = await queryObtenerTodos.find();
        return {
            colaboradores: colabs,
            error: null
        }
    } catch (error) {
        return {
            colaboradores: null,
            error: error.message
        }
    }
}

/**
 * Iniciar Sesión: IT3-3 (https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit?usp=sharing)
 * obtenerColaborador Función asíncrona para buscar información de colaborador en base de datos dado un id.
 * @param {number} id Identificador único de colaborador
 * @returns json con colaborador o mensaje de error.
 */
exports.obtenerColaborador = async(id) => {
    const queryColab = new Parse.Query(Parse.User);
    queryColab.equalTo(CONSTANTS.OBJECTID, id);

    try {
        var colab = await queryColab.first();
        return {
            colaborador: colab,
            error: null
        }
    } catch(error) {
        return {
            colaborador: null,
            error: error
        }
    }
}

/**
 * obtenerColaboradorUsuario Función asíncrona para buscar información de colaborador en base de datos dado un usuario.
 * @param {string} usuario credencial de acceso de Colaborador
 * @returns json con colaborador o mensaje de error.
 */
exports.obtenerColaboradorUsuario = async(usuario) => {
    const queryColab = new Parse.Query(Parse.User);
    queryColab.equalTo(CONSTANTS.USUARIO, usuario);

    try {
        var colab = await queryColab.first();
        return {
            colaborador: colab,
            error: null
        }
    } catch(error) {
        return {
            colaborador: null,
            error: error
        }
    }
}

/**
 * resultsRegistrarColaborador Función auxiliar para armar json de respuesta a registro de colaborador.
 * @param {object} colab objeto con información del colaborador registrado.
 * @param {string} error Mensaje de error en caso de haberlo.
 * @returns json con colaborador y mensaje de error recibidos.
 */
function resultsRegistrarColaborador(colab, error){
    return {
        colaborador: colab,
        error: error
    };
}


/**
 * Función auxiliar para retornar los datos y el error.
 * @param {Object} data - Datos a retornar
 * @param {string} error - Mensaje de error en caso de existir
 * @returns 
 */
function resultsColaborador(data, error) {
    return {
        data: data,
        error: error
    }
}

/**
 * registrarColaborador Función asíncrona para dar de alta información de colaborador en base de datos.
 * @param {object} params objeto con infrormación recibida de formulario de registro.
 * @returns json formado por colaborador y mensaje de error en caso de haberlo.
 */
exports.registrarColaborador = async(params) => {
    // Verificar que no exista algún registro con el mismo número de teléfono.
    const queryTelefonoUnico = new Parse.Query(Parse.User);
    queryTelefonoUnico.equalTo(CONSTANTS.TELEFONO, params.telefono);

    try {
        const colaboradorT = await queryTelefonoUnico.first();
        // Si ya existe registro con dicho teléfono, retornar mensaje de error.
        if (colaboradorT && params.telefono) {
            return resultsRegistrarColaborador(colaboradorT, 'Ya existe un empleado registrado con dicho teléfono.');
        }
        // Si no existe un empleado con dicho teléfono aún, crear registro.
        const colaborador = new Parse.User();
        colaborador.set(CONSTANTS.USUARIO, params.usuario);
        colaborador.set(CONSTANTS.NOMBRE, params.nombre);
        colaborador.set(CONSTANTS.APELLIDOPATERNO, params.apellidoPaterno);
        colaborador.set(CONSTANTS.APELLIDOMATERNO, params.apellidoMaterno);
        colaborador.set(CONSTANTS.CORREO, params.correo);
        colaborador.set(CONSTANTS.TELEFONO, params.telefono);
        colaborador.set(CONSTANTS.CONTRASENA, params.password)
        colaborador.set(CONSTANTS.ACTIVO, true);
        const rol = Parse.Object.extend("Rol")
        let rolPointer = new rol();
        rolPointer.id = params.rol;
        colaborador.set("idRol", rolPointer);

        try {
            // Dar de alta colaborador en base de datos.
            const colab = await colaborador.save();
            return resultsRegistrarColaborador(colab, null);

        } 
        // En caso de que haya error al momento de registrar colaborador en base de datos, regresar mensaje correspondiente.
        catch(error) {
            if (error.code === Parse.Error.INVALID_EMAIL_ADDRESS) {
                return resultsRegistrarColaborador(null, 'El correo electrónico ingresado es inválido.');
            }
            else if (error.code === Parse.Error.USERNAME_MISSING) {
                return resultsRegistrarColaborador(null, 'El usuario ingresado es inválido o está faltante.');
            }
            else if (error.code === Parse.Error.PASSWORD_MISSING) {
                return resultsRegistrarColaborador(null, 'La contraseña ingresada es inválida o está faltante.');
            }
            else if (error.code === Parse.Error.USERNAME_TAKEN) {
                return resultsRegistrarColaborador(null, 'El usuario ingresado ya se encuentra en uso.');
            }
            else if (error.code === Parse.Error.EMAIL_TAKEN) {
                return resultsRegistrarColaborador(null, 'El correo electrónico ingresado ya se encuentra en uso.');
            }
            else if (error.code === Parse.Error.EMAIL_MISSING) {
                return resultsRegistrarColaborador(null, 'Correo electrónico faltante.');
            }
            return resultsRegistrarColaborador(null, error.message + ' ' + error.code);
        }
        
    } catch(errorT) {
        return resultsRegistrarColaborador(null, errorT.message);
    }
}

/**
 * Iniciar Sesión: IT3-3 (https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit?usp=sharing)
 * iniciarSesionColaborador Función asíncrona que valida credenciales de acceso con las de la base de datos.
 * @param {objeto} params objeto con información de usuario y contraseña ingresados. 
 * @returns json con colaborador, rol y mensaje de error en caso de que no se haya encontrado registro en la base de datos.
 */
exports.iniciarSesionColaborador = async(params) => {
    try {
        // Dar de alta usuario comparando con credenciales de la base de datos.
        const colab = await Parse.User.logIn(params.username, params.password);
        const colaborador = colab.toJSON();

        try{
            // Consultar rol del usuario autenticado y devolverlo en json.
            const rol = await rolModel.obtenerRol(colaborador.idRol.objectId);
            const nombreRol = rol.rol.get(CONSTANTS.NOMBRE);
            const token = seguridad.encriptar(nombreRol, process.env.SECRET_ENCRYPT);
            
            return {
                usuario: colaborador.username,
                nombre: colaborador.nombre,
                apellido: colaborador.apellidoPaterno,
                sessionToken: token,
                rol: nombreRol,
                error: null
            }

        } catch(error) {
            return {
                usuario: null,
                nombre: null,
                apellido: null,
                sessionToken: null,
                rol: null,
                error: 'Error al obtener permisos de usuario'
            }
        }
    } catch (error) {
        var err = error.message;
        if (error.code === 101) {
            err = 'Usuario y/o constraseña incorrecta.';
        }
        return {
            usuario: null,
            nombre: null,
            apellido: null,
            sessionToken: null,
            rol: null,
            error: err
        }
    }
}

/**
 * cerrarSesionColaborador Función auxiliar para dar de baja sesión de usuario
 * @returns json con error en caso de existir o sesión de usuario dada de baja en base de datos.
 */
exports.cerrarSesionColaborador = async() => {    
    try {
        // Dar de baja sesión de usuario en base de datos utilizando Parse.
        const colab = await Parse.User.logOut();
        return {
            error: null
        }
    } catch (error) {
        return {
            error: error.message
        }
    }
}

/**
 * asyncBuscarPorUsuario función asíncrona para buscar a un colaborador por su username. 
 * @param {string} username - Username del colaborador a buscar
 * @returns Información del colaborador en caso de encontrarlo o un error en caso de no existir.
 */
exports.buscarPorUsuario = async (objectId) => {
    const Table = Parse.Object.extend(Parse.User);
    let query = new Parse.Query(Table);
    query.equalTo(CONSTANTS.OBJECTID, objectId);
    query.include(CONSTANTS.IDROL);

    try {
        const results = await query.first();
        // Enviar error si no existe un colaborador con ese username
        if ( !results ) {
            return resultsColaborador(null, 'No se encontró un colaborador con ese Usuario');
        }
        // Enviar el error si el colaborador no esta activo
        if ( !results.get(CONSTANTS.ACTIVO)) {
            return resultsColaborador(null, 'El objeto fue eliminado anteriormente.');
        }
        return resultsColaborador(results, null);

    } catch (error) {
        return resultsColaborador(null, error.message);
    }
}

/**
 * asynConsultarColaboradores función asíncrona para consultar todos los colaboradores de Nefrovida.
 * @returns Todos los colaboradores registrados en Nefrovida.
 */
exports.consultarColaboradores = async () => {
    const table = Parse.Object.extend(Parse.User);
    let query = new Parse.Query(table);
    query.equalTo(CONSTANTS.ACTIVO, true);
    query.include(CONSTANTS.IDROL);
    
    try {
        const results = await query.find();

        if (!results) {
            return {
                data: null,
                error: 'No hay empleados registrados actualmente'
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


/**
 * asyncBorrarTipoEstudio Función asíncrona para eliminar un tipo de estudio
 * @param {Object} data Información enviada en el body, debe incluir información del estudio
 * y el resultado de cada parámetro
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.borrarEmpleado = async(data) => {
    var User = Parse.Object.extend(Parse.User);
    var query = new Parse.Query(User);
    let result = await query.get(data.objectId, { useMasterKey: true });
    if (!result) new Error('Usuario no encontrado!');

    result.set(CONSTANTS.ACTIVO, false);
    try{
        result.save(null, { useMasterKey: true });
        return {
            empleado: result,
            error: null
        }
    } catch (error) {
        return {
            empleado: null,
            error: 'No se pudo eliminar el empleado.'
        }
    }
}