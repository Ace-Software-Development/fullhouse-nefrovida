import CardEstudio from '../components/CardEstudio';
import LineaParametros from '../components/LineaParametros';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import { useEffect, useState } from 'react';

const Temp = () => {

    const [tiposEstudio, setTiposEstudio] = useState({})


    function listaTiposEstudio() {
        return tiposEstudio.map(el => {
            console.log(el)
        })
        
    }

    async function getTiposEstudio() {
        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();
            misDatos = misDatos.data.data;
            if (!response.ok) {
                return;
            }
            setTiposEstudio(misDatos);
            
        } catch(e) {
            console.log(e)
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
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>
                    <CardEstudio/>  
                    <CardEstudio/>
                </LineaParametros>
            </div>
        </Card>
    );
}


export default Temp;