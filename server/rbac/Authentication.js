const seguridad = require('../util/seguridad');

/**
 * authUsuario Función para validar que usuario 
 * se haya autenticado en el sistema.
 * 
 * Recibe token con rol cifrado desde React para 
 * validarlo y asignarlo a cada petición.
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
        } else if (request.headers?.cookie) {
            let cookies = request.headers?.cookie.split("__react_session__=")
            let values = JSON.parse(cookies[1])
            sessionToken = values["sessionToken"]
        }
    }
    
    // Si no se obtiene token definir que debe iniciar sesión
    if ( !sessionToken ) {
        return response.status(401).send({
            message: 'Sesion invalida'
        });
    }
    
    const token = sessionToken.replace(' ', '+');
    const nombreRol = seguridad.desencriptar(token, process.env.SECRET_ENCRYPT);
    
    if (nombreRol) {
        request.rol = nombreRol;
        next()
    } else {
        return response.status(401).send({
            message: "Error al obtener sesión de usuario."
        });
    }
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