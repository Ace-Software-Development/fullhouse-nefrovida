/**
 * Consultar estudio del paciente:
 * Esta vista se ultiliza para el químico, doctor y nutriologa con la finalidad
 * de consultar los estudios del paciente.
 * Se trata de una card que desglosa la información solicitada de los estudios
 * de cada paciente.
 */

 import { ReactSession } from 'react-client-session';
import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaParametros from '../components/LineaParametros';
import LineaCampos from '../components/LineaCampos';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import ParametroEstudioPaciente from '../components/ParametroEstudioPaciente';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';


export default function ConsultarEstudioPaciente({ idEstudio }) {
    const params = useParams();
    const [estudio, setEstudio] = useState({})
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/estudio/id');


    //Hook para actualizar los datos de el estudio y los parametros
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        }
        else {
            setEstudio(responseJSON.estudio);
        }
    }, [responseOk])


    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        //Asegurarnos que solo  administradores y quimicos accedan exitosamente a la pagina.
        if (ReactSession.get('rol') !== 'doctor' && 
            ReactSession.get('rol') !== 'quimico' && 
            ReactSession.get('rol') !== 'nutriologo') {
            window.location.href = '/';
        }
        getEstudio(params.idEstudio);
    }, []);


    /**
    * getTipoEstudio Función asíncrona para obtener el detalle  
    * de un estudio del paciente; recibe el ID del estudio a buscar.
    * @param { string } id 
    */
    async function getEstudio(id) {
        await httpConfig(id, 'GET');
    }



    // Funcion para obtener los parametros del estudio.
    function getParametrosEstudio() {
        let parametros = estudio.parametros;
        if(parametros !== undefined) {
            return parametros.map(el => {
                return <ParametroEstudioPaciente parametro={el.nombreParametro} valor={el.valorResultado} unidad={el.unidadParametro} referencia= {el.valorReferenciaParametro}></ParametroEstudioPaciente>
            })
        }
    }
    

    return(
        <div className="row ContainerForm left-align">
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del estudio"/>
                    <ContainerForm>
                    
                        {/* <BtnRegresar url="/"/><br/><br/> */}
                        
                        { loading && (
                            <div className="center animate-new-element">
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

                                <div className="texto-grande blue-text text-darken-1">Cargando información</div>

                                <br/><br/><br/>
                            </div>
                        
                        )}
                        { !loading && !error && (
                            <div className = "on-load-anim">
                                <div align="left">               
                                    <div className="detalles-lista negrita-grande c-64646A left-align"> {estudio.nombreTipoEstudio}  </div><span>  {estudio.fechaEstudio}</span><br/>
                                    <div className="detalles-lista light-pequeno c-717079 left-align">{estudio.descripcionTipoEstudio}</div>
                                </div>
                                <br/>
                                
                                <div className='identificacion-registrar'/>

                                <LineaParametros>
                                    {getParametrosEstudio()}             
                                </LineaParametros>

                                <LineaCampos>
                                    <div align="left">
                                        <div className='detalles-usuario'>
                                            <i className="material-icons icon-separator small c-000000">remove_red_eye</i>
                                            <div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div>
                                            <br/>
                                        </div>

                                        <br/><br/>
                                        <div className="detalles-lista negrita-pequeno c-64646A left-align">{estudio.observacionesEstudio}</div>
                                    </div>
                                </LineaCampos>
                                <br></br>

                                {/*<BtnEliminar texto='Eliminar estudio' posicion='right'/> */}
                                {/*<BtnEditRegis icono='create' texto='Editar estudio'/>  */} 
                            </div>
                        )}
                        { error && (
                            <div>
                                <br/><br/><br/>

                                <div className="texto-grande red-text center animate-new-element">
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