/**
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
import Datepicker from '../components/Datepicker';
import Select from '../components/Select'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { useForm } from 'react-hook-form';

const RegistrarColaborador = () => {
    const [errorSubmit, setErrorSubmit] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [postIsLoading, setPostIsLoading] = useState("")
    const [errorFetch, setErrorFetch] = useState('');
    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
    const [roles, setRoles] = useState([]);

    async function getRoles() {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:6535/colaboradores', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let miJayson = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                setErrorFetch(miJayson.message);
                return;
            }

            miJayson = miJayson.roles;
            setRoles(miJayson);
            
        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }

    function miJson() {
        const arr = []
        roles.map(
            el => { 
            arr.push({option:el.nombre, value:el.objectId})}
        )
        return arr
    }

    /**
      * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
      * @param {event} e - Evento del cambio
      */
        const handleChange = (e) => {
        setValue(e.target.name, e.target.value)
        // console.log(e.target.name, e.target.value)
    }

    /**
      * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
    */
    useEffect(() => {

        setIsLoading(true);
        getRoles();
        
        // Variable para el usuario, requerido, con patrón.
        register('usuario', {
            required: {
                value: true,
                message: "El usuario es requerido"
            },
            pattern: {
                value: /^(?:[A-Z\d][A-Z\d_-]{2,11}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
                message: "Usuario inválido"
            }
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
            }
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
            }
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
            }
        });
        
        // Variable para la fecha de nacimiento, requerida, con patrón.
        register('fechaNacimiento', {
            required: {
                value: true,
                message: "La fecha es requerida"
            },
            pattern: {
                value: /[0-9]+/,
                message: "Fecha Inválida, wtf cómo hiciste override?"
            }
        });
        
        // Variable para el sexo, requerido.
        register('sexo', {
            required: {
                value: true,
                message: "El sexo es requerido"
            }
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
        // Actualizar valor para mostrar que esta cargando la información. E inicializar el error en nulo.
        onSubmit="document.getElementById('submit').disabled=true"
        setPostIsLoading(true)
        setErrorSubmit("")
        
        // Cambiar los valores necesarios de string a número.
        data.telefono = Number(data.telefono)
        data.fechaNacimiento = String(data.fechaNacimiento)

        console.log(data);

        e.preventDefault()
        try {
            // Hacer fetch a la ruta de back, enviando la información del formulario.
            const response = await fetch('http://localhost:6535/colaboradores', { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} })
            // console.log("response", response)
            const colaborador = await response.json()
            setPostIsLoading(false)
            
            // Mostrar error en caso de ser necesario
            if (!response.ok) {
                setErrorSubmit(colaborador.message)
                return;
            }

            // Mostrar mensaje de éxito y redireccionar a la página principal
            else {
                await M.toast({ html: colaborador.message });
                window.location.href = "/"
            }
            // console.log(colaborador)
        } catch(e) {
            // Mostrar mensaje de error en la conexión con la base de datos.
            setPostIsLoading(false)
            setErrorSubmit("Error de conexión. Inténtelo de nuevo.")
        }
    }

    return(
        <div>
            <Navbar/>
            <Main>
                <br/><br/>
                <Card>
                    <CardTitulo icono="person_add" titulo="Registrar Empleado"/>
                    <ContainerForm>
                    <Link to = "/">
                        <BtnRegresar />
                    </Link>
                    { isLoading && (
                        <div className="center animate-new-element">
                            <br/><br/><br/>

                            <div class="preloader-wrapper big active">
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

                            <div class="texto-grande blue-text text-darken-1">Cargando</div>

                            <br/><br/><br/>
                        </div>
                    
                    )}
                    { !isLoading && !errorFetch && (
                        <div className="on-load-anim">
                            <form
                                id = "main-login"
                                action = 'http://localhost:6535/colaboradores'
                                method = 'post'
                                onSubmit = { handleSubmit(onSubmit) }>
                                <LineaCampos>
                                    <Input 
                                        id = "usuario" 
                                        label = "Usuario" 
                                        tamano = "m3 s12" 
                                        onChange = { handleChange }
                                        elError = { errors.usuario && errors.usuario?.message }
                                        maxLength = "20"
                                        requerido = {true}


                                    />
                                    <Input 
                                        id = "nombre" 
                                        label = "Nombre" 
                                        tamano = "m3 s12"
                                        onChange = {handleChange}
                                        elError = { errors.nombre && errors.nombre?.message }
                                        maxLength = "20"
                                        requerido = {true}
                                    />
                                    <Input 
                                        id = "apellidoPaterno" 
                                        label = "Apellido Paterno" 
                                        tamano = "m3 s12"
                                        onChange = { handleChange }
                                        elError = { errors.apellidoPaterno && errors.apellidoPaterno?.message }
                                        requerido = {true}
                                    />
                                    <Input 
                                        id = "apellidoMaterno" 
                                        label = "Apellido Materno" 
                                        tamano = "m3 s12"
                                        onChange = { handleChange }
                                        elError = { errors.apellidoMaterno && errors.apellidoMaterno?.message }
                                    />
                                </LineaCampos>
                                <LineaCampos>
                                    <Datepicker 
                                        id = "fechaNacimiento" 
                                        label = "Fecha de nacimiento" 
                                        tamano = "s8 m4"
                                        onChange = { handleChange }
                                        elError = { errors.fechaNacimiento && errors.fechaNacimiento?.message }
                                        requerido = {true}
                                    />
                                    <Select 
                                        id = "sexo" 
                                        label = "Sexo" 
                                        value = ""
                                        arr = { [{value: "masculino", option: "Masculino"}, {value: "femenino", option: "Femenino"}] }
                                        handleChange = { handleChange }
                                        elError = { errors.sexo && errors.sexo?.message }
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
                                    <Select 
                                        id = "rol" 
                                        label = "Rol" 
                                        value = ""
                                        arr = { miJson() }
                                        handleChange = { handleChange }
                                        elError = { errors.rol && errors.rol?.message }
                                        requerido = { true }
                                    />
                                </LineaCampos>
                                <LineaCampos>
                                    <Input 
                                        id = "correo" 
                                        label = "Correo electrónico" 
                                        tamano = "s12 m4"
                                        type = "email"
                                        onChange = { handleChange }
                                        elError = { errors.correo && errors.correo?.message }
                                        requerido = { true }
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
                    { errorFetch && (
                        <div>
                            <br/><br/><br/>

                            <div className="texto-grande red-text center animate-new-element">
                                <strong> { errorFetch } </strong> 
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

export default RegistrarColaborador


    // function handleSubmita (e) {
    //     fetch('http://localhost:6535/colaboradores', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "data": {
    //                 "usuario": "user",
    //                 "nombre": "Nombre",
    //                 "paterno": "Apellido",
    //                 "materno": "Apellido2",
    //                 "nacimiento": "01/01/2000",
    //                 "sexo": "M",
    //                 "correo": "uer@gmail.com",
    //                 "telefono": 44275565,
    //                 "password": "abcd",
    //                 "confpassword": "abcd"
    //             }
    //         })
    //     });
    // }