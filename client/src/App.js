import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import ConsultarEstudioPaciente from './Pages/ConsultarEstudioPaciente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/estudio' element={<ConsultarEstudioPaciente idEstudio = "MdQLqakPBb"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;