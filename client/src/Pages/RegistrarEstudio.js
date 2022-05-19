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
import BtnGuardar from '../components/BtnGuardar';
import EntradaParametro from '../components/EntradaParametro';

export default function RegistrarEstudio() {
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
                            <div className="detalles-lista negrita-grande c-64646A left-align">Estudio de Química Sanguínea  </div><span className='subrayado c-2E7EC8' >  05/05/2022</span><br/>
                            <div className="detalles-lista light-pequeno c-908F98 left-align">Estudio para tomar los datos de la química sanguínea de las personas.</div>
                        </div>
                        <br/>
                        <div className='identificacion-registrar'/>
                        <br/>


                    <form onSubmit={handleSubmit}>
                        <LineaCampos>
                            
                            <EntradaParametro nombreValor = "Positivo/Negativo" nombreParametro = "Viscoso" codigo = "HA"/>
                            <EntradaParametro nombreValor = "Numérico" nombreParametro = "Glucosa" unidad = 'mg/dL' codigo = "XD"/>
                            <EntradaParametro nombreValor = "Texto" nombreParametro = "Color" codigo = "TEST"/>
                            <EntradaParametro nombreValor = "Numérico" nombreParametro = "Sangre" unidad = 'ml' codigo = "DX"/>
                            <EntradaParametro nombreValor = "Positivo/Negativo" nombreParametro = "Viscoso" codigo = "AH"/>
                            <EntradaParametro nombreValor = "Texto" nombreParametro = "Nuevo Color" codigo = "TEST2"/>
                        
                        </LineaCampos>
                        
                        <div className='identificacion-registrar'/>
                        <br/>
                        <LineaCampos>
                            <div align="left">
                            <div className='detalles-usuario'>
                            <i className="material-icons icon-separator small c-000000">remove_red_eye</i><div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div><br/>
                            </div>
                            <Input 
                                id="observaciones" 
                                label="Ingresa aquí la observación del estudio" 
                                value={formulario.observaciones}
                                onChange={handleChange}
                                tamano="m12 s12"/>
                                </div>
                        </LineaCampos>
                        <br/>
                        <BtnGuardar/>              
                        </form>
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }