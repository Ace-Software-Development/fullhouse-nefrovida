
const BtnAnadirParametro = ({ icono = "add", texto = "Añadir Parámetro", url ="/addparameter", posicion="left"}) => {
    return (
      <button className={"waves-effect waves-dark btn btn-parametro white green lighten-3 grey-text text-darken-4 " + posicion} href={url}>{texto}<i className="material-icons left">{icono}</i></button>
    )
}

export default BtnAnadirParametro