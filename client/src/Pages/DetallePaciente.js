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
import ContenidoDetallesPx from '../components/ContenidoDetallesPx';


function DetallePaciente() {
    // Se obtiene la curp de los parámetros de front
    let { curp } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [paciente, setPaciente] = useState({});
    const [errorFetch, setErrorFetch] = useState('');


    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        getPaciente();
    }, [])


    /**
     * Función asíncrona para obtener la información del paciente.
     * @returns 
     */
    async function getPaciente() {
        setErrorFetch('');
        try {
            // Fetch a la ruta de back para obtener la información, se añade la curp del paciente a buscar
            const response = await fetch('http://localhost:6535/paciente/detalle/' + curp, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const detallePaciente = await response.json();
            setIsLoading(false);

            // Mostrar error en caso de ser necesario
            if(!response.ok) {
                setErrorFetch(detallePaciente.message);
                return;
            }
            // Guardar los datos en el detallePaciente para desplegarlos.
            setPaciente(detallePaciente.data.data);
        } catch(e) {
            // Mostrar mensaje de error en la conexión con la base de datos.
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }


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
                <CardTitulo icono="person" titulo="Detalle de paciente"/>
                { isLoading && (
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
                { !isLoading && !errorFetch && <div className="loader-anim"><ContenidoDetallesPx paciente={ paciente }/></div>}
                { errorFetch && (
                    <div className="animate-new-element">
                        <br/><br/><br/>

                        <div className="texto-grande red-text center">
                            <strong> { errorFetch } </strong> 
                        </div>

                        <br/><br/><br/>
                    </div>
                )}
            </Card>
            </Main>
        </div>
    )
}

export default DetallePaciente;