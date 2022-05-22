const BtnCerrarSesion = ({ icono = "logout", texto = "Cerrar Sesión", url ="/logout", posicion="right", small=false}) => {
  return(
    <>
      {small ? 
        <button 
        className={"cerrarSesionFix hide-on-small-and-down waves-effect waves-dark btn btn-logout white red-text text-accent-4 "} 
        href={url}
        >
          {texto}
          <i className="material-icons right cerrarSesionIconoFix"  >{icono}</i>
        </button> 
        
        : 
        
        <button 
        className={"cerrarSesionFix hide-on-med-and-up waves-effect waves-dark btn btn-logout white red-text text-accent-4 "} 
        href={url}
        >
          <i className="material-icons right cerrarSesionIconoFix"  >{icono}</i>
        </button>}

    </>
  )
}

export default BtnCerrarSesion