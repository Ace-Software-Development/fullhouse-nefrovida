
const BtnEliminar = ({ icono = "delete", texto = "Eliminar", url = "/Eliminar"}) => {
    return (
      <a className="z-depth-0 waves-effect waves-dark btn btn-eliminar c_Transparente red-text text-darken-2 subrayado" href = {url}>{texto}<i className="material-icons left">{icono}</i></a>
    )
}

export default BtnEliminar