import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import Select from '../components/Select';
import BtnGuardar from '../components/BtnGuardar';
import BtnAnadirParametro from '../components/BtnAnadirParametro';
import BtnEditRegis from '../components/BtnEditRegis';

export default function RegistrarTipoEstudio() {

return(
    <div className="row ContainerForm left-align">

    <div>
        <Navbar/>
        <Main>
            <br></br>    
            <Card>
            <CardTitulo icono="note_add" titulo="Registrar tipo de estudio"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/>
                </Link>
                <BtnEditRegis icono="format_list_numbered" texto="Registrar parámetro"/>
                <br/><br/>
                { /*isLoading && (
                    <div className="center">
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
                        <div class="texto-grande blue-text text-darken-1">Cargando formulario</div>
                        <br/><br/><br/>
                    </div>
                
                )*/}
                {
                    //!isLoading && !errorFetch ?
                    <div>
                        <LineaCampos>
                                <div align="left">
                                <div className='detalles-usuario'>
                                <div className="detalles-lista negrita-grande c-64646A left-align"> Información:</div><br/>
                                </div>
                                </div>
                                <br/>
                                <Input 
                                    id="nombre" 
                                    label="Nombre" 
                                    tamano="m4 s12"
                                    //onChange = { handleChange }
                                    />
                                <Input 
                                    id="descripcion" 
                                    label="Descripción" 
                                    tamano="m6 s12"
                                    //onChange = { handleChange }
                                    />
                        </LineaCampos>
                        <div className='identificacion-registrar'/>
                        <br/>
                        <LineaCampos>
                                <div align="left">
                                <div className='detalles-usuario'>
                                <div className="detalles-lista negrita-grande c-64646A left-align"> Parámetros:</div><br/>
                                </div>
                                </div>
                                <br/>
                                <Select 
                                    id="parametro" 
                                    label="Parámetro" 
                                    tamano="m3 s12"
                                    value=""
                                    arr={ [{ value: "sangre", option: "Sangre"}, {value: "glucosa", option: "Glucosa" }] }
                                    //handleChange = { handleChange }
                                    //elError = { errors.sexo && errors.sexo?.message }
                                    //requerido = { true }
                                />
                        </LineaCampos>
                        <div className='identificacion-registrar'/>
                        <br/>
                        <BtnAnadirParametro/>
                        <br/><br/><br/><br/><br/><br/>
                        <BtnGuardar form="registrar-estudio"/> 
                    </div>
                    //: null
                }            
                </ContainerForm>
            </Card>
        </Main>
        </div>
    </div>
    )
}