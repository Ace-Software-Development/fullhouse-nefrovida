/**
 * Iniciar Sesión:
 * Esta vista es la pantalla principal con la que se 
 * encuentra un colaborador de Nefrovida para darse de 
 * alta en el sistema. 
 * 
 * Antes de enviar los datos al servidor, se verifican 
 * los datos del formulario con useEffect, useState y 
 * useForm de react'hook'form.
 * 
 * Para obtener los datos ingresados se usa onSubmit y 
 * useState previo a realizar una petición del tipo POST 
 * al servidor para que se validen las credenciales de
 * usuario en la base de datos y se le asignen los 
 * permisos respectivos dentro de la aplicación.
*/
import { useEffect, useState } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import Main from '../components/Main';
import Card from '../components/Card';
import CardLogin from '../components/CardLogin';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import BtnIniciarSesion from '../components/BtnIniciarSesion';
import logo from "../img/logo.png";
import BtnRestablecer from '../components/BtnRestablecer';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import useFetch from '../hooks/useFetch';

const IniciarSesion = () => {
    
    const [errorSubmit, setErrorSubmit] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const {register, formState: { errors }, handleSubmit, setValue} = useForm();
    const { httpConfig, loading, responseJSON, error, message } = useFetch('http://localhost:6535/iniciarSesion');

    /**
     * Hook para asignar las validaciones necesarias a los campos.
     */
    useEffect(() => {
        // Variable para la campo de usuario, requerido con patrón.
        register('username', {
            required: {
                value: true,
                message: "El usuario o correo es requerido"
            },
            pattern: {
                value: /^(?:[A-Z\d][A-Z\d_-]{2,11}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
                message: "Usuario o Correo inválido"
            }
        });

        // Variable para campo de contraseña, requerido.
        register('password', {
            required: {
                value: true,
                message: "La contraseña es requerida"
            },
        });
    }, []);

    /**
     * Fucnión para manejar cambios en datos ingresados al formulario.
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        setValue(e.target.name, e.target.value);
        setErrorSubmit("");
    }

    // Si petición fue correcta almacenar sesión y redirigir página principal.
    // Se llama a useEffect si cambia message que solo cambia cuando response estuvo ok
    useEffect(() => {
        if (!responseJSON) return;

        // Asignar a session rol, nombre y apellido de usuario autenticado
        ReactSession.set("sessionToken", responseJSON.sessionToken);
        ReactSession.set("rol", responseJSON.rol);
        ReactSession.set("usuario", responseJSON.usuario);
        ReactSession.set("nombre", responseJSON.nombre);
        ReactSession.set("apellido", responseJSON.apellido);
        window.location.href = "/";
        M.toast({ html: message });

    }, [message])

    useEffect(() => {
        // Mostrar que se está cargando información.
        setIsLoading(loading);
    }, [loading])

    useEffect(() => {
        // Mostrar mensaje de error
        setErrorSubmit(error);
    }, [error])
    

    /**
     * Función que se ejecuta al envia formulario para
     * validar credenciales de usuario en base de datos.
     * 
     * Se obtiene información del colaborador de Nefrovida y 
     * se la almacena en una sesión dentro de una cookie.
     * 
     * @param {object} data - Credenciales de inicio de sesión. 
     * @param {*} e - Evento de submit.
     * @returns Mensaje de error en caso de haberlo o 
     * redirección a página inicial.
     */
    async function onSubmit (data, e) {

        e.preventDefault();
        // Realizar petición al servidor enviando datos del formulario.
        try {
            await httpConfig(data, 'POST');
        } 
        // En caso de que haya surgido un error mostrarlo.
        catch(e) {
            setErrorSubmit(e.message)
        }
    };

    return(
        <div>
            <Main>
                <br></br>
                <a 
                    href="#!"
                    className="brand-logo"
                >
                    <img 
                        height= "100px"
                        className="logotipo" 
                        src={logo}
                        alr="Logotipo Nefrovida"
                    />
                </a>
                
                <Card>
                <CardLogin titulo="Login" />
                    <ContainerForm>
                        {
                            isLoading &&
                            <div className="preloader-wrapper small active">
                                <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                                </div>
                            </div>
                        }
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <LineaCampos>
                                <div align="left">
                                    <Input
                                        id="username" 
                                        label="Usuario o Correo electrónico" 
                                        tamano="m12 s12"
                                        type="text"
                                        onChange={ handleChange }
                                        elError={ errors.username && errors.username?.message }
                                        requerido = { true } 
                                    />
                                </div>
                            </LineaCampos>
                            <LineaCampos>
                                <div align="left">
                                    <Input 
                                        id="password" 
                                        label="Contraseña" 
                                        tamano="m12 s12"
                                        type="password"
                                        onChange = { handleChange }
                                        elError = { errors.password && errors.password?.message }
                                        maxlength = "50"
                                        requerido = { true }
                                    />
                                </div>
                            </LineaCampos>
                            { errorSubmit && 
                                <div>
                                    <div className='red-text right'>
                                        <strong> { errorSubmit } </strong>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            }
                            <br />
                            <BtnIniciarSesion />
                            <br />
                            <br />
                            <BtnRestablecer />
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
    )
}

export default IniciarSesion