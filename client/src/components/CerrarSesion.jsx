import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import M from 'materialize-css/dist/js/materialize.min.js';
import BtnCerrarSesion from "../components/BtnCerrarSesion";
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';

const CerrarSesion = () => {

    const {register, formState: { errors }, handleSubmit, setValue} = useForm();

    // Crear instancia de hook para realizar petición al servidor de cerrar sesión.
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('/cerrarSesion');


    /**
     * Hook para validar que cambió estado de respuesta 
     * de fetch y por lo tanto asumir que si es true,
     * petición fue correcta para almacenar sesión y 
     * redirigir a página principal.
     * 
     * Se llama a useEffect si cambia responseOk
     * que solo cambia cuando response retorno true
     * en ok
     * 
     * Se obtiene información del colaborador de Nefrovida y 
     * destruye la sesión.
     */ 
    useEffect(() => {
        if (!responseJSON || !responseOk) return;
        
        // Destruye los datos de la sesión.
        ReactSession.remove('rol');
        ReactSession.remove('nombre');
        ReactSession.remove('apellido');
        ReactSession.remove('sessionToken');
        ReactSession.remove('usuario');
        
        //Redirige a página de Iniciar sesión
        window.location.href = "/IniciarSesion";

        //Mensaje que dice que se cerro la sesión con éxito
        M.toast({ html: "Cerrar sesión exitoso"});

    }, [responseOk])


    // Si petición retornó error, no sale de la sesión.
    useEffect(() => {
        if (!error) return;

    }, [error])

    /**
    * Función que se ejecuta al envia formulario para
    * obtener credenciales de usuario actual.
    * 
    * Se utiliza hook para realizar fetch, la función
    * que se llama arma configuración del fetch y dentro
    * del hook de useFetch al detectar que cambia la 
    * configuración de petición la realiza y se obtiene
    * respuesta a través de variable de estado del hook.
    * 
    * @returns redirección a la página actual en caso de error o  
    * redirección a la página de iniciar sesión.
    */    
    async function onSubmit () {

        // Realizar petición al servidor.
        await httpConfig(null, 'POST');

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

export default CerrarSesion;