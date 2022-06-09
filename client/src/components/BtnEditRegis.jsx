const BtnEditRegis = ({icono = "help", texto = "Cargando", posicion = "right", ...rest }) => {
  return(
    <button 
      className = {"waves-effect waves-dark btn btn-editar-registrar blue darken-1 white-text text-accent-4 "+ posicion}
      {...rest}
    >
    {texto}
    <i className="material-icons left"  >{icono}</i>
    </button>
  )
}

export default BtnEditRegis
