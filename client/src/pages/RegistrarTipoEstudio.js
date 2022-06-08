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


export default function RegistrarTipoEstudio() {

    const [url, setUrl] = useState('/parametro/todos');
    const { httpConfig, loading, responseJSON, error, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();

    const [parametros, setParametros] = useState([]);

    const [primerParametro, setPrimerParametro] = useState(false);

    const [numParametros, setNumParametros] = useState(1);

    const[ selectValues, setSelectValues]=  useState([]);


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
   * setContext
   * @description Saves selected worker and part in variables
   * @param id: id of the worker or part
   * @param type: specifies if the id is a worker or part
   */
    function setContext(num) {
        setNumParametros(num);
        selectValues.push({});
    }

    function agregarParametrosCampos() {
        console.log("here")

        let selectsParams = []
        for (let i = 0; i < numParametros; i += 3) {
            if (parametrosExisten()) {
                selectsParams.push(
                    <div className = "row">
                        <div className="col s12 m4">
                            <Select
                            id={"parametro_" + i}
                            label="Parámetro"
                            tamano="m12 s12"
                            value={ selectValues[i] === {} ? "" : selectValues[i]}
                            arr={ parametros }
                            handleChange = { handleChange }
                            //elError = { errors.sexo && errors.sexo?.message }
                            requerido = { primerParametro }
                            />
                        </div>
                        { i +1 < numParametros ?
                            <div className="col s12 m4">
                                <Select
                                id={"parametro_" + (i+1)}
                                label="Parámetro"
                                tamano="m12 s12"
                                value={ selectValues[i+1]}
                                arr={ parametros }
                                handleChange = { handleChange }
                                //elError = { errors.sexo && errors.sexo?.message }
                                requerido = { primerParametro }
                                />
                            </div>
                            :
                            <></>
                        }
                        { i +2 < numParametros ?
                            <div className="col s12 m4">
                                <Select
                                id={"parametro_" + (i+2)}
                                label="Parámetro"
                                tamano="m12 s12"
                                value={ selectValues[i+2]}
                                arr={ parametros }
                                handleChange = { handleChange }
                                //elError = { errors.sexo && errors.sexo?.message }
                                requerido = { primerParametro }
                                />
                            </div>
                            :
                            <></>
                        }

                    </div>



                );
            }
            else return(<></>)
        }
        return selectsParams;
    }

    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        const selected ={ option : e.target.options[e.target.selectedIndex].text, value:e.target.value };
        const index = e.target.id.split('_')[1];
        updateSelectValues(selected,index)

        console.log(selectValues);
        if(e.target.name === "parametro" && !primerParametro){
            setPrimerParametro(true);
        }
        setValue(e.target.name, e.target.value);
    }

    async function onSubmit(data, e) {
        e.preventDefault();
        httpConfig(data,'POST');
    }

    async function updateSelectValues(data, index) {
        console.log(selectValues,"update");
        const tempSelectedValues = selectValues;
        tempSelectedValues[index] = data
        setSelectValues(tempSelectedValues)
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
                        id = "registar-colaborador"
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
                                        //onChange = { handleChange }
                                        />
                                    <Input
                                        id="descripcion"
                                        label="Descripción"
                                        tamano="m6 s12"
                                        //onChange = { handleChange }
                                        />
                                    <Input
                                        id="codigo"
                                        label="Codigo"
                                        tamano="m2 s12"
                                        //onChange = { handleChange }
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
                                    { agregarParametrosCampos() }

                            </LineaCampos>
                            <div className='identificacion-registrar'/>
                            <br/>
                            <BtnAnadirParametro
                                onClickAction={(num) => {
                                    setContext(num);
                                }}
                                numParameter={ numParametros } />
                            {/* { console.log("numParametros", numParametros) } */}
                            <br/><br/><br/><br/><br/><br/>
                            <BtnGuardar form="registrar-estudio"/>
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