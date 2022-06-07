import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useForm } from 'react-hook-form';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Input from '../components/Input';
import Select from '../components/Select';
import LineaCampos from '../components/LineaCampos';
import useFetch from '../hooks/useFetch';


export default function RegistrarNuevoParametro() {
    const urlGet = 'http://localhost:6535/parametro/tipoValor';
    const [url, setUrl] = useState(urlGet);
    const [tiposValor, setTiposValor] = useState([]);
    const [paramTipo, setParamTipo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(url);

    /**
     * Función para realizar las validaciones necesarias para cada uno de los campos del paciente.
     */
    function validation() {

        // Variable para el nombre, requerido
        register('nombre', {
            required: {
                value: true,
                message: 'El nombre es requerido'
            }
        });

        // Variable para el tipo de parámetro, requerido
        register('tipoParametro', {
            required: {
                value: true,
                message: 'El tipoParametro es requerido'
            }
        });

        // Variable booleana para el rango, requerido
        register('rango', {
            required: {
                value: true,
                message: 'Este campo es requerido'
            }
        });

        // Variable booleana para la unidad, no requerido
        register('unidad', {
            required: {
                value: false
            }
        });

        // Variable booleana para el código, no requerido
        register('codigo', {
            required: {
                value: false
            }
        });
    }


    /**
    * Hook que se ejecuta al renderizar, y obtiene los tipos de valor
    */
    useEffect(() => {
        if (ReactSession.get('rol') !== 'quimico') {
            window.location.href = '/403';
        }
        validation();
        getTiposValor();
    }, [])



    /**
     * Función asíncrona para obtener la lista de tipos de dato 
     * para desplegar en el select de tipo de parámetro.
     * @returns Lista con todos los tipos de dato.
     */
    async function getTiposValor() {
        console.log('get');
        httpConfig(null, 'GET');
    }
    
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;
        } else {
            if (url === urlGet) {
                setIsLoading(true);
                const data = responseJSON.data.data;
                let tipos = [];
                for (let i = 0; i < data.length; i++) {
                    const obj = {
                        value: data[i].objectId,
                        option: data[i]. nombre
                    }
                    tipos.push(obj);
                }
                setTiposValor(tipos);
            }
        }
    }, [responseOk])

    useEffect(() => {
        setIsLoading(false);
    }, [tiposValor])

    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        if (e.target.name === 'tipoParametro') {
            for (let i = 0; i < tiposValor.length; i++) {
                if (tiposValor[i].value === e.target.value) {
                    setParamTipo(tiposValor[i].option);
                }
            } 
        }
        console.log(e.target.name, e.target.value);
        setValue(e.target.name, e.target.value);
    }

    async function onSubmit(data, e) {
        e.preventDefault();

        console.log('data', data);
    }

    console.log(tiposValor);

    return(
        <div className="row ContainerForm left-align">

        <div>
            <Navbar/>
            <Main>
                <br/><br/><br/><br/><br/><br/><br/>    
                <Card>
                <CardTitulo titulo="Crear nuevo parámetro"/>
                    <ContainerForm>
                    <Link to = "/">
                    <BtnRegresar/>
                    <br/><br/>
                    </Link>
                    { 
                        loading || isLoading && 
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
                    }
                    {
                        !loading && !isLoading && !error ?
                        <form
                            id = "main-login"
                            //action = 'http://localhost:6535/colaboradores'
                            //method = 'post'
                            onSubmit = { handleSubmit(onSubmit) }
                            >
                            <LineaCampos>
                                <Input 
                                    id = "nombre" 
                                    label = "Nombre - Parámetro" 
                                    type="text"
                                    tamano = "m4 s12" 
                                    onChange = { handleChange }
                                    //elError = { errors.usuario && errors.usuario?.message }
                                    maxLength = "20"
                                    requerido = {true}
                                />
                                <Select 
                                    id = "tipoParametro" 
                                    label = "Tipo de parámetro" 
                                    tamano = "m4 s12"
                                    value = ""
                                    arr = { tiposValor }
                                    handleChange = { handleChange }
                                    //elError = { errors.sexo && errors.sexo?.message }
                                    requerido = { true }
                                />
                                <Select 
                                    id = "rango"  
                                    label = "¿Tiene rango?"
                                    value = ""
                                    tamano = "m4 s12"
                                    arr = { [{ value: true, option: "Verdadero"}, {value: false, option: "Falso" }] }
                                    handleChange = { handleChange }
                                    // elError = { errors.sexo && errors.sexo?.message }
                                    requerido = { true }
                                />

                            </LineaCampos>

                            <LineaCampos>
                                <Input 
                                    id = "unidad" 
                                    label = "Unidad" 
                                    tamano = "s12 m4"
                                    type = "text"
                                    maxLength = "10"
                                    min = "0"
                                    onChange = { handleChange }
                                    //elError = { errors.sexo && errors.sexo?.message }
                                    requerido = { false }
                                />
                                <Input 
                                    id = "codigo" 
                                    label = "Código" 
                                    type = "text"
                                    tamano = "s8 m4"
                                    onChange = { handleChange }
                                    maxLength = "10"
                                    min = "0"
                                    //elError = { errors.telefono && errors.telefono?.message }
                                />
                                {
                                    paramTipo === 'Numérico' &&
                                    <div>
                                        <Input 
                                            id = "valInicial" 
                                            label = "Valor inicial" 
                                            type = "number"
                                            tamano = "s12 m2"
                                            onChange = { handleChange }
                                            maxLength = "10"
                                            min = "0"
                                            //elError = { errors.telefono && errors.telefono?.message }
                                            requerido = { true }
                                        />
                                        <Input 
                                            id = "ValFinal" 
                                            label = "Valor final" 
                                            type = "number"
                                            tamano = "s12 m2"
                                            onChange = { handleChange }
                                            maxLength = "10"
                                            min = "0"
                                            //elError = { errors.telefono && errors.telefono?.message }
                                            requerido = { true }
                                        />
                                    </div>
                                }
                                {
                                    paramTipo === 'Texto' &&
                                    <Input 
                                            id = "valString" 
                                            label = "Valor de Referencia" 
                                            type = "text"
                                            tamano = "s12 m4"
                                            onChange = { handleChange }
                                            maxLength = "10"
                                            min = "0"
                                            //elError = { errors.telefono && errors.telefono?.message }
                                            requerido = { true }
                                        />
                                }
                                {
                                    paramTipo === 'Positivo/Negativo' &&
                                    <Select 
                                        id = "valorBool"  
                                        label = "Valor de Referencia"
                                        value = ""
                                        tamano = "m4 s12"
                                        arr = { [{ value: true, option: "Positivo"}, {value: false, option: "Negativo" }] }
                                        handleChange = { handleChange }
                                        // elError = { errors.sexo && errors.sexo?.message }
                                        requerido = { true }
                                    />

                                }
                                

                            </LineaCampos>
                            <BtnGuardar/>
                        </form>
                        : null
                    }            
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
    )
}