import React from 'react';
import { useState } from "react";
import logo from './img/logo.png';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import BtnCerrarSesion from './components/BtnCerrarSesion';
import BtnRegresar from './components/BtnRegresar';
import BtnAnadirParametro from './components/BtnAnadirParametro';
import BtnEditRegis from './components/BtnEditRegis';
import BtnGuardar from './components/BtnGuardar';
import BtnEliminar from './components/BtnEliminar';
import Navbar from './Pages/Navbar';
import Main from './components/Main'
import Card from './components/Card';
import CardTitulo from './components/CardTitulo';
import Cardsubtitulo from './components/CardSubtitulo';
import Form from './components/Form';
import LineaCampos from './components/LineaCampos';
import ContainerForm from './components/ContainerForm'
import Input from './components/Input'
import Datepicker from './components/Datepicker';
import Select from './components/Select'
import FormColaborador from './Pages/FormColaborador'

function App() {
  return (
    <>
      <Navbar/>
      <Main>
        <br/><br/>
        <FormColaborador/>
      </Main>
    </>
  )
}

export default App;