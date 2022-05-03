const BtnIniciarSesion = ({ icono = "login", texto = "Iniciar sesión", url ="/login", posicion="center"}) => {
    return(
      <button 
        className={"waves-effect waves-dark btn btn-login white black-text text-black " + posicion} 
        href={url}
      >
        {texto}
        <i className="material-icons left"  >{icono}</i>
      </button>
    )
  }
  
  export default BtnIniciarSesion