/**
 * Detalle colaborador:
 * Esta vista se utiliza por el administrador, con la finalidad de 
 * consultar la información de un colaborador.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado, se envía el CURP del paciente en el body.
 */
import BtnEliminar from '../components/BtnEliminar';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import CardTitulo from '../components/CardTitulo';
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';
import ContenidoDetalleCol from '../components/ContenidoDetalleCol';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';


export default function DetalleColaborador() {
    const [url, setUrl] = useState('/colaborador/detalle/username');
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const username =params.username;
    const rol = params.rol;
    const [colaborador, setColaborador] = useState({});
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + url);


    /**
    * Hook que se ejecuta al renderizar la información del colaborador.
    */
    useEffect(() => {
        if (ReactSession.get('rol') !== 'admin') {
            window.location.href = '/403';
        }
        getEmpleado(username);
    }, [])


    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return
        }
        else if(url === '/colaborador/detalle/username') {
            setColaborador(responseJSON.data.data);
            setUrl('/colaborador/detalle/username/borrar');
        }
        else if(url === '/colaborador/detalle/username/borrar') {
            setIsLoading(true);
            M.toast({ html: responseJSON.message});
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }, [responseOk])


    /**
    * getTipoEstudio Función asíncrona para obtener el detalle  
    * de un tipo de estudio; recibe el ID del tipo estudio a buscar.
    * @param { string } idTipoEstudio Username del tipo de estudio
    */
    async function getEmpleado(id) {
        await httpConfig(id, 'GET');
    }   


    /**
     * Función que se ejecuta al dar click en el botón de eliminar empleado.
     * @param {object} data - Datos del paciente en el formulario 
     * @param {evento} e - Evento para submit
     * @returns 
     */
    async function eliminarEmpleado(e) {
        let json = {
            objectId: username
        }
        e.preventDefault();
        httpConfig(json,'POST');
    }
    
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/> 
            <Card>
            <CardTitulo icono="person" titulo="Detalle del empleado"/>
            <div className="contenedor">
                <br/>
                <Link to = "/">
                    <BtnRegresar/>
                </Link>
            </div>
                { loading || isLoading && (
                    <div className="center animate-new-element">
                        <br/><br/>

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

                        <br/><br/>
                    </div>
                
                )}
                { !loading && !isLoading && !error && (
                    <div className="loader-anim">
                        <ContenidoDetalleCol colaborador={ colaborador } rol={ rol }/>
                    { ReactSession.get('rol') === 'admin' &&
                        <div>
                            <form onSubmit = { eliminarEmpleado }>
                                <BtnEliminar texto="Eliminar empleado" posicion="right"/>
                            </form>
                        </div>
                    }
                    </div>
                )}
                { error && (
                    <div className="animate-new-element">
                        <br/><br/><br/>

                        <div className="texto-grande red-text center">
                            <strong> { error } </strong> 
                        </div>

                        <br/><br/><br/>
                    </div>
                )}
            </Card>
            </Main>
        </div>
    )
}
