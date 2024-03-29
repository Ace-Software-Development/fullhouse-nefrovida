/**
 * US: IT3-8 Consultar los tipos de estudio
 * Matriz de trazabilidad: https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit#gid=0
*/
import { useParams } from 'react-router';
import CardEstudio from '../components/CardEstudio';
import LineaCardsEstudios from '../components/LineaCardsEstudios';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import BtnEditRegis from '../components/BtnEditRegis';
import {Link} from 'react-router-dom'

function TiposEstudio() {
    // Parametro
    const params = useParams();
    const curp = params.curp;
    const [tiposEstudio, setTiposEstudio] = useState([])
    const { httpConfig, loading, responseJSON, error, responseOk } = useFetch(ReactSession.get("apiRoute") + '/tipoEstudio/');

    function listaTiposEstudio() {

        //Asegurarnos que solo  administradores y quimicos accedan exitosamente a la pagina.
        if (ReactSession.get('rol') !== 'admin' && ReactSession.get('rol') !== 'quimico') {
            return [];
        }
        return tiposEstudio.map(el => {
            return(
                <CardEstudio nombreEstudio={ el.nombre } idTipoEstudio={ el.objectId } idPaciente={ curp } key = { el.objectId }/>
            )
        })
    }


    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        }
        else {
            setTiposEstudio(responseJSON.data.data);
        }
    }, [responseOk])


    async function getTiposEstudio() {
        await httpConfig(null, 'GET');
    }
    

    useEffect(() => {
        getTiposEstudio();
    }, []);


    return (
        <Card>
            <CardTitulo icono="description" titulo="Estudios de laboratorio"/>
            <br/>

            <div className="contenedor animate-new-element">
                { loading && (
                        <div className="center">
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
                { !loading && !error && (
                <div className="on-load-anim">  
                    <br/>
                    <LineaCardsEstudios>
                        
                        { listaTiposEstudio() }
                    </LineaCardsEstudios>

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
            </div>
            <div className='contenedor' style={{paddingLeft : "10px"}}>
                { (ReactSession.get('rol') === 'quimico' ) &&
                    <Link to = "/registrarTipoEstudio">
                        <BtnEditRegis icono="note_add" texto="Crear estudio de laboratorio" posicion='right'/>
                    </Link>
                }
            </div>
            <br/><br/>

        </Card>
    );
}


export default TiposEstudio;