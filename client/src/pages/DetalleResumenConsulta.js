/**
 * Detalle resumen de consulta:
 * Esta vista se utiliza por el administrador, con la finalidad de 
 * consultar la información de un colaborador.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado, se envía el CURP del paciente en el body.
 */
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import ContenidoDetalleConsul from '../components/ContenidoDetalleConsul';

export default function DetalleResumenConsulta() {

    const params = useParams();
    const [consulta, setConsulta] = useState({});
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + '/consulta/detalle/notas');

    /**
    * Hook que se ejecuta al renderizar la información del resumen de consulta.
    */
    useEffect(() => {
        // Se deja solo el acceso a los roles permitidos
        if (ReactSession.get('rol') !== 'doctor'
        && ReactSession.get('rol')!== 'nutriologo'
        && ReactSession.get('rol') !== 'psicologo') {
            window.location.href = '/403';
        }
        httpConfig(params.idResumen, 'GET');
    }, [])


    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return
        } else {
            setConsulta(responseJSON.notas.consulta);
        }
    }, [responseOk])

    return(
        <div className="row ContainerForm left-align">
        
        <div>
            <Navbar/>
            <Main>
                <br/><br/><br/><br/><br/><br/><br/>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del resumen de consulta"/>
                    <ContainerForm>
                    <Link to = {"/paciente/" + params.curp}>
                        <BtnRegresar/>
                        <br/><br/>
                    </Link>
                    { loading && (
                        <div className="center">
                            <br/><br/><br/>
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
                            <div className="texto-grande blue-text text-darken-1">Cargando resumen de consulta</div>
                            <br/><br/><br/>
                        </div>
                    
                    )}
                    { !loading && !error && <div className="loader-anim"><ContenidoDetalleConsul consulta={ consulta } /></div>}<br/>
                    { error && (
                        <div className="animate-new-element">
                            <br/><br/><br/>

                            <div className="texto-grande red-text center">
                                <strong> { error } </strong> 
                            </div>

                            <br/><br/><br/>
                        </div>
                    )}        
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
}