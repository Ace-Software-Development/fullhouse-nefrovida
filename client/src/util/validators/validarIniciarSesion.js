export default function validarIniciarSesion(values) {
    let errors = {};

    if (!values.username.trim() || values.username == '') {
        errors.username = "Usuario requerido";
    }

    if (!values.password.trim() || values.password == '') {
        errors.password = "Contraseña requerida";
    }

    return errors;
}