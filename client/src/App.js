import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import RegistrarEstudio from './pages/RegistrarEstudio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registrarEstudio' element={<RegistrarEstudio curp="PICA010404MQTXVNA5" idTipoEstudio="HifRCCITUo"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;