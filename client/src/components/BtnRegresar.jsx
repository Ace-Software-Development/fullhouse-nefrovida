import { useNavigate } from "react-router-dom";

const BtnRegresar = ({icono = "arrow_back", texto = "Regresar", url = "/regresar" , posicion = "left", regresarOverride = false}) => {

  let navigate = useNavigate();

  return(
    <>
    {regresarOverride ? (
      <button 
        className= {"waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4 no-border " + posicion} 
      >
        {texto}
        <i className="material-icons left"  >{icono}</i>
      </button>
    ) : (
      <button 
        className= {"waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4 no-border " + posicion} 
        onClick={() => navigate(-1)}
      >
        {texto}
        <i className="material-icons left"  >{icono}</i>
      </button>
    )}
    </>

  )
}

export default BtnRegresar