import {useState, useEffect } from 'react';
const BtnAnadirParametro = ({ icono = "add", texto = "Añadir Parámetro", url ="/addparameter", posicion="left", onClickAction, numParameter}) => {
const [num, setNum] = useState(numParameter)

useEffect(() => {
  onClickAction(num);
},[num]);

  return (
    <button
      onClick={ () =>{
        setNum(num+1)
      }
      }
      className={"waves-effect waves-dark btn btn-parametro white green lighten-3 grey-text text-darken-4 no-border " + posicion}
      href={url}
    >
      {texto}
      <i className="material-icons left"  >{icono}</i>
    </button>
  )
}

export default BtnAnadirParametro