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

const Navbar = () => {
  return(
    <header>
    <div className="navbar-fixed">
      <nav className="z-depth-2">
        <div className="nav-wrapper c_F9F9F9">
          <a href="#!" className="brand-logo"><img className="logotipo" src={logo}/></a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
          <ul className="right">
            <li><a className="hide-on-small-and-down waves-effect waves-dark btn btn-logout white red-text text-accent-4">Cerrar sesión<i className="material-icons right">logout</i></a></li>
            <li><a className="hide-on-med-and-up waves-effect waves-dark btn btn-logout white red-text text-accent-4"><i className="material-icons right">logout</i></a></li>
          </ul>
        </div>
      </nav>
    </div>
    <ul className="sidenav sidenav-fixed center c_EAECF1 z-depth-0" id="mobile-demo">
      <li><p></p></li>
      <li><i className="material-icons sidenav-button c_908F98 waves-effect waves-dark">vaccines</i></li>
    </ul>
  </header>
  )
}

const Main = () => {
  return(
    <main className="center container">
      
    </main>
  )
}


const Card = ({icono = "person", titulo = "Empleados", subtitulo = "Doctores"}) => {
  return(
    <div className="card">
      <div className="card-vacia">
        <div className="card-titulo">
          <i className="material-icons sidenav-button icon-separator">{icono}</i>{titulo}
        </div>
        <div className="card-subtitulo">
          {subtitulo}
        </div>
      </div>
    </div>
  )
}

const FormularioColaborador = ({}) => {
  
  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassowrd] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
    const data = {nombre, paterno, materno, nacimiento, sexo, telefono, rol, correo, password};
    console.log(data);
  }
  
  return (
  <div className="card">
    <div className="card-vacia">
      <div className="card-titulo">
        <i className="material-icons sidenav-button icon-separator">person_add</i>Registrar empleado
      </div>
      <div className="contenedor card-formulario">
        <a className="waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4 left">Regresar<i className="material-icons left">arrow_back</i></a>
        <br></br><br></br>
        <div className="row">
          <form onSubmit={handleSubmit} className="col s12">
            <div className="row row-figma">
              <div className="input-field col s12 m4">
                <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="validate z-depth-1"></input>
                <label for="nombre">Nombre</label>
              </div>
              <div className="input-field col s12 m4">
                <input id="paterno" type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} className="validate z-depth-1"></input>
                <label for="paterno">Apellido Paterno</label>
              </div>
              <div className="input-field col s12 m4">
                <input id="materno" type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} className="validate z-depth-1"></input>
                <label for="materno">Apellido Materno</label>
              </div>
            </div>
            <div className="row row-figma">
              <div className="input-field col s8 m4">
                <input id="nacimiento" type="text" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} className="datepicker z-depth-1"></input>
                <label for="nacimiento">Fecha de nacimiento</label>
              </div>
              <div className="input-field col s4 m2">
                <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                  <option value="" disabled selected></option>
                  <option value="1">Hombre</option>
                  <option value="2">Mujer</option>
                </select>
                <label>Sexo</label>
              </div>
              <div className="input-field col s8 m4">
                <input id="telefono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="validate z-depth-1"></input>
                <label for="telefono">Teléfono</label>
              </div>
              <div className="input-field col s4 m2">
                <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="" disabled selected></option>
                  <option value="1">Trabajador social</option>
                  <option value="2">Químico</option>
                  <option value="3">Doctor</option>
                  <option value="4">Nutriólogo</option>
                  <option value="5">Psicólogo</option>
                </select>
                <label>Rol</label>
              </div>
            </div>
            <div className="row row-figma">
              <div className="input-field col s8">
                <input id="email" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="validate z-depth-1"></input>
                <label for="email">Correo electrónico:</label>
              </div>
              <div className="input-field col s4">
                <input id="password" type="password" value={password} onChange={(e) => setPassowrd(e.target.value)} className="validate z-depth-1"></input>
                <label for="password">Contraseña</label>
              </div>
            </div>
          </form>
        </div>
        <button className="waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4 right">Guardar<i className="material-icons left">save</i></button>
      </div>
    </div>
  </div>
  )
}

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