

const BtnRegresar = ({icono = "arrow_back", texto = "Regresar", url = "/regresar"}) => {
    return(
      <a className="waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
    )
}

export default BtnRegresar