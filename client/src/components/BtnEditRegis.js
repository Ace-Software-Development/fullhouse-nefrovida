
const BtnEditRegis = ({icono = "help", texto = "Cargando", url = "/registrar"}) => {
    return(
      <a className="waves-effect waves-dark btn btn-editar-registrar blue darken-1 white-text text-accent-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
    )
}

export default BtnEditRegis
