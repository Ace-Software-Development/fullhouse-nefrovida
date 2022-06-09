/**
 * US:IT1-10 consultar estudios del paciente
 * Matriz de trazabilidad: https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit#gid=0
 * 
 */


import { useParams } from 'react-router';
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

        // Parametro
        const params = useParams();
        const id = params.curp;
        
        const [estudios, setEstudios] = useState([])
        const [tiposEstudio, setTiposEstudio] = useState([{}])
        const [currentEstudio, setCurrentEstudio] = useState('%20');
        const [ascendente, setAscendente] = useState('%20');

        const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + '/paciente/estudios');
        
        // Funcion que obtiene el estudio correspondiente al id.
        async function getEstudios(id, nombreTipoEstudio = '%20', ascendente = '%20') {
            const paramsRoute = {
                idPaciente: id,
                nombreTipoEstudio: nombreTipoEstudio,
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
                const misDatos = responseJSON;
                setEstudios(misDatos.estudios);
                setTiposEstudio(misDatos.tiposEstudio);
            }
        }, [responseOk])


        // Hook que obtiene los estudios
        useEffect(() => {
            // Se deja solo el acceso a los roles permitidos
            if (ReactSession.get('rol') !== 'doctor' 
            && ReactSession.get('rol') !== 'quimico' 
            && ReactSession.get('rol')!== 'nutriologo' ) {
                window.location.href = '/403';
            }

            getEstudios();
        }, [])

        // Hook que obtiene los estudio cuando currentEstudio y ascendente cambian
        useEffect(() => {
            getEstudios(id, currentEstudio, ascendente);
        }, [currentEstudio, ascendente])
    
        /**
         * Función que se ejecuta cuando hay un cambio en el filtro de tipo de estudio.
         * @param {event} e Evento del cambio
         */

        function tipoEstudioChange(e) {
            setCurrentEstudio(e.target.value);
        }

        /**
         * Función que se ejecuta cuando hay un cambio en el filtro de ascendente/descendente.
         * @param {event} e Evento del cambio
         */
        function orderChange(e) {
            setAscendente(e.target.value);
        }

        /**
         * Función que valida si existen tipos de estudio en su arreglo.
         */
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
            <Card>
                <CardTitulo icono="vaccines" titulo="Exámenes de laboratorio"/>
                <CardSubtitulo subtitulo = "Estudios" grande = {true}> 
                { loading ?  (
                <div className="center animate-new-element">
                    Cargando...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                ) 
                : estudiosExisten() ? (
                <div className="adjust-for-min-content flex-for-main-div">
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
                : <div className="animate-new-element"> <TablaEstudios datos = { estudios } idPaciente = {id} /> </div>}
                { error 
                    && <div> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> </div>
                }
            </Card>
        </div>
    )
}