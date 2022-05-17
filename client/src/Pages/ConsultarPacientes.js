/**
 * Consultar pacientes:
 * Esta vista se utiliza por el trabajador social, los médicos y químicos, con la finalidad de 
 * consultar la lista de pacientes en el laboratorio. 
 * 
 * La vista contiene un buscador para buscar un paciente por nombre o apellido.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado.
 */
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

    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        getPacientes('');
    }, [])

    /**
     * Función asíncrona para obtener la lista de pacientes del laboratorio. Si recibe una string
     * es para obtener los pacientes cuyo nombre o apellido contengan dicha string.
     * @param {string} buscar Nombre que se quiere buscar en el nombre y apellido de los pacientes.
     * @returns 
     */
    async function getPacientes(buscar) {
        // Error vacío
        setErrorFetch('');
        try {
            // Fetch a la ruta de back para obtener la información
            const response = await fetch('http://localhost:6535/paciente/' + buscar, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const listaPacientes = await response.json();
            setIsLoading(false);
            
            // Mostrar error en caso de ser necesario
            if (!response.ok) {
                setErrorFetch(listaPacientes.message);
                return;
            }
            // Guardar los datos en la listaPacientes para desplegarlos.
            setPacientes(listaPacientes.data.data);
        } catch(e) {
            // Mostrar mensaje de error en la conexión con la base de datos.
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }

    /**
     * Función que se ejecuta cuando hay un cambio en el formulario de buscar. Manda llamar la 
     * función de obtener los pacientes envíandole el nuevo valor como parámetro.
     * @param {event} e Evento del cambio
     */
    function handleChange(e) {
        getPacientes(e.target.value);
    }


    return (
        <div>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Pacientes"/>
                <Link to = "/paciente">
                    <br></br>
                    <BtnEditRegis icono = "person_add" texto = "Registrar paciente" posicion = "left"/>
                </Link>
                <br></br>
                <br></br>
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
