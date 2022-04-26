
const BtnGuardar = ({icono = "save", texto = "Guardar", url = "/guardar", posicion = "right"}) => {
    return(
      <a className= {"waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4" + posicion} href={url}>{texto}<i className="material-icons left">{icono}</i></a>
    
    )
}


export default BtnGuardar