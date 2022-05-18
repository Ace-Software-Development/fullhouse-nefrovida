import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import RegistrarEstudio from './Pages/RegistrarEstudio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registrarEstudio' element={<RegistrarEstudio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;