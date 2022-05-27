import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import ConsultarEstudioPaciente from './Pages/ConsultarEstudioPaciente';
import EstudiosLaboratorio from './Pages/EstudiosLaboratorio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/estudio/:idEstudio' element={<ConsultarEstudioPaciente/>} />
        <Route exact path='/paciente/:idPaciente/estudios' element={<EstudiosLaboratorio/>} />
      </Routes>
    </BrowserRouter>
  )
}

// idEstudio = "MdQLqakPBb"

export default App;