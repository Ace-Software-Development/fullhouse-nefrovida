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
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar'
import { ParametroTexto, ParametroRango, ParametroBooleano } from '../components/ParametroTipoEstudio';


export default function ConsultarTipoEstudio() {

    const [tipoEstudio, setTipoEstudio] = useState({})
    const [parametros, setParametros] = useState([])
    
    function listaParametros() {
        return parametros.map(el => {
            if(el.idParametro.idTipoValor.nombre === "Positivo/Negativo"){
                return <ParametroBooleano nombreParametro = { el.idParametro.nombre } valorBool ={el.idParametro.valorBool} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId} />
            }
            else if(el.idParametro.idTipoValor.nombre === "Texto"){
                return <ParametroTexto nombreParametro = {el.idParametro.nombre} valorString = {el.idParametro.valorString} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            else if (el.idParametro.idTipoValor.nombre === "Numérico"){
                return  <ParametroRango nombreParametro = {el.idParametro.nombre} valorA = {el.idParametro.valorA} valorB = {el.idParametro.valorB} unidad = {el.idParametro.unidad} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            
        })
        
    }

    async function getTipoEstudio(id) {
        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/1', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();

            misDatos = misDatos.data.data.data;
            if (!response.ok) {
                return;
            }
            setTipoEstudio(misDatos.pop());
            setParametros(misDatos);

        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getTipoEstudio(0);
    }, [])

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
                        <div className="detalles-lista negrita-grande c-393939">{ tipoEstudio.nombre}</div><br/>
                        <div className="detalles-lista negrita-pequeno c-908F98">{ tipoEstudio.descripcion }</div>
                    </div>
                    <div className='detalles-usuario'>
                        <i className="material-icons icon-separator small c-000000">format_list_numbered</i><div className="detalles-lista sn-pequeno c-908F98 left-align">{ parametros.length } parámetros</div>
                    </div>
                    <br/><br/><br/>
                    <div className='identificacion-registrar'/>
                    <br/>   
                        <LineaCampos>
                            { listaParametros()}
                        </LineaCampos>
                        <div className='identificacion-registrar'/>
                        <br/><br/>
                        {/* <BtnEliminar texto='Eliminar estudio' posicion='right'/> */}
                        {/* <BtnEditRegis icono='create' texto='Editar estudio'/>               */}
                    
                </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }