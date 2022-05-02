import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegistrarPaciente from './pages/RegistrarPaciente'
import ConsultarInfPaciente from './pages/ConsultarInfPaciente'
import VistaDetalle from './pages/VistaDetalle'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/paciente' element={<RegistrarPaciente />} />
        <Route exact path= '/Verpacientes' element={<ConsultarInfPaciente />}/>
        <Route exact path= '/VistaDetalle' element={<VistaDetalle/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;