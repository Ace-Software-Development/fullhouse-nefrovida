export default function validarRegistrarPaciente(values) {
    let errors = {}
    console.log("validar", values.nombre)

    if (!values.nombre.trim() || values.nombre == '') {
        console.log("no nombre")
        errors.nombre = "Nombre requerido"
    }

    return errors
}