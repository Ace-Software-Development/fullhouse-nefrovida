/**
 * authUsuario Función para validar que usuario se haya autenticado en el sistema.
 * 
 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @param {Function} next función que ejecuta siguiente middleware
 * @returns response - Respuesta a la petición actualizada.
 */
function authUsuario(request, response, next) {
    if (!request.session.isPopulated || (request.session.isPopulated && !request.session.usuario) ) {
        response.status(403)
        return response.send('Necesita iniciar sesión primero')
    }
    next()
}

/**
 * noAuthUsuario Función para validar que usuario no se haya autenticado aún en el sistema.

 * @param {object} request - Petición al servidor
 * @param {object} response - Respuesta a la petición realizada al servidor.
 * @param {Function} next función que ejecuta siguiente middleware
 * @returns response - Respuesta a la petición actualizada.
 */
function noAuthUsuario(request, response, next) {
    if (request.session.isPopulated && request.session.isLoggedIn) {
        return response.send('Ya hay una sesión de usuario activa.')
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
        if (!roles.includes(request.session.rol)) {
            response.status(401)
            return response.send('Acceso no autorizado')
        }
        next()
    }
}

module.exports = {
    authUsuario,
    noAuthUsuario,
    authRol
}