import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis'

export default function ConsultarResumenConsulta() {

// Variables para sacar la fecha actual.
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let fecha = cDay + "/" + cMonth + "/" + cYear ;


return(
    <div className="row ContainerForm left-align">
    
    <div>
        <Navbar/>
        <Main>
            <br/><br/><br/><br/><br/><br/><br/>    
            <Card>
            <CardTitulo icono="description" titulo="Detalle del resumen de consulta"/>
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
                    <div align="left">
                            <div className="detalles-estudio">         
                            <div className="detalles-lista negrita-grande c-64646A left-align">Notas de la consulta:  </div><span className='c-64646A' >  { fecha } </span>
                            <br/><br/><br/>
                            <div className="detalles-lista light-pequeno c-908F98 left-align">Exploración: 'Bulto en la pierna'.</div>
                            </div>
                    </div>
                    <br/>
                        <BtnEditRegis icono="create" texto="Editar nota"/> 
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