import { useState } from 'react';
import Card from '../components/Card';
import BtnIniciarSesion from '../components/BtnIniciarSesion';
import Main from '../components/Main';
import ContainerForm from '../components/ContainerForm';
import logo from "../img/logo.png";
import LineaCampos from '../components/LineaCampos';
import CardLogin from '../components/CardLogin';
import Input from '../components/Input';

const IniciarSesion = () => {

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
                                //id="usuario" 
                                label="Usuario o Correo electrónico" 
                                //value={formulario.nombre}
                                //onChange={handleChange}
                                posicion="center"
                                tamano="m4 s12"/>
                        </LineaCampos>
                        <LineaCampos>
                            <Input 
                                //id="usuario" 
                                label="Contraseña" 
                                //value={formulario.nombre}
                                //onChange={handleChange}
                                posicion="center"
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