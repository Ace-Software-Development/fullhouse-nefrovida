import CardEstudio from '../components/CardEstudio';
import LineaParametros from '../components/LineaParametros';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import { useEffect, useState } from 'react';

const Temp = () => {

    const [tiposEstudio, setTiposEstudio] = useState([])
    const [errorFetch, setErrorFetch] = useState('');


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
            
            if (!response.ok) {
                setErrorFetch(misDatos.message);
                return;
            }
            misDatos = misDatos.data.data;
            setTiposEstudio(misDatos);
            
        } catch(e) {
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }
    
    useEffect(() => {
        getTiposEstudio();
    }, []);

    return(
        <Card>
            <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
            <div className="contenedor">
                <br/>
                <LineaParametros>
                    {listaTiposEstudio()}
                </LineaParametros>
            </div>
        </Card>
    );
}


export default Temp;