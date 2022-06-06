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

export default function ConsultarColaborador() {
    const urlGetTodos = 'http://localhost:6535/colaborador/todosColaboradores';
    const [url] = useState(urlGetTodos);
    const [colaboradores, setColaboradores] = useState([])
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(url);

    /**
     * Hook que se ejecuta al obtener los colaboradores.
     */
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        } else {
            setColaboradores(responseJSON.data.data);
        }
    }, [responseOk])

    
    /**
     * Función asíncrona para obtener la lista de colaboradores.
     * @returns 
     */
    async function getColaboradores() {
        if ( url === urlGetTodos ) {
            httpConfig(null, 'GET');
        }
    }

    /**
     * Hook que se ejecuta al renderizar la información del colaborador.
     */
    useEffect(() => {
        getColaboradores();
        if (ReactSession.get('rol') !== 'admin') {
            console.log('roles enter')
            window.location.href = '/403';
        }
    }, [])


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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "admin"/>}
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

                <CardSubtitulo subtitulo= "Químicos">
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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "quimico"/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }

                <CardSubtitulo subtitulo= "Psicólogos">
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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "psicologo"/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }

                <CardSubtitulo subtitulo= "Trabajadores Sociales">
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
                : <TablaColaboradores datos= { colaboradores } nombreRol= "trabajoSocial"/>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }
            </Card>
        </div> 
    )
}
