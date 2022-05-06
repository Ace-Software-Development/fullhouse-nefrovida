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

const IniciarSesion = () => {

    const [errorSubmit, setErrorSubmit] = useState("")
    const [isLoading, setIsLoading] = useState("")

    useEffect(() => {
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
        register('password', {
            required: {
                value: true,
                message: "La contraseña es requerida"
            },
        });
    }, []);

    const handleChange = (e) => {
        setValue(e.target.name, e.target.value)
        setErrorSubmit("")
    }

    const {register, formState: {errors}, handleSubmit, setValue} = useForm();


        async function onSubmit (data, e) {
            setIsLoading(true)
            setErrorSubmit("")

            e.preventDefault()
            try {
            const response = await fetch('http://localhost:6535/iniciarSesion', { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} })
            const iniciarSesion = await response.json()
            console.log(response);
            console.log(iniciarSesion);
            if(!response.ok) {
                setErrorSubmit(iniciarSesion.message);
                return;
            }
            else {
                await M.toast({ html: iniciarSesion.message });
                window.location.href = "/"
            }
        } 
        catch(e) {
                setIsLoading(false)
                setErrorSubmit("Error de conexión. Inténtelo de nuevo.")
            }
        };

        console.log("errores", errors)

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
                    alr="Logotipo Nefrovida"/>
                </a>
                
                <Card>
                <CardLogin titulo="Login"/>
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
                    <br/><br/>

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
                                requerido = { true }/>
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
                                requerido = { true }/>
                                </div>
                                
                        </LineaCampos>
                        { errorSubmit 
                            && <div> <div className='red-text right'> <strong> { errorSubmit } </strong> </div> <br/><br/> </div>
                        }
                        <br></br>
                        <BtnIniciarSesion/>
                        <br></br>
                        <br></br>
                        <BtnRestablecer/>
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
        )
    }

export default IniciarSesion