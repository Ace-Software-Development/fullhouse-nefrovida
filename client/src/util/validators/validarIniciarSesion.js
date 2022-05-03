export default function validarIniciarSesion(values) {
    let errors = {}
    console.log("validar", values.username)

    if (!values.username.trim() || values.username == '') {
        console.log("no usuario")
        errors.username = "Usuario requerido"
    }

    if (!values.password.trim() || values.password == '') {
        console.log("no password")
        errors.password = "Contraseña requerida"
    }

    return errors
}