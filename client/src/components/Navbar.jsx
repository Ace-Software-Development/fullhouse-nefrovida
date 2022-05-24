import logo from "../img/logo.png";
import BtnCerrarSesion from "./BtnCerrarSesion";
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from 'react';


const Navbar = ({children}) => {

  



  return(
  <header>
    <div className="navbar-fixed"  >
      <nav className="z-depth-2"  >
        <div className="nav-wrapper c-F9F9F9"  >
          <a 
            href="#!"
            className="brand-logo"
          >
            <img 
              className="logotipo" 
              src={ logo }
              alr="Logotipo Nefrovida"/>
          </a>
          <a 
            href="#"
            data-target="mobile-demo"
            className="sidenav-trigger black-text"
          >
          <i className="material-icons"  >menu</i>
          </a>
          <ul className="right"  >            
             
              <li>
                <BtnCerrarSesion small={ false }/>
              </li>
              <li>
                <BtnCerrarSesion small={ true }/>
              </li>
            
          </ul>
        </div>
      </nav>
    </div>
    {children}
  </header>
  )
}

export default Navbar