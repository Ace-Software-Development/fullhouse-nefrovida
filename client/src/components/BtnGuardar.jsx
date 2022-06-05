const BtnGuardar = ({icono = "save", texto = "Guardar", posicion = "right", ...rest}) => {
  return(
    <button 
      type="submit" 
      className={"waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4 " + posicion}
      {...rest}
    >{texto}
      <i className="material-icons left"  >{icono}</i>
    </button>
  )
}

export default BtnGuardar