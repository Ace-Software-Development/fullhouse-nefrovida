const BtnEliminar = ({ icono = "delete", texto = "Eliminar", url = "/Eliminar", posicion = "left"}) => {
  return (
    <button 
      className= {"z-depth-0 waves-effect waves-dark btn btn-eliminar c_Transparente red-text text-darken-2 subrayado no-border " + posicion} 
      href = {url}
    >{texto}
      <i className="material-icons left"  >{icono}</i>
    </button>
  )
}

export default BtnEliminar