/**
 * US: IT1-5 Registrar la información del colaborador
 * Matiz de trazabilidad: https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit#gid=0
 * Registrar colaborador:
 * Esta vista se utiliza para el admininistrador con la finalidad de registrar a un colaborador.
 * Puede ser un Químico, Doctor, Nutriólogo, Psicólogo o un Trabajador Social.
 * Se trata de un formulario con ciertos campos obligatorios.
 *
 * Para la verificación en el front para los formularios utilizamos useEffect, useState y
 * useForm de react-hook-form.
 *
 * Para capturar los datos y mandarlos al onSubmit() también utilizamos useState, así como una
 * petición de tipo POST al servidor que se ejecuta al mismo tiempo que esta app web.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js";
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm'
import Input from '../components/Input'
import Select from '../components/Select'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { useForm } from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';

export default function RegistrarColaborador() {
    const [url, setUrl] = useState('/colaborador');
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    
    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

    /**
     * Hook para validar que cambió estado de respuesta
     * de fetch y por lo tanto asumir que si es true,
     * petición fue correcta para almacenar roles
     * existentes en la base de datos.
     *
     * Se llama a useEffect si cambia responseOk
     * que solo cambia cuando response retorno true
     * en ok
     *
     * Se actualiza el url para que suceda el post en el submit.
     */
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;

        } else {
            if(url === '/colaborador') {
            const arr = []
            responseJSON.roles.map(
                el => {
                arr.push({value:el.objectId, option:el.nombre,})}
            )
            setRoles(arr);
            setUrl('/colaborador/registrar');
        }
        else if(url === '/colaborador/registrar'){
            setIsLoading(true);
            M.toast({ html: responseJSON.message});
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }

    }, [responseOk])


    function rolesExisten() {
        if (roles[1] !== undefined ){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        setValue(e.target.name, e.target.value)
    }

    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
 */
    useEffect(() => {

        if (ReactSession.get('rol') !== 'admin') {
            window.location.href = '/403';
        }
        // Armar petición GET
        httpConfig(null, 'GET');

        // Variable para el usuario, requerido, con patrón.
        register('usuario', {
            required: {
                value: true,
                message: "El usuario es requerido"
            },
            pattern: {
                value: /^(?:[A-Z\d][A-Z\d_-]{2,19}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
                message: "Usuario inválido"
            },
            maxLength: {
                value: 20,
                message: "El usuario no puede tener más de 20 caracteres"
            },
        });

        // Variable para el nombre, requerido, con patrón.
        register('nombre', {
            required: {
                value: true,
                message: "El nombre es requerido"
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: "Nombre inválido"
            },
            maxLength: {
                value: 40,
                message: 'El nombre puede contener máximo 40 caracteres'
            },
        });

        // Variable para el apellido paterno, requerido, con patrón.
        register('apellidoPaterno', {
            required: {
                value: true,
                message: "El apellido paterno es requerido"
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: "Nombre inválido"
            },
            maxLength: {
                value: 40,
                message: 'El apellido paterno puede contener máximo 40 caracteres'
            },
        });

        // Variable para el apellido materno, requerido, con patrón.
        register('apellidoMaterno', {
            required: {
                value: false,
                message: "El apellido materno es requerido"
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: "Nombre inválido"
            },
            maxLength: {
                value: 40,
                message: 'El apellido materno puede contener máximo 40 caracteres'
            },
        });

        // Variable para el teléfono, no requerido y con longitud fija.
        register('telefono', {
            required: {
                value: false,
                message: "No debería de verse este error"
            },
            minLength: {
                value: 10,
                message: "El teléfono debe tener 10 digitos"
            },
            maxLength: {
                value: 10,
                message: "El teléfono debe tener 10 digitos"
            },
        });

        // Variable para el rol, requerido.
        register('rol', {
            required: {
                value: true,
                message: "El rol es requerido"
            }
        });

        // Variable para el correo, requerido y con patrón.
        register('correo', {
            required: {
                value: true,
                message: "El correo es requerido"
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo inválido"
            }
        });

        // Variable para la contraseña, requerido.
        register('password', {
            required: {
                value: true,
                message: "Se necesita una contraseña"
            },
            minLength: {
                value: 8,
                message: "Tu contraseña debe tener 8 caracteres"
            },
            pattern: {
                value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                message: "La contraseña debe tener una letra mayúscula, una letra minúscula, un número y un caracter especial. \nEjemplo: N3frovida!"
            }
        });

        // Variable para confirmar la contraseña, compara el valor y es requerido.
        register('confPassword', {
            required: {
                value: true,
                message: "¡No has confirmado la contraseña!"
            },
            validate: {
                value: value => value === getValues("password") || "La contraseña no coincide."
            }
        });
    }, []);

    /**
     * Función que se ejecuta al dar click en el botón de Guardar el paciente, para registrar el paciente en la
     * base de datos haciendo un fetch a la ruta de back.
     * @param {object} data - Datos del paciente en el formulario
     * @param {evento} e - Evento para submit
     * @returns
     */
    async function onSubmit(data, e) {
        if(data.telefono !== undefined){
            data.telefono = Number(data.telefono);
        }
        e.preventDefault();
        httpConfig(data,'POST')
    }

    return(
        <div>
                <Navbar/>
                <Main>
                <br/><br/><br/><br/>
                <Card>
                    <CardTitulo icono="person_add" titulo="Registrar Empleado"/>
                    <ContainerForm>

                    <BtnRegresar />
                    { loading || isLoading && (
                    <div className="center animate-new-element">
                        <br/><br/>

                        <div className="preloader-wrapper big active">
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

                        <div className="texto-grande blue-text text-darken-1">Cargando información</div>

                        <br/><br/>
                    </div>
                
                )}
                { !loading && !isLoading && !error && (
                    <div className="loader-anim">
                            <br/><br/>
                            <form
                                id = "main-login"
                                action = '/colaboradores'
                                method = 'post'
                                onSubmit = { handleSubmit(onSubmit) }>
                                <LineaCampos>
                                    <Input
                                        id = "nombre"
                                        label = "Nombre"
                                        tamano = "m4 s12"
                                        onChange = {handleChange}
                                        elError = { errors.nombre && errors.nombre?.message }
                                        maxLength = "40"
                                        requerido = {true}
                                    />
                                    <Input
                                        id = "apellidoPaterno"
                                        label = "Apellido Paterno"
                                        tamano = "m4 s12"
                                        onChange = { handleChange }
                                        elError = { errors.apellidoPaterno && errors.apellidoPaterno?.message }
                                        maxLength = "40"
                                        requerido = {true}
                                    />
                                    <Input
                                        id = "apellidoMaterno"
                                        label = "Apellido Materno"
                                        tamano = "m4 s12"
                                        onChange = { handleChange }
                                        elError = { errors.apellidoMaterno && errors.apellidoMaterno?.message }
                                        maxLength = "40"
                                    />
                                </LineaCampos>
                                <LineaCampos>
                                    <Input
                                            id = "correo"
                                            label = "Correo electrónico"
                                            tamano = "s12 m6"
                                            type = "email"
                                            onChange = { handleChange }
                                            elError = { errors.correo && errors.correo?.message }
                                            requerido = { true }
                                        />
                                    <Input
                                        id = "telefono"
                                        label = "Telefono"
                                        type = "number"
                                        tamano = "s8 m4"
                                        onChange = { handleChange }
                                        maxLength = "10"
                                        min = "0"
                                        elError = { errors.telefono && errors.telefono?.message }
                                    />
                                    { rolesExisten() ?
                                        <Select
                                            id = "rol"
                                            label = "Rol"
                                            value = ""
                                            arr = { roles }
                                            handleChange = { handleChange }
                                            elError = { errors.rol && errors.rol?.message }
                                            requerido = { true }
                                        />
                                        : <></>
                                    }


                                </LineaCampos>
                                <LineaCampos>
                                <Input
                                        id = "usuario"
                                        label = "Usuario"
                                        tamano = "m4 s12"
                                        onChange = { handleChange }
                                        elError = { errors.usuario && errors.usuario?.message }
                                        maxLength = "20"
                                        requerido = {true}

                                    />
                                    <Input
                                        id = "password"
                                        label = "Contraseña"
                                        tamano = "s12 m4"
                                        type = "password"
                                        onChange = { handleChange }
                                        elError = { errors.password && errors.password?.message }
                                        requerido = { true }
                                    />
                                    <Input
                                        id = "confPassword"
                                        label = "Confirmar contraseña"
                                        tamano = "s12 m4"
                                        type = "password"
                                        onChange = { handleChange }
                                        elError = { errors.confPassword && errors.confPassword?.message }
                                        requerido = { true }
                                    />
                                </LineaCampos>
                                <BtnGuardar/>
                            </form>
                            <br/><br/>
                        </div>
                        
                        )}
                    { error && (
                        <div>
                            <br/><br/><br/>

                            <div className="texto-grande red-text center animate-new-element">
                                <strong> { error } </strong>
                            </div>

                            <br/><br/><br/>
                        </div>
                    )}
                    </ContainerForm>
                </Card>
                </Main>
        </div>
    )
}