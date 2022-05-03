const BtnRestablecer = ({texto = "Restablecer contraseña?", url ="/", posicion="center"}) => {
    return(
      <button 
        className={"z-depth-0 waves-effect waves-dark btn btn-restablecer c-Transparente blue-text text-darken-2 subrayado no-border " + posicion} 
        href={url}
      >
        {texto}
      </button>
    )
  }
  
  export default BtnRestablecer