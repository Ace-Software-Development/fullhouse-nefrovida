import { useParams } from 'react-router';
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import CardSubtitulo from '../components/CardSubtitulo';
import BtnEditRegis from '../components/BtnEditRegis';
import useFetch from '../hooks/useFetch';
import TablaConsultas from '../components/TablaConsultas';
import { Link } from 'react-router-dom';
import ContainerForm from '../components/ContainerForm';
import CardConsulta from '../components/CardConsulta';


export default function ConsultarResumenConsulta() {
        const params = useParams();
        const id = params.curp;
        const [consultas, setConsultas] = useState([])
        const [ascendente] = useState([]);
        const [currentRole, setCurrentRole] = useState(ReactSession.get('rol'))
        const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + '/paciente/consultas');
        
        
        // Funcion que obtiene el estudio correspondiente al id.
        async function getConsultas(id, ascendente) {
            const paramsRoute = {
                idPaciente: id,
                ascendente: ascendente
            }
            const paramsString = JSON.stringify(paramsRoute);

            await httpConfig(paramsString, 'GET');
        }

        useEffect(() => {
            if(!responseJSON || !responseOk){
                return;
            }
            else {
                setConsultas(responseJSON.notas);
            }
        }, [responseOk])


        // Hook que obtiene los estudios
        useEffect(() => {
            // Se deja solo el acceso a los roles permitidos
            if (ReactSession.get('rol') !== 'doctor'
            && ReactSession.get('rol')!== 'nutriologo'
            && ReactSession.get('rol') !== 'psicologo'
            && ReactSession.get('rol')!== 'admin') {
                window.location.href = '/403';
            }
            getConsultas();
        }, [])

        // Hook que obtiene los estudio cuando currentEstudio y ascendente cambian
        useEffect(() => {
            getConsultas(id, ascendente);
        }, [ascendente])

    return(
        <div>
            <Card>
                <CardTitulo icono="description" titulo="Resumen de consultas"/>
                <ContainerForm>
                    {
                    ReactSession.get('rol')!== 'admin' &&
                    <Link to = {"/registrarConsulta/" + params.curp}>
                        <BtnEditRegis icono="person_add" texto="Registrar nueva nota" posicion = "left"/>
                    </Link>
                    }
                
                </ContainerForm>
                <CardSubtitulo subtitulo = {"Notas del "+ (currentRole === 'admin' ? 'doctor' : currentRole)} grande = {true}/> 
                { loading ?  (
                    <div className="center animate-new-element">
                        <br/>

                        <div className="animate-new-element">
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
                        </div>

                        <br/>
                        <br/>
                    </div>
                )    
                : <div className="animate-new-element"> <TablaConsultas datos = { consultas } idPaciente = {id} rol = {currentRole === 'admin' ? 'doctor' : currentRole} /> </div>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }
                <br/>
                <div className="row-cards-estudios">


                {  (currentRole === 'doctor' || currentRole === 'admin') ?
                    <div className="row-cards-estudios">
                    <CardConsulta nombre="Notas de Nutriólogo" onClick={() => setCurrentRole("nutriologo")}/>
                    <CardConsulta nombre="Notas de Psicólogo" onClick={() => setCurrentRole("psicologo")}/>
                    </div>
                : currentRole === 'nutriologo'?
                    <div className="row-cards-estudios">
                        <CardConsulta nombre="Notas de Doctor" onClick={() => setCurrentRole("doctor")}/>
                        <CardConsulta nombre="Notas de Psicólogo" onClick={() => setCurrentRole("psicologo")}/>
                    </div>
                : currentRole === 'psicologo'?
                    <div className="row-cards-estudios">
                        <CardConsulta nombre="Notas de Doctor" onClick={() => setCurrentRole("doctor")}/>
                        <CardConsulta nombre="Notas de Nutriólogo" onClick={() => setCurrentRole("nutriologo")}/>
                    </div>
                :<></>
                }

                
                </div>
                <br/>
            </Card>
        </div>
    )
}