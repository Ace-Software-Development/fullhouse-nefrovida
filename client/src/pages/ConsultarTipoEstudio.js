/**
 * US: IT3-8 Consultar los tipos de estudio
 * Matriz de trazabilidad:https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit#gid=0
 * Consultar tipo de Estudio (Administrador y Quimicos):
 * En esta vista, el administrador o quimico puede consultar
 * los detalles de un  tipo de estudio, eliminar y editar el
 * estudio.
 * 
 * Los datos llegan desde la base de datos y se muestran.   
*/
import M from 'materialize-css/dist/js/materialize.min.js';
import BtnRegresar from '../components/BtnRegresar';
import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnEliminar from '../components/BtnEliminar';
import LineaParametros from '../components/LineaParametros';
import { ParametroTexto, ParametroRango, ParametroBooleano } from '../components/ParametroTipoEstudio';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';


export default function ConsultarTipoEstudio() {
    const [url, setUrl] = useState('/tipoEstudio/id');
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const [tipoEstudio, setTipoEstudio] = useState({})
    const [parametros, setParametros] = useState([])
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + url);


    //Hook para actualizar los datos de el estudio y los parametros
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        }
        else if(url === '/tipoEstudio/id') {
            setTipoEstudio(responseJSON.data.data.pop());
            setParametros(responseJSON.data.data);
            setUrl('/tipoEstudio/id/borrar');
        }
        else if(url === '/tipoEstudio/id/borrar') {
            setIsLoading(true);
            M.toast({ html: responseJSON.message});
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }, [responseOk])


    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        //Asegurarnos que solo  administradores y quimicos accedan exitosamente a la pagina.
        if (ReactSession.get('rol') !== 'admin' && ReactSession.get('rol') !== 'quimico' ) {
            window.location.href = '/403';
        }
        getTipoEstudio(params.idTipoEstudio);
    }, []);


    /**
    * getTipoEstudio Función asíncrona para obtener el detalle  
    * de un tipo de estudio; recibe el ID del tipo estudio a buscar.
    * @param { string } idTipoEstudio ObjectId del tipo de estudio
    */
    async function getTipoEstudio(id) {
        await httpConfig(id, 'GET');
    }

    /**
     * Función que se ejecuta al dar click en el botón de eliminar estudio, para registrar el paciente en la
     * base de datos haciendo un fetch a la ruta de back.
     * @param {object} data - Datos del paciente en el formulario 
     * @param {evento} e - Evento para submit
     * @returns 
     */
    async function eliminarTipoEstudio(e) {
        let json = {
            idTipoEstudio: params.idTipoEstudio,
        }
        e.preventDefault();
        httpConfig(json,'POST');
    }


    /**
    * listaParametros Función para obtener la lista de componentes 
    * de diferentes tipos de parametros con sus detalles
    * @returns lista de parametros
    */
    function listaParametros() {
        return parametros.map(el => {
            if(el.idParametro.idTipoValor.nombre === "Positivo/Negativo"){
                return <ParametroBooleano 
                            nombreParametro = { el.idParametro.nombre } 
                            valorBool ={ el.idParametro.valorBool } 
                            codigo = { el.idParametro.codigo } 
                            key = { el.idParametro.objectId } 
                        />
            }
            else if(el.idParametro.idTipoValor.nombre === "Texto"){
                return <ParametroTexto 
                            nombreParametro = { el.idParametro.nombre } 
                            valorString = { el.idParametro.valorString } 
                            codigo = { el.idParametro.codigo } 
                            key = { el.idParametro.objectId }
                        />
            }
            else if (el.idParametro.idTipoValor.nombre === "Numérico"){
                return  <ParametroRango 
                            nombreParametro = { el.idParametro.nombre }
                            valorMin = { el.idParametro.valorMin } 
                            valorMax = { el.idParametro.valorMax } 
                            unidad = { el.idParametro.unidad } 
                            codigo = { el.idParametro.codigo } 
                            key = { el.idParametro.objectId }
                        />
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
                    { loading || isLoading&& (
                        <div className="center animate-new-element">
                            <br/><br/><br/>
                            <div className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                                </div>
                            </div>
                            <div className="texto-grande blue-text text-darken-1">Cargando información</div>
                            <br/><br/><br/>
                        </div>
                    
                    )}
                    { !loading && !isLoading && !error && (
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
                                    { listaParametros() }
                                </LineaParametros>
                                    
                                    
                                { ReactSession.get('rol') === 'admin' &&
                                <div>
                                    <form onSubmit = { eliminarTipoEstudio }>
                                        <BtnEliminar texto="Eliminar tipo estudio" posicion="right"/>
                                    </form>
                                </div>
                                }
                                    {/* <BtnEditRegis icono='create' texto='Editar estudio'/>               */}
                            

                        </div>


                    )}
                    { error && (
                        <div>
                            <br/><br/><br/>

                            <div className="texto-grande red-text center animate-new-element">
                                <strong> { error } </strong> 
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