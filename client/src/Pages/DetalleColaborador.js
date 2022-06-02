/**
 * Detalle paciente:
 * Esta vista se utiliza por el trabajador social, los médicos y químicos, con la finalidad de 
 * consultar la información de un paciente.
 * 
 * Para obtener los datos usamos una petición de tipo GET al servidor que se ejecuta al 
 * en el primer rederizado, se envía el CURP del paciente en el body.
 */
 import { useParams } from 'react-router';
 import { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
 import Navbar from '../components/Navbar';
 import Main from '../components/Main';
 import CardTitulo from '../components/CardTitulo';
 import BtnRegresar from '../components/BtnRegresar';
 import Card from '../components/Card';
 import ContenidoDetalleCol from '../components/ContenidoDetalleCol';
 import useFetch from '../hooks/useFetch';
 import { ReactSession } from 'react-client-session';
 
 
 export default function DetalleColaborador() {
     const params = useParams();
     const [colaborador, setColaborador] = useState({});
     const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/empleado/detalle/username');
 
 
     /**
      * Función asíncrona para obtener la información del paciente.
      * @returns 
      */
     async function getColaborador() {
             httpConfig(params.username, 'GET');                                                           
     }
 
     /**
     * Hook que se ejecuta al renderizar el tipo de estudio.
     */
     useEffect(() => {
         console.log(ReactSession.get('rol'))
         if (ReactSession.get('rol') !== 'admin') {
             window.location.href = '/403';
         }
         getColaborador();
     }, [])
 
 
     useEffect(() => {
         if (!responseJSON || !responseOk) {
             return
         } else {
                 setColaborador(responseJSON.data.data);
         }
     }, [responseOk])
 
 
     return (
         <div>
             <Navbar/>
             <Main>
             <br/><br/> 
             <Link to = "/">
                 <BtnRegresar/>
             </Link>
             <br/><br/>
             <Card>
                 <CardTitulo icono="person" titulo="Detalle deL empleado"/>
                 { loading && (
                     <div className="center animate-new-element">
                         <br/><br/>
 
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
 
                         <br/><br/>
                     </div>
                 
                 )}
                 { !loading && !error && <div className="loader-anim"><ContenidoDetalleCol colaborador={ colaborador }/></div>}
                 { error && (
                     <div className="animate-new-element">
                         <br/><br/><br/>
 
                         <div className="texto-grande red-text center">
                             <strong> { error } </strong> 
                         </div>
 
                         <br/><br/><br/>
                     </div>
                 )}
             </Card>
             </Main>
         </div>
     )
 }