import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import { useForm } from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import { useParams } from 'react-router-dom';
import InputTextArea from '../components/InputTextArea';

export default function RegistrarResumenConsulta() {

    const params = useParams();
    const curp = params.curp;
    const [isLoading, setIsLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm();
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + '/consulta/registrar');

    
    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        if (ReactSession.get('rol') !== 'doctor' 
        && ReactSession.get('rol') !== 'nutriologo'
        && ReactSession.get('rol') !== 'psicologo') {
            window.location.href = '/403';
        }
        // Variable para la consulta requerida.
        register('consulta', {
            required: {
                value: true,
                message: 'La consulta es requerida'
            },
        });
    }, []);


    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        setValue(e.target.name, e.target.value);
    }


    /**
     * Función que se ejecuta al dar click en el botón de Guardar el resumen de consulta, para registrar el resumen de consulta
     * en la base de datos haciendo un fetch a la ruta de back.
     * @param {object} data - Datos de la consulta en el formulario 
     * @param {evento} e - Evento para submit
     * @returns 
     */
    async function onSubmit(data, e) {

        e.preventDefault();

        let { consulta } = data;

    console.log()
        const usuario = ReactSession.get("usuario");
        let send = {
        usuario: usuario,
        fecha: fecha,
        notas: consulta,
        curp: curp,
    }

        httpConfig(send, 'POST');
        console.log(send)
    };

    /**
     * Hook que se ejecuta cada vez que el responseOk cambia, si no fue correcta la respuesta no
     * debe mostrar ningún mensaje. Si la respuesta es correcta muestra un toast con el mensaje 
     * y se redirige.
     */
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return
        } else {
            M.toast({ html: message });
            setIsLoading(true);
            setTimeout(() => {
                window.location.href = '/paciente/' + params.curp;
            }, 1000);
        }
    }, [responseOk])

    // Variables para sacar la fecha actual.
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let fecha = cDay + "/" + cMonth + "/" + cYear;


return(
    <div className="row ContainerForm left-align">

    <div>
        <Navbar/>
        <Main>
            <br/><br/><br/><br/><br/> 
            <Card>
            <CardTitulo icono="note_add" titulo="Registrar resumen de consulta"/>
                <ContainerForm>
                <Link to = "/paciente/:curp">
                    <BtnRegresar/>
                </Link>
                <div className='subrayado c-000000 right-align'>  { fecha } </div><br/><br/>
                { loading && !isLoading && (
                    <div className="center animate-new-element">
                        <br/>

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

                        <div className="texto-grande blue-text text-darken-1">Cargando...</div>

                        <br/><br/>
                    </div>

                )}
                {
                    !loading && !isLoading && !error ?
                    <div className="loader-anim">

                        <form onSubmit={ handleSubmit(onSubmit) }>
                        <LineaCampos>
                                <br/>
                                <div align="left">
                                <InputTextArea 
                                    id="consulta" 
                                    label="Escribe las notas de la consulta aquí" 
                                    type="text"
                                    maxLength="500"
                                    tamano="m12 s12"
                                    onChange = { handleChange }
                                    elError = { errors.consulta && errors.consulta?.message }
                                    />
                                </div>
                        </LineaCampos>
                        <br/><br/>
                            <BtnGuardar/> 
                        </form>
                        </div>
                    : null
                }
                { error && (
                    <div className="animate-new-element">
                        <br/><br/>

                        <div className="texto-grande red-text center">
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