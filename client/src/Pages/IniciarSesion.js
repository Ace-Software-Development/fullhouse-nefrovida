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

const IniciarSesion = () => {

    const [errorSubmit, setErrorSubmit] = useState("");
    const [isLoading, setIsLoading] = useState("");

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

    const {register, formState: { errors }, handleSubmit, setValue} = useForm();

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
            // Mostrar que se está cargando información.
            setIsLoading(true);
            setErrorSubmit("");

            e.preventDefault();
            // Realizar petición al servidor enviando datos del formulario.
            try {
                const response = await fetch(
                    'http://localhost:6535/iniciarSesion', 
                    {
                        method: 'POST', 
                        mode: 'cors', 
                        body: JSON.stringify(data), 
                        headers: {
                            'Content-Type': 'application/json'
                        } 
                    });
                
                const iniciarSesion = await response.json();
                // Si petición retornó error, desplegarlo.
                if(!response.ok) {
                    setErrorSubmit(iniciarSesion.message);
                    return;
                }
                // Si petición fue correcta almacenar sesión y redirigir página principal.
                else {
                    // Asignar a session rol, nombre y apellido de usuario autenticado
                    ReactSession.set("rol", iniciarSesion.rol);
                    ReactSession.set("nombre", iniciarSesion.colaborador.nombre);
                    ReactSession.set("apellido", iniciarSesion.colaborador.apellidoPaterno);
                    await M.toast({ html: iniciarSesion.message });
                    window.location.href = "/";
                }
            } 
            // En caso de que haya surgido un error mostrarlo.
            catch(e) {
                    setIsLoading(false);
                    setErrorSubmit("Error de conexión. Inténtelo de nuevo.");
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
                            <div class="preloader-wrapper small active">
                                <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                    <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                    <div class="circle"></div>
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
                            <br> </br>
                            <BtnIniciarSesion />
                            <br></br>
                            <br></br>
                            <BtnRestablecer />
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
    )
}

export default IniciarSesion