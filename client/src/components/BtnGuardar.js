const BtnGuardar = ({icono = "save", texto = "Guardar"}) => {
    return(
      <button className="waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4 right">{texto}<i className="material-icons left">{icono}</i></button>
    )
}


export default BtnGuardar