const sessionModel = require('../models/sessionModel');

/**
 * authUsuario Función para validar que usuario 
 * se haya autenticado en el sistema.
 * 
 * Recibe token de session desde React para 
 * validarlo obteniendo el rol con el que 
 * cuenta el usuario.
 * 
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @param {Function} next función que ejecuta siguiente middleware
 * @returns response - Respuesta a la petición actualizada.
 */
function authUsuario(request, response, next) {
    var sessionToken = null;
    // Si se obtuvo una petición POST obtener token del body
    if (request.method === 'POST') {
        if (request.body && request.body.session && request.body.session.sessionToken) {
            sessionToken = request.body.session.sessionToken;
        }

    } 
    // Si petición fue GET o DELETE obtener token dentro de ruta
    else {
        if (request.query.token) {
            sessionToken = request.query.token;
        }
    }

    // Si no se obtiene token definir que debe iniciar sesión
    if ( !sessionToken ) {
        return response.status(401).send({
            message: 'Sesion invalida'
        });
    }
    
    // Consultar rol del token de session obtenido
    sessionModel.obtenerSession(sessionToken)
        .then((session) => {
            // Si no se obtuo rol o hubo error en consulta
            if(session && !session.rol) {
                // Retornar "Session invalida" para que usuario se autentique nuevamente
                return response.status(401).send({
                    
                    message: session.message
                });
            } else {
                request.rol = session.rol;
                next()
            }
        }, (error) => {
            return response.status(401).send({
                message: error.message
            });
        })
}

/**
 * noAuthUsuario Función para validar que usuario no se haya autenticado aún en el sistema.

 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @param {Function} next función que ejecuta siguiente middleware
 * @returns response - Respuesta a la petición actualizada.
 */
function noAuthUsuario(request, response, next) {
    var sessionToken = null;
    if (request.method === 'POST') {
        if (request.body && request.body.session && request.body.session.sessionToken) {
            sessionToken = request.body.session.sessionToken;
        }

    } else {
        if (request.query.token) {
            sessionToken = request.query.token;
        }
    }
    if (sessionToken) {
        return response.status(403).send({
            message: 'Ya hay una sesión de usuario activa.'
        });
    }
    next()
}

/**
 * authRol Función para validar que usuario autenticado cuenta con permiso para ingresar a ruta del sistema.
 * Consulta rol registrado en sesión.
 * 
 * @param {Array} roles arreglo con roles permitidos el acceso a ruta 
 * @returns response - Respuesta a la petición autorizando o no el acceso del usuario a ruta.
 */
function authRol(roles) {
    return (request, response, next) => {
        if (!roles.includes(request.rol)) {
            return response.status(403).send({
                message: 'Acceso no autorizado' 
            });
        }
        next()
    }
}

module.exports = {
    authUsuario,
    noAuthUsuario,
    authRol
}