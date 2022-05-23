import logo from "../img/logo.png";
import BtnCerrarSesion from "./BtnCerrarSesion";
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from 'react';


const Navbar = ({children}) => {

  const cerrarSesion2 = (e) => {
    console.log("Funciono xd")
  }

  const [errorSubmit, setErrorSubmit] = useState("");
  const [isLoading, setIsLoading] = useState("");


  const {register, formState: { errors }, handleSubmit, setValue} = useForm();

        /**
         * Función que se ejecuta al envia formulario para
         * buscar credenciales de usuario en base de datos.
         * 
         * Se obtiene información del colaborador de Nefrovida y 
         * se destruye la sesión.
         * 
         * @param {object} data - Credenciales de inicio de sesión. 
         * @param {*} e - Evento de submit.
         * @returns Mensaje de error en caso de haberlo o 
         * redirección a página inicial.
         */
        async function onSubmit (data, e) {
            // Mostrar que se está cargando información.
            //setIsLoading(true);
            //setErrorSubmit("");

            e.preventDefault();
            // Realizar petición al servidor.
            try {
                const response = await fetch(
                    'http://localhost:6535/cerrarSesion', 
                    {
                        method: 'POST', 
                        mode: 'cors'           
                    });
                    
                const cerrarSesion = await response.json();

                // Si petición retornó error, desplegarlo.
                if(!response.ok) {
                  /*
                    setErrorSubmit(iniciarSesion.message);
                    setIsLoading(false);
                    return;
                    */
                   console.log("error")
                }
                // Si petición fue correcta destruye la sesión y redirige a página de login.
                else {
                    // Asignar a session rol, nombre y apellido de usuario autenticado
                    //ReactSession.set("rol", cerrarSesion.rol);
                    //sessionStorage.removeItem(cerrarSesion.rol)
                    //ReactSession.set("nombre", cerrarSesion.colaborador.nombre);
                    //ReactSession.set("apellido", cerrarSesion.colaborador.apellidoPaterno);

                    // Destruye los datos de la sesión.

                    //ReactSession.removeItem("rol");

                    console.log(ReactSession.get("rol"));
                    console.log(ReactSession.get("nombre"));
                    console.log(ReactSession.get("apellido"));

                    //localStorage.clear();
                    ReactSession.clear();
                    
                    window.location.href = "/login";
                }
            } 
            // En caso de que haya surgido un error mostrarlo.
            catch(e) {
                    setIsLoading(false);
                }
            };



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
            <form onSubmit = { handleSubmit(onSubmit) }>  
              <li>
                <BtnCerrarSesion small={ false }/>
              </li>
              <li>
                <BtnCerrarSesion small={ true }/>
              </li>
            </form>
          </ul>
        </div>
      </nav>
    </div>
    {children}
  </header>
  )
}

export default Navbar