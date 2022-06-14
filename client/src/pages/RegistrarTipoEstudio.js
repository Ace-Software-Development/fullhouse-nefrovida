import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import BtnEditRegis from '../components/BtnEditRegis';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';
import { useForm } from 'react-hook-form';
import { Multiselect } from 'multiselect-react-dropdown';
import M from "materialize-css/dist/js/materialize.min.js";


export default function RegistrarTipoEstudio() {
    const [url, setUrl] = useState('/parametro/todos');
    const [parametros, setParametros] = useState([]);
    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
    const { httpConfig, loading, responseJSON, error, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

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
                value:true,
                message: "Debes seleccionar al menos un parametro"
            }
        });

    }, [])

    useEffect(() => {
        if(responseOk && url !=='/tipoEstudio/registrar' ){
            const parametrosTemp = [];
            responseJSON.data.data.map((el)=>{
                parametrosTemp.push({value: el.objectId , option : el.nombre })
            });
            setParametros(parametrosTemp);
            setUrl('/tipoEstudio/registrar');
        }
        else if (responseOk){
            setIsLoading(true);
            M.toast({ html: responseJSON.message});
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
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
        setValue(e.target.name, e.target.value);
    }

    /**
     * Función que se ejecuta cuando se selecciona un parametro
     * @param selectedList - lista de parametros seleccionados
     * @param selectedItem - item del parametro seleccionado
     */
    function onSelect(selectedList, selectedItem) {
        setValue("parametros", selectedList)
    }

    /**
     * Función que se ejecuta cuando se elimina un parametro
     * @param selectedList - lista de parametros seleccionados
     * @param selectedItem - item del parametro borrado
     */
    function onRemove(selectedList, removedItem) {
        setValue("parametros", selectedList)
    }

    async function onSubmit(data, e) {
        e.preventDefault();
        httpConfig(data,'POST');
        setValue("nombre", null)
        setValue("descripcion", null)
        setValue("parametros", null)
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
                <br/><br/>
                { loading || isLoading && (
                    <div className="center">
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
                        <div className="texto-grande blue-text text-darken-1">Cargando formulario</div>
                        <br/><br/><br/>
                    </div>

                ) }
                {
                    (!loading && !isLoading && !error) ?
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
                                        maxLength="35"
                                        onChange = { handleChange }
                                        elError ={ errors.nombre && errors.nombre?.message}
                                        requerido = { true }
                                        />
                                    <Input
                                        id="descripcion"
                                        label="Descripción"
                                        tamano="m6 s12"
                                        onChange = { handleChange }
                                        elError ={ errors.descripcion && errors.descripcion?.message}
                                        requerido = { true }
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
                            <Link to="/registrarParametro">
                                <BtnEditRegis icono="format_list_numbered" texto="Registrar parámetro" type="button"/>
                            </Link>
                            <LineaCampos>
                                    <div align="left">
                                    <div className='detalles-usuario'>
                                    <div className="detalles-lista negrita-grande c-64646A left-align"> Parámetros: </div><br/>
                                    </div>
                                    </div>
                                    <br/>
                                    { parametrosExisten ?
                                    <div>
                                        <Multiselect
                                            id="parametros"
                                            options={parametros}
                                            displayValue="option"
                                            onChange ={ handleChange }
                                            onSelect={ onSelect }
                                            onRemove={ onRemove }
                                            closeIcon="cancel"
                                        />
                                        <span className="helper-text left red-text">
                                            { errors.parametros && errors.parametros?.message }
                                        </span>
                                    </div>
                                    :<></>
                                }
                            <br/>
                            </LineaCampos>
                            <div className='identificacion-registrar'/>
                            <BtnGuardar/>
                        </form>
                    </div>

                    :
                    error && (
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