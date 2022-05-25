import logo from "../img/logo.png";
import UseCerrarSesion from "../hooks/useCerrarSesion"


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
            <UseCerrarSesion/>
          </ul>
        </div>
      </nav>
    </div>
    {children}
  </header>
  )
}

export default Navbar