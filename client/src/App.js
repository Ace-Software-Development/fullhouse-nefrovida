import logo from './img/logo.png';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";

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

const BtnEditRegis = ({icono = "help", texto = "Cargando", url = "/registrar"}) => {
  return(
    <a className="waves-effect waves-dark btn btn-editar-registrar blue darken-1 white-text text-accent-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
  )
}

const BtnRegresar = ({icono = "arrow_back", texto = "Regresar", url = "/regresar"}) => {
  return(
    <a className="waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
  )
}

const BtnGuardar = ({icono = "save", texto = "Guardar", url = "/guardar"}) => {
  return(
    <a className="waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
  )
}

const BtnCerrarSesion = ({ icono = "logout", texto = "Cerrar Sesión", url ="/Cerrar/Sesión"}) => {
  return(
    <a className="waves-effect waves-dark btn btn-logout white red-text text-accent-4" href={url}>{texto}<i className="material-icons right">{icono}</i></a>
  )

}
const BtnAnadirParametro = ({ icono = "add", texto = "Añadir Parámetro", url ="/Añadir/Parámetro"}) => {
  return (
    <a className="waves-effect waves-dark btn btn-parametro white green lighten-3 grey-text text-darken-4" href={url}>{texto}<i className="material-icons left">{icono}</i></a>
  )
}
const BtnEliminar = ({ icono = "delete", texto = "Eliminar", url = "/Eliminar"}) => {
  return (
    <a className="z-depth-0 waves-effect waves-dark btn btn-eliminar c_Transparente red-text text-darken-2 subrayado" href = {url}>{texto}<i className="material-icons left">{icono}</i></a>
  )
}

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Main>
      </Main>
      <BtnEditRegis></BtnEditRegis>
      <BtnEditRegis icono="edit" texto = "Editar paciente" url = "/editar"></BtnEditRegis>
      <BtnRegresar></BtnRegresar>
      <BtnGuardar></BtnGuardar>
      <BtnCerrarSesion></BtnCerrarSesion>
      <BtnAnadirParametro></BtnAnadirParametro>
      <BtnEliminar></BtnEliminar>
    </>
  )
}

export default App;