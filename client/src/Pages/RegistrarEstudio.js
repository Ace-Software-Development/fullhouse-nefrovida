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
import BtnRestablecer from '../components/BtnRestablecer';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';

export default function RegistrarEstudio() {

    const [formulario, handleChange, reset, errors] = useLogin({
        username: '',
        password: '',
        observaciones: '',
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
        <div className="row ContainerForm left-align">
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="note_add" titulo="Registrar estudio"/>
                    <ContainerForm>
                    <BtnRegresar url="/"/><br/><br/>
                    <div align="left">               
                    <div className="detalles-lista negrita-grande c-908F98 left-align">Estudio de Química Sanguínea</div><br/>
                    <div className="detalles-lista light-pequeno c-908F98 left-align">Estudio para tomar los datos de la química sanguínea de las personas.</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <br></br>
                        <LineaCampos>
                            <div className="col s7 l6 identificacion-usuario">
                            <div align="left">
                            <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">Sangre:</div><br/>
                            <Input 
                                id="username"
                                type="number" 
                                label="Valor" 
                                value={formulario.username}
                                onChange={handleChange}
                                tamano="m6 s12"/>
                                <div className="detalles-lista negrita-pequeno c-908F98 left-align">ml</div>
                                </div>
                                </div>
                                { errors.username 
                                ? <p></p>
                                : null}
                            <div className="col s5 l6">
                            <div align="left">
                            <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">Glucosa:</div><br/>
                            <Input 
                                id="password" 
                                type="number"
                                label="Valor" 
                                value={formulario.password}
                                onChange={handleChange}
                                tamano="m3 s12"/>
                                <div className="detalles-lista negrita-pequeno c-908F98 left-align">mg/dL</div>
                                </div>
                                </div>
                                <br></br>
                                { errors.password
                                ? <p></p>
                                : null}
                        </LineaCampos>
                        <br></br>
                        <LineaCampos>
                            <div align="left">
                            <i className="material-icons icon-separator small c-908F98">remove_red_eye</i><div className="detalles-lista negrita-grande c-908F98 left-align">Observaciones:</div><br/>
                            <Input 
                                id="observaciones" 
                                label="Ingresa aquí la observación del estudio" 
                                value={formulario.observaciones}
                                onChange={handleChange}
                                tamano="m12 s12"/>
                                </div>
                                { errors.username 
                                ? <p></p>
                                : null}
                        </LineaCampos>
                        <br></br>
                        <BtnGuardar/>              
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }