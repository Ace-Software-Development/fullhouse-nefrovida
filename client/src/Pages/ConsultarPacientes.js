import { useEffect, useState } from 'react';
import Tabla from '../components/TablaPacientes';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import CardSubtitulo from '../components/CardSubtitulo';
import InputSearch from '../components/InputSearch';
import { Link } from 'react-router-dom';
import BtnEditRegis from '../components/BtnEditRegis';

function ConsultarPacientes() {
    const [isLoadind, setIsLoading] = useState(true);
    const [pacientes, setPacientes] = useState([]);
    const [errorFetch, setErrorFetch] = useState('');

    useEffect(() => {
        getPacientes('');
    }, [])

    async function getPacientes(buscar) {
        setErrorFetch('')
        try {
            const response = await fetch('http://localhost:6535/paciente/' + buscar, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const listaPacientes = await response.json();
            setIsLoading(false);
            if (!response.ok) {
                setErrorFetch(listaPacientes.message);
                return;
            }
            setPacientes(listaPacientes.data.data);
        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.')
        }
    }

    function handleChange(e) {
        getPacientes(e.target.value);
    }

    return (
        <div>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Pacientes"/>
                <Link to = "/paciente">
                    <BtnEditRegis icono = "person_add" texto = "Registrar paciente" posicion = "left"/>
                </Link>
                <CardSubtitulo subtitulo= "Pacientes">
                    <InputSearch
                        id = "buscar"
                        label = "Buscar"
                        onChange = { handleChange }
                    />
                </CardSubtitulo>
                { isLoadind ?  <div> Cargando... </div> : <Tabla datos= { pacientes }/>}
                { errorFetch 
                    && <div> <div className="red-text center"> <strong> { errorFetch } </strong> </div> <br/><br/> </div>
                }
            </Card>
        </div>
    )
}

export default ConsultarPacientes;
