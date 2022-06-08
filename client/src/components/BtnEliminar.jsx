const BtnEliminar = ({ icono = "delete", texto = "Eliminar", posicion = "left", ...rest}) => {
  return (
    <button 
      className= {"z-depth-0 waves-effect waves-dark btn btn-eliminar c-Transparente red-text text-darken-2 subrayado no-border " + posicion}
      {...rest} 
    >{texto}
      <i className="material-icons left"  >{icono}</i>
    </button>
  )
}

export default BtnEliminar