import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import IniciarSesion from './pages/IniciarSesion';
import RegistrarEstudio from './pages/RegistrarEstudio';
import ConsultarTipoEstudioAdmin from './pages/ConsultarTipoEstudioAdmin';
import ConsultarTipoEstudioQuim from './pages/ConsultarTipoEstudioQuim';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<IniciarSesion />} />
        <Route exact path='/registrarEstudio' element={<RegistrarEstudio />} />
        <Route exact path='/consultarTipoEstudioAdmin' element={<ConsultarTipoEstudioAdmin />} />
        <Route exact path='/consultarTipoEstudioQuim' element={<ConsultarTipoEstudioQuim />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;