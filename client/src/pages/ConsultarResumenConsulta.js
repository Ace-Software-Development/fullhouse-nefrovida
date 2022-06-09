import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis'
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router';
import { ReactSession } from 'react-client-session';

export default function ConsultarResumenConsulta() {

    const [url, setUrl] = useState('/consulta/id');
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [estudio, setConsulta] = useState({})
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    /*
     useEffect(() => {
        //Asegurarnos que solo  administradores y quimicos accedan exitosamente a la pagina.
        if (ReactSession.get('rol') !== 'doctor' && 
            ReactSession.get('rol') !== 'quimico' && 
            ReactSession.get('rol') !== 'psicologo') {
            window.location.href = '/403';
        }
        getConsulta(params.idConsulta);
    }, []);
    */
    /**
    * getTipoEstudio Función asíncrona para obtener el detalle  
    * de un estudio del paciente; recibe el ID del estudio a buscar.
    * @param { string } id 
    */
     async function getConsulta(id) {
        await httpConfig(id, 'GET');
    }

// Variables para sacar la fecha actual.
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let fecha = cDay + "/" + cMonth + "/" + cYear ;


return(
    <div className="row ContainerForm left-align">
    
    <div>
        <Navbar/>
        <Main>
            <br/><br/><br/><br/><br/><br/><br/>    
            <Card>
            <CardTitulo icono="description" titulo="Detalle del resumen de consulta"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/>
                <br/><br/>
                </Link>
                { isLoading && (
                    <div className="center">
                        <br/><br/><br/>
                        <div class="preloader-wrapper big active">
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
                        <div class="texto-grande blue-text text-darken-1">Cargando formulario</div>
                        <br/><br/><br/>
                    </div>
                
                )}
                {
                    //!isLoading && !errorFetch ?
                    <div>
                    <div align="left">
                            <div className="detalles-estudio">         
                            <div className="detalles-lista negrita-grande c-64646A left-align">Notas de la consulta:  </div><span className='c-64646A' >  { fecha } </span>
                            <br/><br/><br/>
                            <div className="detalles-lista light-pequeno c-908F98 left-align">Exploración: 'Bulto en la pierna'.</div>
                            </div>
                    </div>
                    <br/>
                        <BtnEditRegis icono="create" texto="Editar nota"/> 
                    </div>
                    //: null
                }            
                </ContainerForm>
            </Card>
        </Main>
        </div>
    </div>
    )
}