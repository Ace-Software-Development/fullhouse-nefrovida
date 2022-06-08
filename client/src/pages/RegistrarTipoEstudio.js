import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import Select from '../components/Select';
import BtnGuardar from '../components/BtnGuardar';
import BtnAnadirParametro from '../components/BtnAnadirParametro';
import BtnEditRegis from '../components/BtnEditRegis';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import { useForm } from 'react-hook-form';
import { Multiselect } from 'multiselect-react-dropdown';


export default function RegistrarTipoEstudio() {

    const [url, setUrl] = useState('/parametro/todos');
    const { httpConfig, loading, responseJSON, error, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();

    const [parametros, setParametros] = useState([]);
    const [options, setOptions] = useState([{}]);




    useEffect(() => {
        httpConfig(null, 'GET')

        // Variable para el nombre, requerido, con patrón.
        register('nombre', {
            required: {
                value: true,
                message: "El nombre es requerido"
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: "Nombre inválido"
            }
        });
        // Variable para el descripcion, requerido, con patrón.
        register('descripcion', {
            required: {
                value: true,
                message: "La descripción es requerida"
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: "Descripcion inválida"
            }
        });
        // Variable para los paramteros, requerido.
        register('parametros', {
            required: {
                value: true,
                message: "Debes seleccionar al menos un parametro"
            }
        });

    }, [])

    useEffect(() => {
        if(responseOk){
            const parametrosTemp = [];
            responseJSON.data.data.map((el)=>{
                parametrosTemp.push({value: el.objectId , option : el.nombre })
            });
            setParametros(parametrosTemp);

            if (url !=='/tipoEstudio/registrar' ){
                setUrl('/tipoEstudio/registrar');
            }
            else{
                //set data
            }
        }


    },[responseOk])

    function parametrosExisten() {
        if (parametros[1] !== undefined ){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value,"handle change")
        setValue(e.target.name, e.target.value);
    }

    async function onSubmit(data, e) {
        console.log (data, "sumbmit")
        e.preventDefault();
        //httpConfig(data,'POST');
    }

return(
    <div className="row ContainerForm left-align">

    <div>
        <Navbar/>
        <Main>
            <br></br>
            <Card>
            <CardTitulo icono="note_add" titulo="Registrar tipo de estudio"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/>
                </Link>
                <BtnEditRegis icono="format_list_numbered" texto="Registrar parámetro"/>
                <br/><br/>
                { /*isLoading && (
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

                )*/}
                {
                    //!isLoading && !errorFetch ?
                    <div className="on-load-anim">
                        <form
                        id = "registar-tipo-estudio"
                        action = '/tipoEstudio/registrar'
                        method = 'post'
                        onSubmit = { handleSubmit(onSubmit) }>
                            <LineaCampos>
                                    <div align="left">
                                    <div className='detalles-usuario'>
                                    <div className="detalles-lista negrita-grande c-64646A left-align"> Información:</div><br/>
                                    </div>
                                    </div>
                                    <br/>
                                    <Input
                                        id="nombre"
                                        label="Nombre"
                                        tamano="m4 s12"
                                        onChange = { handleChange }
                                        />
                                    <Input
                                        id="descripcion"
                                        label="Descripción"
                                        tamano="m6 s12"
                                        onChange = { handleChange }
                                        />
                                    <Input
                                        id="codigo"
                                        label="Codigo"
                                        tamano="m2 s12"
                                        onChange = { handleChange }
                                        />
                            </LineaCampos>
                            <div className='identificacion-registrar'/>
                            <br/>
                            <LineaCampos>
                                    <div align="left">
                                    <div className='detalles-usuario'>
                                    <div className="detalles-lista negrita-grande c-64646A left-align"> Parámetros:</div><br/>
                                    </div>
                                    </div>
                                    <br/>
                                    { parametrosExisten ? 
                                    <Multiselect 
                                    id="parametros"
                                    options={parametros}
                                    displayValue="option" 
                                    onChange ={ handleChange }
                                    />
                                    :<></>

                                    }
                                    
                                    

                            </LineaCampos>
                            <div className='identificacion-registrar'/>
                            <br/>
                            <BtnAnadirParametro/>
                            {/* { console.log("numParametros", numParametros) } */}
                            <br/><br/><br/><br/><br/><br/>
                            <BtnGuardar form="registar-tipo-estudio"/>
                        </form>
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