/**
 * Consultar estudio del paciente:
 * Esta vista se ultiliza para el químico, doctor y nutriologa con la finalidad
 * de consultar los estudios del paciente.
 * Se trata de una card que desglosa la información solicitada de los estudios
 * de cada paciente.
 */

import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaParametros from '../components/LineaParametros';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import ParametroEstudioPaciente from '../components/ParametroEstudioPaciente';
import { useParams } from 'react-router-dom';

export default function ConsultarEstudioPaciente({ idEstudio }) {
    const params = useParams();

    const [estudio, setEstudio] = useState({})
    const [errorFetch, setErrorFetch] = useState('');
    const [isLoading, setIsLoading] = useState('');

    // Funcion para obtener los parametros del estudio.
    function getParametrosEstudio() {
        let parametros = estudio.parametros;
        console.log(parametros);
        if(parametros !== undefined) {
            return parametros.map(el => {
                return <ParametroEstudioPaciente parametro={el.nombreParametro} valor={el.valorResultado} unidad={el.unidadParametro} referencia= {el.valorReferenciaParametro}></ParametroEstudioPaciente>
            })
        }
    }
    
    // Funcion que obtiene el estudio correspondiente al id.
    async function getEstudio(id) {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:6535/estudio/' + id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                setErrorFetch(misDatos.message);
                return;
            }
            setEstudio(misDatos.estudio);
            //console.log(misDatos);

        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
            console.log(e)
        }
    }
    // Hook que obtiene el estudio.
    useEffect(() => {
        getEstudio(params.idEstudio);
        setIsLoading(true);
        //getParametrosEstudio();
    }, [])

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
                        
                        { isLoading && (
                            <div className="center animate-new-element">
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

                                <div class="texto-grande blue-text text-darken-1">Cargando información</div>

                                <br/><br/><br/>
                            </div>
                        
                        )}
                        { !isLoading && !errorFetch && (
                            <div class="on-load-anim">
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
                        { errorFetch && (
                            <div>
                                <br/><br/><br/>

                                <div className="texto-grande red-text center animate-new-element">
                                    <strong> { errorFetch } </strong> 
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