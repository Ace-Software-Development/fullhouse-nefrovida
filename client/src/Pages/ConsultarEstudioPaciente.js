import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import ParametroEstudioPaciente from '../components/ParametroEstudioPaciente';

export default function ConsultarEstudioPaciente() {

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
                <CardTitulo icono="description" titulo="Detalle del estudio"/>
                    <ContainerForm>
                    <BtnRegresar url="/"/><br/><br/>
                    
                    
                    
                        <div align="left">               
                            <div className="detalles-lista negrita-grande c-64646A left-align">Estudio de Química Sanguínea  </div><span>  05/05/2022</span><br/>
                            <div className="detalles-lista light-pequeno c-717079 left-align">Estudio para tomar los datos de la química sanguínea de las personas.</div>
                        </div>
                        <br/>
                        <div className='identificacion-registrar'/>
                        <br/>


                    <form onSubmit={handleSubmit}>
                        <LineaCampos>
                            
                            <ParametroEstudioPaciente></ParametroEstudioPaciente>
                            <ParametroEstudioPaciente parametro='Glucosa:' valor="100" unidad='mg/dL'></ParametroEstudioPaciente>
                            
                        </LineaCampos>
                        <div className='identificacion-registrar'/>
                        <br/>
                        <LineaCampos>
                            <div align="left">
                            <div className='detalles-usuario'>
                            <i className="material-icons icon-separator small c-000000">remove_red_eye</i><div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div><br/>
                            </div>
                            <br/><br/>
                                <div className="detalles-lista negrita-pequeno c-64646A left-align">Se realizó el estudio 2 veces para verificar los datos obtenidos.</div>
                            </div>
                        </LineaCampos>
                        <br></br>
                        <BtnEliminar texto='Eliminar estudio' posicion='right'/>
                        <BtnEditRegis icono='create' texto='Editar estudio'/>               
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }