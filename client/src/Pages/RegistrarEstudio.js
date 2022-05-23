import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
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

export default function RegistrarEstudio({ idTipoEstudio, curp }) {

    const [tipoEstudio, setTipoEstudio] = useState({});
    const [parametros, setParametros] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [errorFetch, setErrorFetch] = useState('');
    const [errorSubmit, setErrorSubmit] = useState('');
    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm();
    
    function validation() {
        parametros.map(el => {
            register( el.idParametro.objectId, {
                required: {
                    value: true,
                    message: "El valor de " + el.idParametro.nombre + "es requerido"
                },
            });
        })
        
        register('observaciones', {
            required: {
                value: false
            }
        });
        return;
    }

    function listaParametros() {
        return parametros.map(el => {
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
                            elError = { errors.nombreParametro && errors.nombreParametro?.message }
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
                            elError = { errors.nombreParametro && errors.nombreParametro?.message }
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
                            elError = { errors.nombreParametro && errors.nombreParametro?.message }
                        />
            }            
        })
        
    }

    async function getTipoEstudio(id, e) {

        setIsLoading(true);
        setErrorFetch('');


        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/' + id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();
            setIsLoading(false);

            misDatos = misDatos.data.data;
            if (!response.ok) {
                setErrorFetch(misDatos.message);
                return;
            }

            setTipoEstudio(misDatos.pop());
            setParametros(misDatos);

        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }

    async function onSubmit(data, e) {
        console.log('hola', data);
        setIsLoading(true);
        setErrorFetch("");

        e.preventDefault();
    }

    useEffect(() => {
        getTipoEstudio(idTipoEstudio);
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.name, e.target.value);
    }


    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let fecha = cDay + "/" + cMonth + "/" + cYear ;

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
                    {
                        isLoading &&
                        <div class="preloader-wrapper small active">
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
                    }
                    {
                        !isLoading && !errorFetch ?
                        <div>
                            <div align="left">               
                                <div className="detalles-lista negrita-grande c-64646A left-align">{ tipoEstudio.nombre }  </div><span className='subrayado c-2E7EC8' >  { fecha } </span><br/>
                                <div className="detalles-lista light-pequeno c-908F98 left-align">{ tipoEstudio.descripcion }</div>
                            </div>
                            <br/>
                            <div className='identificacion-registrar'/>
                            <br/>

                            <form 
                                id = "registrar-estudio"
                                action = 'http://localhost:6535/estudio'
                                method = 'post'
                                onSubmit = { handleSubmit(onSubmit) }>
                                <LineaCampos>
                                    { listaParametros()}
                                </LineaCampos>
                                
                                <div className='identificacion-registrar'/>
                                <br/>

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
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }