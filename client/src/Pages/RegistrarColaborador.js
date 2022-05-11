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

    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();

    const handleChange = (e) => {
        setValue(e.target.name, e.target.value)
        console.log(e.target.name, e.target.value)
    }

    useEffect(() => {
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
        
        register('sexo', {
            required: {
                value: true,
                message: "El sexo es requerido"
            }
        });
        
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

        register('rol', {
            required: {
                value: true,
                message: "El rol es requerido"
            }
        });
        
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

    async function onSubmit(data, e) {
        onSubmit="document.getElementById('submit').disabled=true"
        setIsLoading(true)
        setErrorSubmit("")
        data.telefono = Number(data.telefono)
        data.fechaNacimiento = String(data.fechaNacimiento)

        console.log(data);

        e.preventDefault()
        try {
            const response = await fetch('http://localhost:6535/colaboradores', { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} })
            console.log("response", response)
            const colaborador = await response.json()
            setIsLoading(false)
    
            if (!response.ok) {
                setErrorSubmit(colaborador.message)
                return;
            }
            else {
                await M.toast({ html: colaborador.message });
                window.location.href = "/"
            }
            console.log(colaborador)
        } catch(e) {
            setIsLoading(false)
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
                    {
                        isLoading &&
                        <div class="preloader-wrapper small active">
                            <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    }
                    <br/><br/>
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
                                arr = { [{value: "colaborador", option: "Colaborador"},
                                        {value: "activo", option: "Activo"}, 
                                        {value: "pasivo", option: "Pasivo"},
                                        {value: "wtf", option: "xD"},] }
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
                        { errorSubmit 
                            && <div> <div className='red-text right'> <strong> { errorSubmit } </strong> </div> <br/><br/> </div>
                        }
                        <BtnGuardar/>
                    </form>
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