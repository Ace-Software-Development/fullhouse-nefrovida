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
import Main from './Pages/Main';
import Card from './Pages/Card';
import CardTitulo from './components/CardTitulo';
import Cardsubtitulo from './components/CardSubtitulo';
import FormularioColaborador from './Pages/FormularioColaborador';




function App() {
  return (
    <>
      <header>
        <div className="navbar-fixed">
          <nav className="z-depth-2">
            <div className="nav-wrapper c_F9F9F9">
              <a href="/home" className="brand-logo"><img className="logotipo" alt="NefroVida Logo" src={logo}/></a>
              <a href="/menu" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
              <ul className="right">
                <li><a className="hide-on-small-and-down waves-effect waves-dark btn btn-logout white red-text text-accent-4">Cerrar sesión<i className="material-icons right">logout</i></a></li>
                <li><a className="hide-on-med-and-up waves-effect waves-dark btn btn-logout white red-text text-accent-4"><i className="material-icons right">logout</i></a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <main className="center container"> 

        <br/><br/>
        <FormularioColaborador/>

      </main>
    </>
  )
}

export default App;