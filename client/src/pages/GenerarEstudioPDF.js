/**
 * US : IT 4-9 Generar archivo PDF de los estudios
 * Matriz de trazabilidad: //docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit#gid=0
 * Generar PDF del estudio del paciente:
 * Esta vista se ultiliza para el químico, doctor y nutriologa con la finalidad
 * de consultar los estudios del paciente.
 * Se trata de una card que desglosa la información solicitada de los estudios
 * de cada paciente.
 */

import { ReactSession } from 'react-client-session';
import { useEffect, useState } from 'react';
import BtnRegresar from '../components/BtnRegresar';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import logo from "../img/logo.png";
import TablaEstudioPDF from '../components/TablaEstudioPDF';
import moment from 'moment';


export default function GenerarEstudioPDF() {
    const navigate = useNavigate();
    const params = useParams();
    const idPaciente = params.idPaciente;
    const [estudio, setEstudio] = useState({})
    const [printed, setPrinted] = useState(false)
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + "/estudio/id");


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
        if (ReactSession.get('rol') !== 'doctor' && ReactSession.get('rol') !== 'quimico' && ReactSession.get('rol') !== 'nutriologo') {
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

    function estoCargo() {
        if (estudio.fechaEstudio !== undefined){
            return true;
        }
    }

    function imprimir() {
        window.print();
        setPrinted(true);
        setTimeout( () => closePrintView(), 2000);
        
        function closePrintView() {
            document.location.href = '/paciente/' + idPaciente;
        }
    }

    console.log(error)

    return(
        estoCargo() ?
        (
            
            <div className = "zoomed">

            <div className = "center-align dontPrint">
                { printed ? (
                    <>
                    <br/><br/><br/><br/>
                    <div className = "preloader-wrapper med active">
                        <div className = "spinner-layer spinner-blue-only">
                        <div className = "circle-clipper left">
                            <div className = "circle"></div>
                        </div><div className = "gap-patch">
                            <div className = "circle"></div>
                        </div><div className = "circle-clipper right">
                            <div className = "circle"></div>
                        </div>
                        </div>
                    </div>
                    <h5 className="blue-text text-darken-3"> Cargando </h5>
                    <br/><br/><br/><br/>
                    </>
                ) :
                (
                    <>
                        <br/><br/><br/>
                        <button 
                            className =  { "waves-effect waves-dark btn btn-large btn-editar-registrar blue darken-1 white-text text-accent-4 dontPrint" }
                            onClick = {() => imprimir()}
                            >
                            Descargar o imprimir PDF
                            <i className = "material-icons left"  >picture_as_pdf</i>
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <span className='dontPrint'>¿No es el estudio correcto?</span><br/>
                        <BtnRegresar posicion='center dontPrint'/>
                        <br/>
                        <br/><br/><br/>
                    </>
                ) }
            </div>



            <div className = "container">
            
                <div className = "row header-flex lighten-5">
                    <div className = "col s5">
                    <img 
                        className = "logotipo" 
                        src={ logo }
                        alt = "Logotipo Nefrovida" />
                    </div>
                    <div className = "col s7">
                        <div>
                            <h5 className = "center-align caps-text blue-text text-darken-3 negrita">Laboratorio de análisis clínicos</h5>
                        </div>
                    </div>
                </div>

                <div className = "caps-text flex-detalles-acm">
                    <div className = "flex-detalles">
                        <span>Nombre: &emsp;</span> <span className = "underline-text">{ estudio.nombrePaciente }</span>
                    </div>
                    <div className = "flex-detalles">
                        <span>Fecha: &emsp;</span> <span className = "underline-text">{ moment(estudio.fechaEstudio, 'DD-MM-YYYY').format('DD/MM/YYYY') }</span>
                    </div>
                </div>

                <div className = "flex-detalles-acm">
                    <div className = "caps-text flex-detalles">
                        <span>Medico: &emsp;&nbsp;</span> <span className = "underline-text">A quien corresponda...</span>
                    </div>
                    <div className = "flex-detalles">
                        <span className = "caps-text">Folio: &emsp;</span> <span className = "underline-text">{ estudio.idEstudio }</span>
                    </div>
                </div>

                <br/>

                <div className = "divider blue darken-1"></div>

                <div className = "blue-text text-darken-2 center-align">
                    <h5 className = "negrita">Estudio de {estudio.nombreTipoEstudio}</h5>
                </div>

                <TablaEstudioPDF datos = {estudio.parametros}/>

                <br/>
                <div className = "divider blue darken-1"></div>
                
                <br/><br/>

                <div className = "flex-detalles">
                        <span className = "caps-text">Observaciones: &emsp;</span> <span className = "underline-text">{ estudio.observacionesEstudio }</span>
                </div>

                <br/><br/><br/>
                
                <div className = "divider blue darken-1"></div>
                
                <br/><br/><br/><br/><br/><br/>

                <div className = "center-align blue-text text-darken-3 bottom-info">
                    <br/>
                    Responsable sanitario <br/>
                    Q.B. Leonorilda Bojorquez Mendoza <br/>
                    C.P. 5057773
                </div>            

                <br/>

                <div className = "divider blue darken-1"></div>

            </div>

            <footer className = "page-footer white footer-height footer-override">
                    <div className = "row">
                        <div className = "col s12">
                            <h6 className = "blue-text text-darken-3 center-align">Nefrovida A.C.</h6>
                            <p className = "blue-text text-darken-3 center-align">Sierra Vertientes #167 Col. Lomas de San Juan, San Juan del Río, Qro.</p>
                            <p className = "blue-text text-darken-3 center-align">Teléfono: 427 101 34 35 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; www.nefrovidaac.com</p>
                        </div>
                    </div>
            </footer>

        </div>
        )
        : (
            error ? (
                <div className='center'> <br/><br/><br/> <div className="red-text center"> <strong> { error } </strong> </div> <br/><br/> <BtnRegresar posicion='center'/> </div>
            ) : (
                <div className = "center animate-new-element">
                    <br/>

                    <div className = "preloader-wrapper med active">
                        <div className = "spinner-layer spinner-blue-only">
                        <div className = "circle-clipper left">
                            <div className = "circle"></div>
                        </div><div className = "gap-patch">
                            <div className = "circle"></div>
                        </div><div className = "circle-clipper right">
                            <div className = "circle"></div>
                        </div>
                        </div>
                    </div>

                    <br/>
                    <br/>
                </div>
            )

        )
        
    )

}