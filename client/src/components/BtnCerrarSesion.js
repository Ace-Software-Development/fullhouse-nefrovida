

const BtnCerrarSesion = ({ icono = "logout", texto = "Cerrar Sesión", url ="/Cerrar/Sesión"}) => {
    return(
      <a className="waves-effect waves-dark btn btn-logout white red-text text-accent-4" href={url}>{texto}<i className="material-icons right">{icono}</i></a>
    )
  
}

export default BtnCerrarSesion