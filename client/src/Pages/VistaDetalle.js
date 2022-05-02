import { useState } from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import CardTitulo from '../components/CardTitulo'
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';

function VistaDetalle() {


    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <BtnRegresar/>
            <br/><br/>
            <CardTitulo icono="person" titulo="Detalle de paciente"/>
            <Card/>
            </Main>
        </div>
    )
}

export default VistaDetalle;