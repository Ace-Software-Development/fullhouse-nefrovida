export default function validarIniciarSesion(values) {
    let errors = {}
    console.log("validar", values.usuario)

    if (!values.nombre.trim() || values.usuario == '') {
        console.log("no usuario")
        errors.nombre = "Usuario requerido"
    }

    return errors
}