import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './Pages/IniciarSesion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<IniciarSesion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;