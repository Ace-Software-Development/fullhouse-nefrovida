import CardEstudio from '../components/CardEstudio';
import LineaCardsEstudios from '../components/LineaCardsEstudios';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const Temp = () => {

    const [tiposEstudio, setTiposEstudio] = useState([])
    const [errorFetch, setErrorFetch] = useState('');
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/tipoEstudio/');

    function listaTiposEstudio() {
        return tiposEstudio.map(el => {
            return(
                <CardEstudio nombreEstudio={el.nombre} idTipoEstudio={el.objectId} idPaciente={"undefined"}/>
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

    useEffect(() => {
        setErrorFetch(error);

    }, [error])

    async function getTiposEstudio() {
        await httpConfig(null, 'GET');
    }
    
    useEffect(() => {
        getTiposEstudio();
    }, []);

    return(
        <Card>
            <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
            <div className="contenedor animate-new-element">
                { loading && (
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
                            <div class="texto-grande blue-text text-darken-1">Cargando información</div>
                            <br/><br/><br/>
                        </div>
                    
                )}
                { !loading && !errorFetch && (
                <div className="on-load-anim">  
                    <br/>
                    <LineaCardsEstudios>
                        {listaTiposEstudio()}
                    </LineaCardsEstudios>
                </div>
                )}
                { errorFetch && (
                    <div className="animate-new-element">
                        <br/><br/><br/>
                        <div className="texto-grande red-text center">
                            <strong> { errorFetch } </strong> 
                        </div>
                        <br/><br/><br/>
                    </div>
                )}
            </div>
        </Card>
    );
}


export default Temp;