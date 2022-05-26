/**
 * Registrar estudio:
 * Esta vista se utiliza para los químicos con la finalidad de registrar un estudio de un paciente.
 * Donde debemos de llenar ciertos parámetros.
 * 
 * Para la verificación en el front para los parámetros utilizamos useEffect, useState y useForm de
 * rect-hook-form.
 * 
 * Para capturar los datos y mandarlos al onSubmit() también utilizamos useState, así como una
 * petición de tipo POST al servidor que se ejecuta al mismo tiempo que esta app web.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import { EntradaParametroBool, EntradaParametroNum, EntradaParametroString } from '../components/EntradaParametro';
import { useForm } from 'react-hook-form';
import LineaParametros from '../components/LineaParametros';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';

export default function RegistrarEstudio({ idTipoEstudio, curp }) {

const [tipoEstudio, setTipoEstudio] = useState({});
const [parametros, setParametros] = useState([]);
const [errorFetch, setErrorFetch] = useState('');
const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch('http://localhost:6535/tipoEstudio/id');

/**
 * Función para realizar las validaciones necesarias para cada uno de los parámetros del estudio.
 */
function validation() {
    parametros.map(el => {
        // Variable para los parámetros, requerido.
        register( el.idParametro.objectId, {
            required: {
                value: true,
                message: "El valor de " + el.idParametro.nombre + " es requerido"
            },
        });
    })
    
    // Variable para las observaciones, no requerido.
    register('observaciones', {
        required: {
            value: false
        }
    });

    return;
}

/**
 * Función para agregar cada parámetro diferente dependiendo del tipo de estudio.
 */
function listaParametros() {
    return parametros.map(el => {
        let objectId = el.idParametro.objectId;
        if (el.idParametro.idTipoValor.nombre === 'Numérico'){
            return  <EntradaParametroNum 
                        id = { el.idParametro.objectId }
                        nombreParametro = { el.idParametro.nombre } 
                        valorMin = { el.idParametro.valorMin } 
                        valorMax = { el.idParametro.valorMax } 
                        unidad = { el.idParametro.unidad } 
                        codigo = { el.idParametro.codigo } 
                        key = { el.idParametro.objectId } 
                        handleChange = { handleChange } 
                        elError = { errors[objectId] && errors[objectId]?.message }
                    />
        }
        else if(el.idParametro.idTipoValor.nombre === 'Positivo/Negativo'){
            return <EntradaParametroBool 
                        id = { el.idParametro.objectId }
                        nombreParametro = { el.idParametro.nombre } 
                        valorBool ={ el.idParametro.valorBool } 
                        codigo = { el.idParametro.codigo } 
                        key = { el.idParametro.objectId } 
                        handleChange = { handleChange }
                        elError = { errors[objectId] && errors[objectId]?.message }
                    />
        }
        else if(el.idParametro.idTipoValor.nombre === 'Texto'){
            return <EntradaParametroString 
                        id = { el.idParametro.objectId }
                        nombreParametro = { el.idParametro.nombre } 
                        valorString = { el.idParametro.valorString } 
                        codigo = { el.idParametro.codigo } 
                        key = { el.idParametro.objectId } 
                        handleChange = { handleChange }
                        elError = { errors[objectId] && errors[objectId]?.message }
                    />
        }            
    })
    
}

/**
 * Función asíncrona para obtener la lista de parámetros del estudio. Si recibe una string
 * es para obtener los estudios cuyo nombre contengan dicha string.
 * @param {string} id - Datos del estudio con los parámetros
 * @returns 
 */
async function getTipoEstudio(id) {

    httpConfig(id, 'GET');
}

/**
 * Función que se ejecuta al dar click en el botón de Guardar el estudio, para registrar el paciente en la
 * base de datos haciendo un fetch a la ruta de back.
 * @param {object} data - Datos del estudio 
 * @param {evento} e - Evento para submit
 * @returns 
 */
async function onSubmit(data, e) {

    e.preventDefault();

    let { observaciones, ...rest } = data;
    let params = Object.entries(rest);

    let parametrosArr = [];
    for (let i = 0; i < params.length; i++) {
        let paramObj = {};
        paramObj['objectId'] = params[i][0];
        paramObj['valor'] = params[i][1];

        parametrosArr.push(paramObj);
    }

    let send = {
        fecha: fecha,
        observaciones: observaciones,
        idTipoEstudio: idTipoEstudio,
        curp: curp,
        parametros: parametrosArr
    }

    try {
        // Hacer fetch a la ruta de back, enviando la información del formulario.
        const response = await fetch('http://localhost:6535/estudio', { method: 'POST', body: JSON.stringify(send), headers: {'Content-Type': 'application/json'} });
        const estudio = await response.json();

        // Mostrar error en caso de ser necesario
        if (!response.ok) {
            setErrorSubmit(estudio.message);
            return;
        }
        // Mostrar mensaje de éxito y redireccionar a la página principal
        else {
            M.toast({ html: estudio.message });
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }

    } catch(error) {
        // Mostrar mensaje de error en la conexión con la base de datos.
        setIsLoading(false);
        setErrorSubmit("Error de conexión. Inténtelo de nuevo.");

    }
}

/**
 * Hook que se ejecuta al renderizar el tipo de estudio.
 */
useEffect(() => {
    getTipoEstudio(idTipoEstudio);
}, [])

/**
 * Hook que se ejecuta al renderizar los parámetros.
 */
useEffect(() => {
    if (ReactSession.get('rol') !== 'quimico') {
        window.location.href = '/';
    }
    if (parametros) {
        validation();
    }
}, [parametros]);

/**
 * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
 * @param {event} e - Evento del cambio
 */
const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
}


useEffect(() => {
    if (!responseJSON || !responseOk) {
        return
    } else {
        M.toast({ html: message });
        setTimeout(() => {
            window.location.href = '/';
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
            <br></br>    
            <Card>
            <CardTitulo icono="note_add" titulo="Registrar estudio"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/><br/><br/>
                </Link>
                { loading && (
                    <div className="center animate-new-element">
                        <br/>

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

                        <br/><br/>
                    </div>
                
                )}
                {
                    !isLoading && !errorFetch ?
                    <div className="loader-anim">
                        
                    
                    <div className="row div-detalles-estudio">
                        <div className="col s6 l6 left-align">
                            <div className="detalles-estudio">         
                            <div className="detalles-lista negrita-grande c-64646A left-align">{ tipoEstudio.nombre }  </div><span className='subrayado c-2E7EC8' >  { fecha } </span><br/>
                            <div className="detalles-lista light-pequeno c-908F98 left-align">{ tipoEstudio.descripcion }</div>
                            </div>
                        </div>
                    </div>
                    
                        
                        <div className='identificacion-registrar'/>

                        <form 
                            id = "registrar-estudio"
                            action = 'http://localhost:6535/estudio'
                            method = 'post'
                            onSubmit = { handleSubmit(onSubmit) }>
                            <LineaParametros>
                                { listaParametros()}
                            </LineaParametros>
                            
                            

                            <LineaCampos>
                                <div align="left">
                                <div className='detalles-usuario'>
                                <i className="material-icons icon-separator small c-000000">remove_red_eye</i><div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div><br/>
                                </div>
                                <Input 
                                    id="observaciones" 
                                    label="Ingresa aquí la observación del estudio" 
                                    tamano="m12 s12"
                                    onChange = { handleChange }/>
                                    </div>
                            </LineaCampos>
                            <br/>
                            <BtnGuardar form="registrar-estudio"/> 
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