/**
 * Consultar colaborador:
 * Esta vista se utiliza por el administrador, con la finalidad de 
 * consultar la lista de colaboradores en NefroVida. 
 * 
 * La vista divide las tablas dependiendo el rol del colaborador.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado.
 */
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import CardSubtitulo from '../components/CardSubtitulo';
import { Link } from 'react-router-dom';
import BtnEditRegis from '../components/BtnEditRegis';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import TablaColaboradores from '../components/TablaColaboradores';
import InputSearch from '../components/InputSearch';

export default function ConsultarColaborador() {
    const urlGetTodos = 'http://localhost:6535/colaborador/todosColaboradores';
    const urlGetBuscar = 'http://localhost:6535/colaborador/nombre';
    const [url, setUrl] = useState(urlGetTodos);
    const params = useParams();
    const [colaboradores, setColaboradores] = useState([])
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(url);

    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        } else {
            if (url === urlGetTodos) {
                setColaboradores(responseJSON.data.data);
                setUrl(urlGetBuscar);
            } else if (url === urlGetBuscar) {
                setColaboradores(responseJSON.data.data);
            }
        }
    }, [responseOk])

    
    /**
     * Función asíncrona para obtener la lista de colaboradores. Si recibe una string
     * es para obtener los pacientes cuyo nombre o apellido contengan dicha string.
     * @param {string} buscar Nombre que se quiere buscar en el nombre y apellido de los colaboradores.
     * @returns 
     */
    async function getColaboradores(buscar) {
        if ( url === urlGetTodos ) {
            httpConfig(null, 'GET');
        } else if (url === urlGetBuscar) {
            httpConfig(buscar, 'GET');
        }
    }

    /**
     * Hook que se ejecuta al renderizar la información del colaborador.
     */
    useEffect(() => {
        getColaboradores('');
        if (ReactSession.get('rol') !== 'admin') {
            console.log('roles enter')
            window.location.href = '/403';
        }
        console.log("Params", params.username)
        getColaboradores(params.username);
    }, [])


    /**
     * Función que se ejecuta cuando hay un cambio en el formulario de buscar. Manda llamar la 
     * función de obtener los colaboradores envíandole el nuevo valor como parámetro.
     * @param {event} e Evento del cambio
     */
    function handleChange(e) {
        getColaboradores(e.target.value);
    }


    return (
        <div>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Empleados"/>
                <br/>
                <div className = "contenedor">
                { ReactSession.get('rol') === 'admin' &&
                    <Link to = "/">
                        <BtnEditRegis icono = "person_add" texto = "Registrar empleado" posicion = "left"/>
                    </Link>
                }
                </div>
                <CardSubtitulo subtitulo= "Administradores">
                </CardSubtitulo>
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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "administrador"/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }

                <CardSubtitulo subtitulo= "Doctores">
                </CardSubtitulo>
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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "doctor"/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }
            </Card>
        </div> 
    )
}
