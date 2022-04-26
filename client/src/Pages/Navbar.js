import logo from '../img/logo.png';

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

export default Navbar