/**
 * Consultar tipo de Estudio (Administrador):
 * En esta vista, el administrador puede consultar
 * los detalles de un estudio, eliminar y editar el
 * estudio.
 * 
 * Los datos llegan desde la base de datos y se muestran.
*/

import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar'
import ParametroTipoEstudio from '../components/ParametroTipoEstudio';

export default function ConsultarTipoEstudio() {

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
    
    const arreglo = []

    // async function getTipoEstudio(id) {
    //     setErrorFetch('')
    //     try {
    //         const response = await fetch('http://localhost:6535/' + id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    //         const tipoEstudio = await response.json();
    //         setIsLoading(false);
    //         if (!response.ok) {
    //             setErrorFetch(tipoEstudio.message);
    //             return;
    //         }
    //         arreglo = tipoEstudio.data.data
    //     } catch(e) {
    //         setIsLoading(false);
    //         setErrorFetch('Error de conexión. Inténtelo de nuevo.')
    //     }
    // }

    return(
        <div className="row ContainerForm left-align">
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
                <ContainerForm>
                    <BtnRegresar url="/"/>
                    <br/><br/><br/><br/><br/>    
                    
                    <div className="col s7 l6 identificacion-prueba left-align">
                        <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> description </i>          
                        <div className="detalles-lista negrita-grande c-393939">Biometría Hemática</div><br/>
                        <div className="detalles-lista negrita-pequeno c-908F98">Examen de sangre que inspecciona las células que la componen</div>
                    </div>
                    <div className='detalles-usuario'>
                        <i className="material-icons icon-separator small c-000000">format_list_numbered</i><div className="detalles-lista sn-pequeno c-908F98 left-align">2 parámetros</div>
                    </div>
                    
                    <br/><br/><br/><br/>
                    
                    <div className='identificacion-registrar'/>
                    <br/>

                    <form onSubmit={handleSubmit}>
                        <LineaCampos>
                            
                            <ParametroTipoEstudio></ParametroTipoEstudio>
                            <ParametroTipoEstudio parametro='Glucosa:' valorA="0" valorB="200" unidad='mg/dL'></ParametroTipoEstudio>

                        </LineaCampos>
                        <div className='identificacion-registrar'/>
                        <br/><br/>
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