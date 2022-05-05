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

const RegistrarPaciente = () => {
    const [errorSubmit, setErrorSubmit] = useState("")
    const [isLoading, setIsLoading] = useState("")

    useEffect(() => {
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
                message: "Fecha Inválida"
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
        register('curp', {
            required: {
                value: true,
                message: "El CURP es requerido"
            },
            minLength: {
                value: 18,
                message: "El CURP debe tener 18 caracteres"
            },
            maxLength: {
                value: 18,
                message: "El CURP debe tener 18 caracteres"
            },
            pattern: {
                value: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
                message: "CURP inválido"
            }
        });
        register('peso', {
            required: {
                value: false,
                message: "El nombre es requerido"
            },
            max: {
                value: 700,
                message: "¿El peso es correcto? 😯"
            },
            min: {
                value: 5,
                message: "¿El peso es correcto? 😐"
            }
        });
        register('estatura', {
            required: {
                value: false,
                message: "El nombre es requerido"
            },
            
            max: {
                value: 275,
                message: "¿La estatura es correcta? 😯"
            },
            min: {
                value: 65,
                message: "¿La estatura es correcta? 😐"
            }
        });
    }, []);


    const handleChange = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();

    async function onSubmit(data, e) {
        setIsLoading(true)
        setErrorSubmit("")
        data.estatura = Number(data.estatura)
        data.peso = Number(data.peso)
        data.telefono = Number(data.telefono)
        data.fechaNacimiento = String(data.fechaNacimiento)

        console.log(data);

        e.preventDefault()
        try {
            const response = await fetch('http://localhost:6535/paciente', { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} })
            console.log("response", response)
            const paciente = await response.json()
            setIsLoading(false)
    
            if (!response.ok) {
                setErrorSubmit(paciente.message)
                return;
            }
            else {
                await M.toast({ html: paciente.message });
                window.location.href = "/"
            }
            console.log(paciente)
        } catch(e) {
            setIsLoading(false)
            setErrorSubmit("Error de conexión. Inténtelo de nuevo.")
        }
    };

    console.log("errores", errors)
    return(
        <div>
            <Navbar/>
            <Main>
                <br></br>
                <Card>
                    <CardTitulo icono="person_add" titulo="Registrar Paciente"/>
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
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>
                        </div>
                    }
                    <br/><br/>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <LineaCampos>
                            <Input 
                                id="nombre" 
                                label="Nombre" 
                                tamano="m4 s12"
                                onChange = { handleChange }
                                elError = { errors.nombre && errors.nombre?.message }
                                maxlength = "20"
                                requerido = {true}
                            />
                            <Input 
                                id="apellidoPaterno" 
                                label="Apellido Paterno" 
                                tamano="m4 s12"
                                onChange = { handleChange }
                                elError = { errors.apellidoPaterno && errors.apellidoPaterno?.message }
                                requerido = {true}
                            />
                            <Input 
                                id="apellidoMaterno" 
                                label="Apellido Materno" 
                                tamano="m4 s12"
                                onChange = { handleChange }
                                elError = { errors.apellidoMaterno && errors.apellidoMaterno?.message }
                            />
                        </LineaCampos>
                        <LineaCampos>
                            <Datepicker 
                                id="fechaNacimiento" 
                                label="Fecha de nacimiento" 
                                tamano="s8 m4"
                                onChange = { handleChange }
                                elError= { errors.fechaNacimiento && errors.fechaNacimiento?.message }
                                requerido = {true}
                            />
                            <Select 
                                id="sexo" 
                                label="Sexo" 
                                value=""
                                arr={[{value: "masculino", option: "Masculino"}, {value: "femenino", option: "Femenino"}]}
                                handleChange = { handleChange }
                                elError = { errors.sexo && errors.sexo?.message }
                                requerido = { true }
                            />
                            <Input 
                                id="telefono" 
                                label="Telefono" 
                                type="number"
                                tamano="s8 m4"
                                onChange={ handleChange }
                                maxlength = "10"
                                elError = { errors.telefono && errors.telefono?.message }
                            />
                        </LineaCampos>
                        <LineaCampos>
                            <Input 
                                id="correo" 
                                label="Correo electrónico" 
                                tamano="s12 m4"
                                type="email"
                                onChange={ handleChange }
                                elError={ errors.correo && errors.correo?.message }
                                requerido = { true }
                            />
                            <Input 
                                id="curp" 
                                label="CURP" 
                                tamano="s12 m4"
                                onChange = { handleChange }
                                elError = { errors.curp && errors.curp?.message }
                                requerido = { true }
                            />
                            <Input 
                                id = "peso" 
                                label = "Peso (Kg)"
                                type = "number"
                                min = "0"
                                tamano = "s12 m2"
                                onChange = { handleChange }
                                elError = { errors.peso && errors.peso?.message }
                            />
                            <Input 
                                id = "estatura" 
                                label = "Estatura (cm)" 
                                type = "number"
                                min = "0"
                                tamano = "s12 m2" 
                                onChange = { handleChange }
                                elError = { errors.estatura && errors.estatura?.message }
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

export default RegistrarPaciente