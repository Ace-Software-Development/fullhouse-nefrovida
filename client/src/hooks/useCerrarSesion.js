import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import BtnCerrarSesion from "../components/BtnCerrarSesion";

const UseCerrarSesion = () => {

    const {register, formState: { errors }, handleSubmit, setValue} = useForm();

    /**
    * Función que se ejecuta al envia formulario para
    * buscar credenciales de usuario en base de datos.
    * 
    * Se obtiene información del colaborador de Nefrovida y 
    * se destruye la sesión.
    * 
    * @returns redirección a la página actual en caso de error o  
    * redirección a la página de iniciar sesión.
    */
    
    async function onSubmit () {
           
        // Realizar petición al servidor.
        try {
            const response = await fetch(
                'http://localhost:6535/iniciarSesion', 
                {
                    method: 'POST', 
                    mode: 'cors'           
                });
                    
            const cerrarSesion = await response.json();

            // Si petición retornó error, no sale de la sesión.
            if(!response.ok) {
                console.log("error");
                return;
            }
            
            // Si petición fue correcta destruye la sesión y redirige a página de Iniciar sesión.
            else {

                // Destruye los datos de la sesión.

                console.log(ReactSession.get("rol"));
                console.log(ReactSession.get("nombre"));
                console.log(ReactSession.get("apellido"));

                //ReactSession.removeItem("rol");
                //ReactSession.removeItem("nombre");
                //ReactSession.removeItem("apellido");

                //localStorage.clear();
                ReactSession.clear();
                
                //Redirige a página de Iniciar sesión
                window.location.href = "/IniciarSesion";
            }
        } 
        
        // En caso de que haya surgido un error mostrarlo.
        
        catch(e) {
            console.log("error2");
        }

    };

    return(
        <form onSubmit = { handleSubmit(onSubmit) }>  
            <li>
                <BtnCerrarSesion small={ false }/>
            </li>
            <li>
                <BtnCerrarSesion small={ true }/>
            </li>
        </form>
    )
  
}

export default UseCerrarSesion;