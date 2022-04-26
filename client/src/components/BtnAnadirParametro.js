
const BtnAnadirParametro = ({ icono = "add", texto = "Añadir Parámetro", url ="/addparameter"}) => {
    return (
      <button className="waves-effect waves-dark btn btn-parametro white green lighten-3 grey-text text-darken-4" href={url}>{texto}<i className="material-icons left">{icono}</i></button>
    )
}

export default BtnAnadirParametro