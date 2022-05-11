import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegistrarPaciente from './pages/RegistrarPaciente'
import RegistrarColaborador from './pages/RegistrarColaborador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/paciente' element={<RegistrarPaciente />} />
        <Route exact path='/colaboradores/registrar' element={<RegistrarColaborador />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;