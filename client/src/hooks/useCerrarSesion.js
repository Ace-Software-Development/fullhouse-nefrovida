import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import M from 'materialize-css/dist/js/materialize.min.js';
import BtnCerrarSesion from "../components/BtnCerrarSesion";
import useFetch from './useFetch';
import { useEffect } from 'react';

const UseCerrarSesion = () => {

    const {register, formState: { errors }, handleSubmit, setValue} = useForm();
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/cerrarSesion');


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
        M.toast({ html: message });

    }, [responseOk])


    // Si petición retornó error, no sale de la sesión.
    useEffect(() => {
        if (!error) return;
        console.log('error');

    }, [error])

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

export default UseCerrarSesion;