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
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import ContainerForm from '../components/ContainerForm';

function ConsultarPacientes() {
    const urlGetTodos = '/paciente/todos';
    const urlGetBuscar = '/paciente/nombre';
    const [url, setUrl] = useState(urlGetTodos);
    const params = useParams();
    const [pacientes, setPacientes] = useState([]);

    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(url);



    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return
        } else {
            if (url === urlGetTodos) {
                setPacientes(responseJSON.data.data);
                setUrl(urlGetBuscar);
            } else if (url === urlGetBuscar) {
                setPacientes(responseJSON.data.data);
            }
        }
    }, [responseOk])
    

    /**
    * Hook que se ejecuta al renderizar el tipo de estudio.
    */
    useEffect(() => {
        getPacientes('');
        if (ReactSession.get('rol') !== 'trabajoSocial' 
        && ReactSession.get('rol') !== 'quimico'
        && ReactSession.get('rol') !== 'doctor'
        && ReactSession.get('rol') !== 'nutriologo'
        && ReactSession.get('rol') !== 'psicologo') {
            window.location.href = '/403';
        }
        getPacientes(params.idPacientes);
    }, [])


    /**
     * Función asíncrona para obtener la lista de pacientes del laboratorio. Si recibe una string
     * es para obtener los pacientes cuyo nombre o apellido contengan dicha string.
     * @param {string} buscar Nombre que se quiere buscar en el nombre y apellido de los pacientes.
     * @returns 
     */

    async function getPacientes(buscar) {
        if ( url === urlGetTodos ) {
            httpConfig(null, 'GET');
        } else if (url === urlGetBuscar) {
            httpConfig(buscar, 'GET');
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

                
                { ReactSession.get('rol') === 'trabajoSocial' &&
                <ContainerForm>
                    <Link to = "/paciente">
                        <BtnEditRegis icono = "person_add" texto = "Registrar paciente" posicion = "left"/>
                    </Link>
                </ContainerForm>
                }
                
                <div className="animate-new-element">
                    <CardSubtitulo subtitulo= "Pacientes">
                        <InputSearch
                            id = "buscar"
                            label = "Buscar"
                            onChange = { handleChange }
                        />
                    </CardSubtitulo>
                </div>
                { loading ?  (
                    <div className="center animate-new-element">
                        <br/>

                        <div className="preloader-wrapper med active">
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

                        <br/>
                        <br/>
                    </div>
                    ) 
                : <Tabla datos= { pacientes }/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }
            </Card>
        </div>
    )
}

export default ConsultarPacientes;