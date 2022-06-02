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

export default function RegistrarResumenConsulta() {

return(
    <div className="row ContainerForm left-align">

    <div>
        <Navbar/>
        <Main>
            <br/><br/><br/><br/><br/><br/><br/>    
            <Card>
            <CardTitulo icono="note_add" titulo="Registrar resumen de consulta"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/>
                <br/><br/>
                </Link>
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
                                <br/>
                                <Input 
                                    id="consulta" 
                                    label="Escribe las notas de la consulta aquí" 
                                    type="text"
                                    maxLength="500"
                                    tamano="m12 s12"
                                    //onChange = { handleChange }
                                    />
                        </LineaCampos>
                        <br/><br/>
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