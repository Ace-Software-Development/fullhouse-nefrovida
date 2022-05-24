import CardEstudio from '../components/CardEstudio';
import LineaParametros from '../components/LineaParametros';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import { useEffect, useState } from 'react';

const Temp = () => {

    const [tiposEstudio, setTiposEstudio] = useState([])
    const [errorFetch, setErrorFetch] = useState('');
    const [isLoading, setIsLoading] = useState('');


    function listaTiposEstudio() {
        return tiposEstudio.map(el => {
            return(
                <CardEstudio nombreEstudio={el.nombre} idTipoEstudio={el.objectId} idPaciente={"undefined"}/>
            )
        })
    }

    async function getTiposEstudio() {
        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();
            setIsLoading(false);
            
            if (!response.ok) {
                setErrorFetch(misDatos.message);
                return;
            }
            misDatos = misDatos.data.data;
            setTiposEstudio(misDatos);
            
        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }
    
    useEffect(() => {
        getTiposEstudio();
        setIsLoading(true);
    }, []);

    return(
        <Card>
            <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
            <div className="contenedor animate-new-element">
                { isLoading && (
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
                { !isLoading && !errorFetch && (
                <div className="on-load-anim">  
                    <br/>
                    <LineaParametros>
                        {listaTiposEstudio()}
                    </LineaParametros>
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