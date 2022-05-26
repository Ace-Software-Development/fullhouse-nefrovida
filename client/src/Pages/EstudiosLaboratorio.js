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


export default function EstudiosLaboratorio({}) {
    
        const [estudios, setEstudios] = useState([])
        const [isLoading, setIsLoading] = useState(true);
        const [errorFetch, setErrorFetch] = useState('');

        // Hook que obtiene los estudio.
        useEffect(() => {
            getEstudio("PICA0304MEVN3", "");
        }, [])
        
        // Funcion que obtiene el estudio correspondiente al id.
        async function getEstudio(id) {
            setErrorFetch('');
            try {
                console.log(id)
                const response = await fetch('http://localhost:6535/paciente/estudios/' + id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
                let misDatos = await response.json();
                setIsLoading(false);

                if (!response.ok) {
                    setErrorFetch(misDatos.message);
                    return;
                }

                setEstudios(misDatos.data);
                console.log(misDatos.data);
    
            } catch(e) {
                console.log(e)
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
            getEstudio(e.target.value);
        }


    return(
        <div>
            <Main>
                <Card>
                    <CardTitulo icono="vaccines" titulo="Exámenes de laboratorio"/>
                    <CardSubtitulo subtitulo = "Estudios"> 
                        <InputSearch
                            id = "buscar"
                            label = "Buscar"
                            onChange = { handleChange }
                        />
                    </CardSubtitulo>
                    { isLoading ?  (
                    <div className="center animate-new-element">
                        <br/>

                        <div class="preloader-wrapper med active">
                            <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
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