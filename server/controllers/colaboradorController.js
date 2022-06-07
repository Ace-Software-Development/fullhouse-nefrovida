const colaboradorModel = require('../models/colaboradorModel');
const rolModel = require('../models/rolModel');

/**
 * getRegistrarColaborador Función asíncrona para mostrar roles 
 * en formulario de registro de colaborador.
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @returns response - Respuesta a la petición actualizada.
 */
module.exports.getRegistrarColaborador = async(request, response) => {
    try {
        // Obtiene lista de roles en base de datos.
        const results = await rolModel.obtenerRoles();
        // Si hubo error al obtener roles retorna mensaje de error.
        if (results.error) {
            return response.status(400).send( {
                roles: null,
                message: results.error
            });
        }
        // Respuesta de éxito con lista de roles existentes.
        response.status(200).send( {
            roles: results.roles,
            message: "Lista de roles en base de datos"
        });
    } 
    // En caso de error, retorna mensaje de error.
    catch(error) {
        response.status(400).send( {
            roles: null,
            message: error.message
        });
    }
}


/**
 * registrarColaborador Función asíncrona para dar de alta 
 * información de colaborador de Nefrovida en base de datos.
 * Envía datos recibidos del formulario al modelo para que 
 * los almacene en base de datos.
 * 
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @returns response - Respuesta a la petición actualizada con colaborador registrado o mensaje de error.
 */
module.exports.registrarColaborador = async(request, response) => {
    try {
        // Envia información de registro a modelo.
        const results = await colaboradorModel.registrarColaborador(request.body);
        // Si hubo un error en el registro retorna mensaje de error.
        if (results.error) {
            return response.status(400).send( {
                colaborador: null,
                message: results.error
            });
        }
        // Si hubo éxito en el registro retorna información de colaborador registrada.
        response.status(200).send( {
            colaborador: results.colaborador,
            message: "Colaborador registrado"
        });
        
    } catch(error) {
        response.status(400).send( {
            colaborador: null,
            message: error.message
        });
    }
}


/**
 * iniciarSesionColaborador Función asíncrona que valida credenciales 
 * de acceso permitiendo o no el acceso al resto de la aplicación.
 * 
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @returns response - Respuesta a la petición actualizada con colaborador autenticado o mensaje de error.
 */
module.exports.iniciarSesionColaborador = async(request, response) => {
    try {
        const results = await colaboradorModel.iniciarSesionColaborador(request.body);
        // Si hubo error, no se permite acceso.
        if (results.error) {
            return response.status(400).send( {
                usuario: results.usuario,
                nombre: results.nombre,
                apellido: results.apellido,
                sessionToken: results.sessionToken,
                rol: results.rol,
                message: results.error
            });
        } else {
            // Retornar información de colaborador
            return response.status(200).send( {
                usuario: results.usuario,
                nombre: results.nombre,
                apellido: results.apellido,
                sessionToken: results.sessionToken,
                rol: results.rol,
                message: "Inicio de Sesion exitoso!!"
            });
        }        
        
    } catch(error) {
        return response.status(400).send( {
            usuario: null,
            nombre: null,
            apellido: null,
            sessionToken: null,
            rol: null,
            message: error.message
        });
    }
}


/**
 * cerrarSesionColaborador Función asíncrona para eliminar sesión 
 * de usuario y denegar acceso al sistema hasta nueva autenticación.
 * 
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @returns response - Respuesta a la petición. Sesión destruida.
 */
module.exports.cerrarSesionColaborador = async(request, response) => {
    try {
        // Cerrar sesión usuario de Parse.
        const results = await colaboradorModel.cerrarSesionColaborador();
        // Si hubo error, retornar mensaje.
        if (results.error) {
            return response.status(400).send( {
                message: results.error
            });
        }

        return response.status(200).send( {
            message: "Sesion Cerrada correctamente"
        });
        
    } catch(error) {
        return response.status(400).send( {
            message: error.message
        });
    }
}


/**
 * asyncConsultarColaborador función asíncrona para obtener la información de todos los
 * colaboradores registrados en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarColaborador = async(request, response) => {
    try {
        const results = await colaboradorModel.consultarColaboradores();

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Empleados obtenidos exitosamente.'
        });
    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        });
    }
}


/**
 * asyncConsutarDetalleColaborador función asíncrona para consultar la información 
 * de un colaborador, buscandolo por username.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consutarDetalleColaborador = async(request, response) => {
    // Se obtiene el username de los parametros de la ruta
    const username = request.query.id;
    console.log("controller", username)

    try {
        const results = await colaboradorModel.buscarPorUsuario(username);

        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            });
        }
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Empleado obtenido exitosamente'
        });
    } catch(error) {
        response.status(200).send({
            status: 'success',
            data: results,
            message: 'Empleado obtenido exitosamente'
        });
    }
}