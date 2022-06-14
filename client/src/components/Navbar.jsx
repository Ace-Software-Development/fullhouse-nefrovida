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
    
        </div>
      </nav>
    </div>
    {children}
  </header>
  )
}

export default Navbar