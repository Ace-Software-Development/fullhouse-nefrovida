import React from 'react';
import "./css/materialize-mod.css";
import "./css/components.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegistrarPaciente from './pages/RegistrarPaciente'
import DetallePaciente from './pages/DetallePaciente'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/paciente' element={<RegistrarPaciente />} />
        <Route exact path= '/:curp' element={<DetallePaciente/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;