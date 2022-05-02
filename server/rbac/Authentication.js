/**
 * Funciones de autenticación para validar si usuario ha iniciado sesión o no en el sistema.
*/
function authUsuario(request, response, next) {
    if (request.usuario == null) {
        response.status(403)
        return response.send('Necesita iniciar sesión primero')
    }
    next()
}

function noAuthUsuario(request, response, next) {
    if (request.usuario !== null) {
        return response.send('Ya hay una sesión de usuario activa.')
    }
    next()
}

/**
 * Función para validar que usuario autenticado cuenta con permiso para ingresar a ruta del sistema.
*/
function authRol(roles) {
    return (request, response, next) => {
        if (!roles.includes(request.usuario.rol)) {
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