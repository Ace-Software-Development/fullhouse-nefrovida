import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';
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


export default function EstudiosLaboratorio() {
    
        let id = "PICA0304MEVN3"
        
        const [estudios, setEstudios] = useState([])
        const [tiposEstudio, setTiposEstudio] = useState([{}])
        const [isLoading, setIsLoading] = useState(true);
        const [errorFetch, setErrorFetch] = useState('');

        const [currentEstudio, setCurrentEstudio] = useState("%20");
        const [ascendente, setAscendente] = useState("%20");


        // Funcion que obtiene el estudio correspondiente al id.
        async function getEstudios(id = "PICA0304MEVN3", nombreTipoEstudio = "%20", ascendente = "%20") {
            console.log("1")
            setErrorFetch('');
            try {
                console.log("2")
                // console.log('http://localhost:6535/paciente/estudios/' + id + '/' + nombreTipoEstudio + '/' + ascendente);
                const ruta = 'http://localhost:6535/paciente/estudios/' + id + '/' + nombreTipoEstudio + '/' + ascendente
                console.log(ruta);
                const response = await fetch(ruta, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
                let misDatos = await response.json();
                setIsLoading(false);

                console.log("3")
                if (!response.ok) {
                    setErrorFetch(misDatos.message);
                    return;
                }

                console.log("4")
                setEstudios(misDatos.estudios);
                setTiposEstudio(misDatos.tiposEstudio);
                // console.log(misDatos.tiposEstudio);
    
            } catch(e) {
                // console.log(e)
                setIsLoading(false);
                setErrorFetch('Error de conexión. Inténtelo de nuevo.');
            }
        }

        // Hook que obtiene los estudio.
        useEffect(() => {
            getEstudios();
        }, [])
    
        /**
         * Función que se ejecuta cuando hay un cambio en el formulario de buscar. Manda llamar la 
         * función de obtener los pacientes envíandole el nuevo valor como parámetro.
         * @param {event} e Evento del cambio
         */

        function handleChange(e) {
            console.log(e.target.value)
            getEstudios(id, e.target.value, ascendente);
            setCurrentEstudio(e.target.value);
        }

        function cagadaChange(e) {
            console.log(e.target.value)
            getEstudios(id, currentEstudio, e.target.value);
            setAscendente(e.target.value);
        }

        function estudiosExisten() {
            console.log("aaaa")
            console.log(tiposEstudio[1])
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
                    { isLoading ?  (
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
                            handleChange = {  handleChange }
                        />
                        <SelectEstudios
                            id = "orden" 
                            label = "📅 Orden" 
                            value = "true"
                            arr = {[
                                    {value: "true", option: "↑ Ascendente"},
                                    {value: "false", option: "↓ Descendente"},
                                ] }
                            handleChange = { cagadaChange }
                        />
                    </div>
                    )
                    : <></>
                    }
                        

                    </CardSubtitulo>
                    { isLoading ?  (
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
                    { errorFetch 
                        && <div> <div className="red-text center"> <strong> { errorFetch } </strong> </div> <br/><br/> </div>
                    }
                </Card>
            </Main>
        </div>
    )
}