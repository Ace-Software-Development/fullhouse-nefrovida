import { ReactSession } from 'react-client-session';
import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import CardSubtitulo from '../components/CardSubtitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import ParametroEstudioPaciente from '../components/ParametroEstudioPaciente';
import TablaEstudios from '../components/TablaEstudios';
import InputSearch from '../components/InputSearch';
import SelectEstudios from '../components/SelectEstudios';
import useFetch from '../hooks/useFetch';


export default function EstudiosLaboratorio() {
    
        const id = "PICA0304MEVN3";
        
        const [estudios, setEstudios] = useState([])
        const [tiposEstudio, setTiposEstudio] = useState([{}])
        const [currentEstudio, setCurrentEstudio] = useState("%20");
        const [ascendente, setAscendente] = useState("%20");

        const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/paciente/estudios');
        
        // Funcion que obtiene el estudio correspondiente al id.
        async function getEstudios(id = "PICA0304MEVN3", nombreTipoEstudio = "%20", ascendente = "%20") {
            const paramsRoute = {
                idPaciente: id,
                nombreTipoEstudio: nombreTipoEstudio,
                ascendente: ascendente
            }
            const paramsString = JSON.stringify(paramsRoute);

            await httpConfig(paramsString, 'GET');

            /*
            setAscendente(ascendente);
            setCurrentEstudio(nombreTipoEstudio);
            */
        }

        useEffect(() => {
            if(!responseJSON || !responseOk){
                return;
            }
            else {
                const misDatos = responseJSON;
                setEstudios(misDatos.estudios);
                setTiposEstudio(misDatos.tiposEstudio);
            }
        }, [responseOk])


        // Hook que obtiene los estudios
        useEffect(() => {
            // Se deja solo el acceso a los roles permitidos
            if (ReactSession.get('rol') !== 'doctor' && ReactSession.get('rol') !== 'quimico' && ReactSession.get('rol')!== 'nutriologo' ) {
                window.location.href = '/';
            }

            getEstudios();
        }, [])

        useEffect(() => {
            getEstudios(id, currentEstudio, ascendente);
        }, [currentEstudio, ascendente])
    
        /**
         * Función que se ejecuta cuando hay un cambio en el formulario de buscar. Manda llamar la 
         * función de obtener los pacientes envíandole el nuevo valor como parámetro.
         * @param {event} e Evento del cambio
         */

        function tipoEstudioChange(e) {
            setCurrentEstudio(e.target.value);
            //getEstudios(id, e.target.value, ascendente);
        }

        function orderChange(e) {
            setAscendente(e.target.value);
            //getEstudios(id, currentEstudio, e.target.value);
        }

        function estudiosExisten() {
            if (tiposEstudio[1] === undefined){
                return false;
            }
            else {
                return true;
            }
            
        }


    return(
        <div>
            <Main>
                <Card>
                    <CardTitulo icono="vaccines" titulo="Exámenes de laboratorio"/>
                    <CardSubtitulo subtitulo = "Estudios" grande = {true}> 
                    { loading ?  (
                    <div className="center animate-new-element">
                        Cargando
                    </div>
                    ) 
                    : estudiosExisten() ? (
                    <div className="adjust-for-min-content ">
                        <SelectEstudios
                            id = "tipo" 
                            label = "📃 Tipo" 
                            value = "%20"
                            paraEstudios = {true}
                            arr = { tiposEstudio} 
                            handleChange = {  tipoEstudioChange }
                        />
                        <SelectEstudios
                            id = "orden" 
                            label = "📅 Orden" 
                            value = "true"
                            arr = {[
                                    {value: "true", option: "↑ Ascendente"},
                                    {value: "false", option: "↓ Descendente"},
                                ] }
                            handleChange = { orderChange }
                        />
                    </div>
                    )
                    : <></>
                    }
                        

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
                    : <div className="animate-new-element"> <TablaEstudios datos = { estudios }/> </div>}
                    { error 
                        && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                    }
                </Card>
            </Main>
        </div>
    )
}