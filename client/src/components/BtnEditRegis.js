
const BtnEditRegis = ({icono = "help", texto = "Cargando", url = "/registrar", posicion = "right" }) => {
    return(
      <a className= {"waves-effect waves-dark btn btn-editar-registrar blue darken-1 white-text text-accent-4"+ posicion} href={url}>{texto}<i className="material-icons left">{icono}</i></a>
    )
}

export default BtnEditRegis
