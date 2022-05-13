import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/home';
import IniciarSesion from './Pages/iniciarSesion';
import { ReactSession } from 'react-client-session';

function App() {
  // Definir que session se almacenará en una cookie
  ReactSession.setStoreType("cookie");

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<IniciarSesion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;