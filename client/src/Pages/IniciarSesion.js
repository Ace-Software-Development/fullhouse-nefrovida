import { useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import CardLogin from '../components/CardLogin';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import BtnIniciarSesion from '../components/BtnIniciarSesion';
import logo from "../img/logo.png";
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';

const IniciarSesion = () => {

    let submitted = false

    const [formulario, handleChange, reset, errors] = useLogin({
        usuario: '',
        password: '',
    }, validarIniciarSesion)

    //const [errors, setErrors] = useState({})

    /*async function handleSubmit (e) {
        formulario.usu = Number(formulario.estatura)
        formulario.peso = Number(formulario.peso)
        formulario.telefono = Number(formulario.telefono)
        formulario.fechaNacimiento = String(formulario.fechaNacimiento)*/

        e.preventDefault()
        const response = await fetch('http://localhost:6535/paciente', { method: 'POST', body: JSON.stringify(formulario), headers: {'Content-Type': 'application/json'} })
        const login = await response.json()
        if(!response.ok) {
            window.alert(login.message);
            return;
        }
        else {
            window.alert(login.message);
        }
        console.log(login)

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
                        <LineaCampos>
                            <Input 
                                id="usuario" 
                                label="Usuario o Correo electrónico" 
                                value={formulario.usuario}
                                onChange={handleChange}
                                tamano="m4 s12"/>
                                { errors.usuario 
                                ? <p>Usuario requerido</p>
                                : null}
                        </LineaCampos>
                        <LineaCampos>
                            <Input 
                                id="password" 
                                type="password"
                                label="Contraseña" 
                                value={formulario.password}
                                onChange={handleChange}
                                tamano="m4 s12"/>
                        </LineaCampos>
                        <br></br>
                        <BtnIniciarSesion/>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
    )
}

export default IniciarSesion