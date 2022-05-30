/**
 * Detalle paciente:
 * Esta vista se utiliza por el trabajador social, los médicos y químicos, con la finalidad de 
 * consultar la información de un paciente.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado, se envía el CURP del paciente en el body.
 */
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import CardTitulo from '../components/CardTitulo';
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';
import ContenidoDetallesPx from '../components/ContenidoDetallesPx';


function DetallePaciente() {
    const [paciente, setPaciente] = useState({});
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/paciente/detalle/curp');


    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        getPaciente();
    }, [])


    /**
     * Función asíncrona para obtener la información del paciente.
     * @returns 
     */
    async function getPaciente() {

            httpConfig(params.detallePaciente, 'GET');
    }

    /**
    * Hook que se ejecuta al renderizar el tipo de estudio.
    */
    useEffect(() => {
        getPaciente(detallePaciente);
        if (ReactSession.get('rol') !== 'trabajosocial' 
        && ReactSession.get('rol') !== 'quimico'
        && ReactSession.get('rol') !== 'doctor'
        && ReactSession.get('rol') !== 'nutriologo'
        && ReactSession.get('rol') !== 'psicologo') {
            window.location.href = '/';
        }
    }, [])


    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return
        } else {
            if (url === urlGet) {
                setPaciente(responseJSON.data.data);
            } 
        }
    }, [responseOk])


    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/> 
            <Link to = "/">
                <BtnRegresar/>
            </Link>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Detalle de paciente"/>
                { loading && (
                    <div className="center animate-new-element">
                        <br/><br/>

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

                        <br/><br/>
                    </div>
                
                )}
                { !loading && !error && <div className="loader-anim"><ContenidoDetallesPx paciente={ paciente }/></div>}
                { error && (
                    <div className="animate-new-element">
                        <br/><br/><br/>

                        <div className="texto-grande red-text center">
                            <strong> { error } </strong> 
                        </div>

                        <br/><br/><br/>
                    </div>
                )}
            </Card>
            </Main>
        </div>
    )
}

export default DetallePaciente;