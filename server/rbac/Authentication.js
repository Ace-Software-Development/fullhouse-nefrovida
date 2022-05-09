/**
 * Función para validar que usuario se haya autenticado en el sistema.
*/
function authUsuario(request, response, next) {
    if (!request.session.isPopulated || (request.session.isPopulated && !request.session.usuario) ) {
        response.status(403)
        return response.send('Necesita iniciar sesión primero')
    }
    next()
}

/**
 * Función para validar que usuario no se haya autenticado aún en el sistema.
*/
function noAuthUsuario(request, response, next) {
    if (request.session.isPopulated && request.session.isLoggedIn) {
        return response.send('Ya hay una sesión de usuario activa.')
    }
    next()
}

/**
 * Función para validar que usuario autenticado cuenta con permiso para ingresar a ruta del sistema.
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