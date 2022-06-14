import logo from "../img/logo.png";
import CerrarSesion from "./CerrarSesion"
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';


const Navbar = ({children}) => {
  return(
  <header>
    <div className="navbar-fixed"  >
      <nav className="z-depth-2"  >
        <div className="nav-wrapper c-F9F9F9-transparente"  >
          <Link to ={"/"}>
            <a 
            className="brand-logo"  
            >
              <img 
                className="logotipo" 
                src={ logo }
                alr="Logotipo Nefrovida"/>
            </a>
          </Link>

          <ul className="right"  >            
            <CerrarSesion/>
          </ul>
          
          <ul className="header-flex right c-908F98 hide-usuario">
            <i class="medium material-icons icon-separator icono-empleado">account_circle</i> 
            <div>{ ReactSession.get('nombre') + " " + ReactSession.get('apellido') } &nbsp;&nbsp;&nbsp;&nbsp;</div>
          </ul>

          <ul className="header-flex left c-908F98 show-usuario hide-usuario-new">
            &nbsp;&nbsp;&nbsp;&nbsp; <i class="medium material-icons icon-separator icono-empleado">account_circle</i> 
            <div>{ ReactSession.get('nombre') + " " + ReactSession.get('apellido') } </div>
          </ul>
          
        </div>
      </nav>
    </div>
    {children}
  </header>
  )
}

export default Navbar