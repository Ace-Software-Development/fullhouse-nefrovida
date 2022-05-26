import logo from "../img/logo.png";

const Navbar = ({children}) => {
  return(
  <header>
    <div className="navbar-fixed"  >
      <nav className="z-depth-2"  >
        <div className="nav-wrapper c-F9F9F9-transparente"  >
          <a 
            href="#!"
            className="brand-logo"
          >
            <img 
              className="logotipo" 
              src={logo}
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
            <li  >
              <a className="hide-on-small-and-down waves-effect waves-dark btn btn-logout white red-text text-accent-4"  >Cerrar sesión
                <i className="material-icons right">logout</i>
              </a>
            </li>
            <li>
              <a className="hide-on-med-and-up waves-effect waves-dark btn btn-logout white red-text text-accent-4"  >
                <i className="material-icons right"  >
                  logout
                </i>
              </a>
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