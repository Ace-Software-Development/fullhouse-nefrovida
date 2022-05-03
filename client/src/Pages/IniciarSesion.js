import { useEffect, useState } from 'react';
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

export default function IniciarSesion() {

    const [formulario, handleChange, reset, errors] = useLogin({
        username: '',
        password: '',
    }, validarIniciarSesion)

        async function handleSubmit (e) {

            e.preventDefault()
            
            const response = await fetch('http://localhost:6535/iniciarSesion', { method: 'POST', body: JSON.stringify({
                "data": formulario}), headers: {'Content-Type': 'application/json'} })
            const iniciarSesion = await response.json()
            console.log(response);
            console.log(iniciarSesion);
            if(!response.ok) {
                window.alert(iniciarSesion.message);
                return;
            }
            else {
                window.alert(iniciarSesion.message);
            }
            console.log(iniciarSesion);
        }

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
                    <form onSubmit={handleSubmit}>
                        <LineaCampos>
                            <div align="left">
                            <Input 
                                id="username" 
                                label="Usuario o Correo electrónico" 
                                value={formulario.username}
                                onChange={handleChange}
                                tamano="m12 s12"/>
                                </div>
                                { errors.username 
                                ? <p>Usuario requerido</p>
                                : null}
                        </LineaCampos>
                        <LineaCampos>
                            <div align="left">
                            <Input 
                                id="password" 
                                type="password"
                                label="Contraseña" 
                                value={formulario.password}
                                onChange={handleChange}
                                tamano="m12 s12"/>
                                </div>
                                { errors.password
                                ? <p>Contraseña requerida</p>
                                : null}
                        </LineaCampos>
                        <br></br>
                        <BtnIniciarSesion/>
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
        )
    }