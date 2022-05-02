import React from "react";
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import Tabla from './components/Tabla'

function App() {
  const arr = [{nombre: "Eduardo", materno: "Pete", paterno: "Gil", sexo:"Hombre", rol: "Dueño de pepe", telefono:"4641063915", detalle:"http://store.steampowered.com/" },
              {nombre: "yO", materno: "Pete", paterno: "Gil", sexo:"Hombre", rol: "Dueño de pepe", telefono:"4641063915", detalle:"http://store.steampowered.com/" },
              {nombre: "Otro", materno: "Pete", paterno: "Gil", sexo:"Hombre", rol: "Dueño de pepe", telefono:"4641063915", detalle:"http://store.steampowered.com/" }
            ]
  return (
    <>
      <Tabla arr= {arr} id="nombres"/>
    </>
  )
}

export default App;