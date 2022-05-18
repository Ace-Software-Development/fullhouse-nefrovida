import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ConsultarTipoEstudio from './pages/ConsultarTipoEstudio';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/consultarTipoEstudio' element={<ConsultarTipoEstudio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;