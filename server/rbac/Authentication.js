function authUsuario(request, response, next) {
    if (request.usuario == null) {
        response.status(403)
        return response.send('You need to sign in')
    }
    next()
}

function authRol(rol) {
    return (request, response, next) => {
        if (request.usuario && request.usuario.rol !== rol) {
            response.status(401)
            return response.send('Not allowed')
        }
        next()
    }
}

module.exports = {
    authUsuario,
    authRol
}