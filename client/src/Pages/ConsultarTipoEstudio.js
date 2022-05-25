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
import BtnEliminar from '../components/BtnEliminar';
import LineaParametros from '../components/LineaParametros';
import CardEstudio from '../components/CardEstudio';
import { ParametroTexto, ParametroRango, ParametroBooleano} from '../components/ParametroTipoEstudio';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';


export default function ConsultarTipoEstudio() {
    const params = useParams();

    const [tipoEstudio, setTipoEstudio] = useState({})
    const [parametros, setParametros] = useState([])
    const [errorFetch, setErrorFetch] = useState('');

    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/tipoEstudio/id');


    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        }
        else {
            const misDatos = responseJSON.data.data
            setTipoEstudio(misDatos.pop());
            setParametros(misDatos);
        }
    }, [responseOk])

    useEffect(() => {
        setErrorFetch(error);

    }, [error])

    useEffect(() => {
        getTipoEstudio(params.idTipoEstudio);
    }, []);

    async function getTipoEstudio(id) {
        await httpConfig(id, 'GET');
    }   

    function listaParametros() {
        return parametros.map(el => {
            if(el.idParametro.idTipoValor.nombre === "Positivo/Negativo"){
                return <ParametroBooleano nombreParametro = { el.idParametro.nombre } valorBool ={el.idParametro.valorBool} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId} />
            }
            else if(el.idParametro.idTipoValor.nombre === "Texto"){
                return <ParametroTexto nombreParametro = {el.idParametro.nombre} valorString = {el.idParametro.valorString} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            else if (el.idParametro.idTipoValor.nombre === "Numérico"){
                return  <ParametroRango nombreParametro = {el.idParametro.nombre}valorMin = {el.idParametro.valorMin} valorMax = {el.idParametro.valorMax}  unidad = {el.idParametro.unidad} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            
        })
        
    }


    return(
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
                <ContainerForm>
                    <BtnRegresar/>
                    <br/>
                    { loading && (
                        <div className="center animate-new-element">
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

                            <div class="texto-grande blue-text text-darken-1">Cargando información</div>

                            <br/><br/><br/>
                        </div>
                    
                    )}
                    { !loading && !errorFetch && (
                        <div className="on-load-anim">

                                <br/><br/>  
                                <div className="row div-detalles-estudio">
                                    <div className="col s6 l6 left-align">
                                        <div className="detalles-estudio">
                                            <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> description </i>          
                                            <div className="detalles-lista negrita-grande c-393939">{ tipoEstudio.nombre}</div><br/>
                                            <div className="detalles-lista negrita-pequeno c-908F98">{ tipoEstudio.descripcion }</div>
                                        </div>
                                    </div>
                                    <div className='col s6 l6 numero-parametros'>
                                        <i className="material-icons icon-separator small c-000000">format_list_numbered</i><div className="detalles-lista sn-pequeno c-908F98 left-align">{ parametros.length } parámetros</div>
                                    </div>
                                </div>
                                
                                <div className='identificacion-registrar'/>

                                <LineaParametros>
                                    { listaParametros()}
                                </LineaParametros>
                                    
                                    
                                    {/* <BtnEliminar texto='Eliminar estudio' posicion='right'/> */}
                                    {/* <BtnEditRegis icono='create' texto='Editar estudio'/>               */}
                                

                        </div>
                    )}
                    { errorFetch && (
                        <div>
                            <br/><br/><br/>

                            <div className="texto-grande red-text center animate-new-element">
                                <strong> { errorFetch } </strong> 
                            </div>

                            <br/><br/><br/>
                        </div>
                    )}
                    </ContainerForm>
                </Card>
            </Main>
        </div>
        )
    }