/**
 * EditarPaciente:
 * Esta vista se utiliza para el trabajador social con la finalidad de registrar a un paciente. 
 * Se trata de un formulario con ciertos campos obligatorios.
 * 
 * Para la verificación en el front para los formularios utilizamos useEffect, useState y 
 * useForm de react-hook-form.
 * 
 * Para capturar los datos y mandarlos al onSubmit() también utilizamos useState, así como una
 * petición de tipo POST al servidor que se ejecuta al mismo tiempo que esta app web.
 */
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm';
import Input from '../components/Input';
import Datepicker from '../components/Datepicker';
import Select from '../components/Select';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { useForm } from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import { ReactSession } from 'react-client-session';

const EditarPaciente = () => {
    const [paciente, setPaciente] = useState([])
    const params = useParams();
    const id = params.curp;
    const [url, setUrl] = useState('/paciente/detalle/curp');
    
    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm();
    const { httpConfig, loading, responseJSON, error, message, responseOk } = useFetch(ReactSession.get("apiRoute") + url);

    
    /**
     * Hook que se ejecuta una sola vez al renderizar la aplicación por primera vez.
     */
    useEffect(() => {
        if (ReactSession.get('rol') !== 'trabajoSocial') {
            window.location.href = '/403';
        }
        // Armar petición GET
        httpConfig(id, 'GET');
        validation();
    }, []);

    /**
     * Función para realizar las validaciones necesarias para cada uno de los campos del paciente.
     */
    function validation() {

        // Variable para el nombre, requerido, con patrón.
        register('nombre', {
            required: {
                value: true,
                message: 'El nombre es requerido'
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: 'Nombre inválido'
            },
            maxLength: {
                value: 40,
                message: 'El nombre puede contener máximo 40 caracteres'
            },
        });

        // Variable para el apellido, requerido, con patrón.
        register('apellidoPaterno', {
            required: {
                value: true,
                message: 'El apellido paterno es requerido'
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: 'Nombre inválido'
            },
            maxLength: {
                value: 40,
                message: 'El apellidoPaterno puede contener máximo 40 caracteres'
            },
        });

        // Variable para el apellido materno, no requerido, con patrón.
        register('apellidoMaterno', {
            required: {
                value: false
            },
            pattern: {
                value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/,
                message: 'Nombre inválido'
            },
            maxLength: {
                value: 40,
                message: 'El apellidoMaterno puede contener máximo 40 caracteres'
            },
        });

        // Variable para la fecha de nacimiento, requerida, con patrón.
        register('fechaNacimiento', {
            required: {
                value: false
            },
            pattern: {
                value: /[0-9]+/,
                message: 'Fecha Inválida'
            }
        });

        // Variable para el sexo, requerido.
        register('sexo', {
            required: {
                value: true,
                message: 'El sexo es requerido'
            }
        });

        // Variable para el teléfono, no requerido y con longitud fija.
        register('telefono', {
            required: {
                value: false
            },
            minLength: {
                value: 10,
                message: 'El teléfono debe tener 10 digitos'
            },
            maxLength: {
                value: 10,
                message: 'El teléfono debe tener 10 digitos'
            },
        });

        // Variable para el correo, requerido y con patrón.
        register('correo', {
            required: {
                value: false,
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo inválido'
            },
            maxLength: {
                value: 70,
                message: 'El teléfono debe tener 10 digitos'
            },
        });

        // Variable para el curp, requerido y con patrón.
        register('curp', {
            required: {
                value: true,
                message: 'El CURP o folio es requerido'
            },
            minLength: {
                value: 4,
                message: 'El CURP debe tener 18 caracteres'
            },
            maxLength: {
                value: 18,
                message: 'El CURP o folio debe tener 18 caracteres máximo'
            },
        });

        // Variable para el peso, no requerido, con limites humanos.
        register('peso', {
            required: {
                value: false,
                message: 'El nombre es requerido'
            },
            max: {
                value: 700,
                message: '¿El peso es correcto?'
            },
            min: {
                value: 0.1,
                message: '¿El peso es correcto? '
            }
        });

        // Variable para el peso, no requerido, con limites humanos.
        register('estatura', {
            required: {
                value: false,
                message: 'El nombre es requerido'
            },

            max: {
                value: 275,
                message: '¿La estatura es correcta?'
            },
            min: {
                value: 20,
                message: '¿La estatura es correcta?'
            }

        });
    }


    /**
     * Función que se ejecuta cuando hay un cambio en el formulario, para actualizar el valor del campo que cambio
     * @param {event} e - Evento del cambio
     */
    const handleChange = (e) => {
        setValue(e.target.name, e.target.value);
    }


    /**
     * Función que se ejecuta al dar click en el botón de Guardar el paciente, para registrar el paciente en la
     * base de datos haciendo un fetch a la ruta de back.
     * @param {object} data - Datos del paciente en el formulario 
     * @param {evento} e - Evento para submit
     * @returns 
     */
    async function onSubmit(data, e) {
        // Cambiar los valores necesarios de string a número.
        if (data.estatura === "") {
            data.estatura = undefined;
        }
        else { data.estatura = Number(data.estatura); }
        
        if (data.peso === "") {
            data.peso = undefined;
        }
        else { data.peso = Number(data.peso); }
        
        if (data.telefono === "") {
            data.telefono = undefined;
        }
        else { data.telefono = Number(data.telefono); }

        // Se convierte la fecha a formato 'dd/mm/yyyy'
        if( data.fechaNacimiento){
            const dateSplit = data.fechaNacimiento.split('-');
            const year = dateSplit[0];
            const month = dateSplit[1];
            const day = dateSplit[2];
            data.fechaNacimiento = day +'/' + month + '/' + year;
        }
        
        e.preventDefault();

        httpConfig(data, 'POST');
    };


    /**
     * Hook que se ejecuta cada vez que el responseOk cambia, si no fue correcta la respuesta no
     * debe mostrar ningún mensaje. Si la respuesta es correcta muestra un toast con el mensaje 
     * y se redirige.
     */
    useEffect(() => {
        if (!responseJSON || !responseOk) {
            return;

        } else if(url === '/paciente/detalle/curp') {
            setPaciente(responseJSON.data.data)
            setUrl('/paciente/editar');
        }
        else if(url === '/paciente/editar'){

            M.toast({ html: responseJSON.message});
            setTimeout(() => {
                window.location.href = '/paciente/' + id;
            }, 1000);
        }
    }, [responseOk])

    /**
     * Se utiliza para hacer el render adecuado hasta que los datos ya existan.
     * @returns true si ya existen los datos, false si todavía no.
     */
    function pacienteExiste() {
        if (paciente.nombre !== undefined ){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Devuelve la fecha en formato YYYY-MM-DD para que el datepicker y el setValue no
     * marquen un error de formato y puedan visualizarse los datos guardados correctamente.
     * @returns fecha convertida en YYYY-MM-DD.
     */
    function convertirFecha() {
        if (paciente.fechaNacimiento !== undefined) {
            const dateString = paciente.fechaNacimiento;
            const date = "" + dateString.substring(6,10) + "-" + dateString.substring(3, 5) + "-" + dateString.substring(0,2)
            return date
        }
    }

    /**
     * Devuelve la fecha maxima para el datepicker, obtiene la fecha de hoy y le resta un día
     * para que no se puedan meter fechas a futuro de la fecha de <<< Hoy >>>.
     * @returns La fecha de <<< hoy >>> menos uno. YYYY-MM-DD
     */
    function obtenerFechaMax() {
        var hoy = new Date();
        hoy.setDate( hoy.getDate() - 1)

        return (hoy.getFullYear() + "-" + 
                ('0' + (hoy.getMonth()+1)).slice(-2) + "-" + 
                ('0' + hoy.getDate()).slice(-2));
    }


    return(
        <div>
            <Navbar/>
            <Main>
                <br></br>
                <Card>
                    <CardTitulo icono="edit" titulo="Editar Paciente"/>
                    <ContainerForm>
                    
                    <Link to = { "/paciente/" + paciente.curp }>
                        <BtnRegresar />
                    </Link>
                    
                    
                    <br/>
                    
                    {
                        loading &&
                        <div className="preloader-wrapper small active">
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
                    }
                    <br/><br/>

                    { pacienteExiste() ?
                    (
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <LineaCampos>
                            <Input 
                                id="nombre" 
                                label="Nombre" 
                                tamano="m4 s12"
                                onChange = { handleChange }
                                elError = { errors.nombre && errors.nombre?.message }
                                maxLength = "40"
                                requerido = { true }
                                isActive = { true }
                                defaultValue = { paciente.nombre }
                            />
                            {setValue("nombre", paciente.nombre)}
                            <Input 
                                id="apellidoPaterno" 
                                label="Apellido Paterno" 
                                tamano="m4 s12"
                                maxLength = "40"
                                onChange = { handleChange }
                                elError = { errors.apellidoPaterno && errors.apellidoPaterno?.message }
                                defaultValue = { paciente.apellidoPaterno }
                                isActive = { true }
                                requerido = { true }
                            />
                            {setValue("apellidoPaterno", paciente.apellidoPaterno)}
                            <Input 
                                id="apellidoMaterno" 
                                label="Apellido Materno" 
                                tamano="m4 s12"
                                maxLength = "40"
                                onChange = { handleChange }
                                defaultValue = { paciente.apellidoMaterno }
                                isActive = { paciente.apellidoMaterno ? true: false }
                                elError = { errors.apellidoMaterno && errors.apellidoMaterno?.message }
                            />
                            {setValue("apellidoMaterno", paciente.apellidoMaterno)}
                        </LineaCampos>
                        <LineaCampos>
                            <Datepicker 
                                id="fechaNacimiento" 
                                label="Fecha de nacimiento" 
                                tamano="s8 m4"
                                onChange = { handleChange }
                                defaultValue = {convertirFecha()}
                                elError= { errors.fechaNacimiento && errors.fechaNacimiento?.message }
                                max = {obtenerFechaMax()}
                                min = "1920-01-01"
                            />
                            {setValue("fechaNacimiento", convertirFecha())}
                            <Select 
                                id = "sexo" 
                                label = "Sexo"
                                value = { paciente.sexo }
                                arr = { [{ value: "masculino", option: "Masculino"}, {value: "femenino", option: "Femenino" }] }
                                handleChange = { handleChange }
                                elError = { errors.sexo && errors.sexo?.message }
                                requerido = { true }
                            />
                            {setValue("sexo", paciente.sexo)}
                            <Input 
                                id="telefono" 
                                label="Telefono" 
                                type="number"
                                tamano="s8 m4"
                                onChange={ handleChange }
                                min = "0"
                                maxLength = "10"
                                defaultValue = { paciente.telefono }
                                isActive = { paciente.telefono ? true : false }
                                elError = { errors.telefono && errors.telefono?.message }
                            />
                            {setValue("telefono", (paciente.telefono ? paciente.telefono : undefined))}
                        </LineaCampos>
                        <LineaCampos>
                            <Input 
                                id = "correo" 
                                label = "Correo electrónico" 
                                tamano = "s12 m4"
                                type = "email"
                                maxLength = "70"
                                onChange = { handleChange }
                                defaultValue = { paciente.email }
                                isActive = { paciente.email ? true : false }
                                elError = { errors.correo && errors.correo?.message }
                            />
                            {setValue("correo", paciente.email)}
                            <Input 
                                id = "curp" 
                                label = "CURP o Folio Nefrovida (🚫)" 
                                tamano = "s12 m4"
                                maxLength = "18"
                                onChange = { handleChange }
                                defaultValue = { paciente.curp }
                                isActive = { true }
                                elError = { errors.curp && errors.curp?.message }
                                requerido = { false }
                                disabled
                            />
                            {setValue("curp", paciente.curp)}
                            <Input 
                                id = "peso" 
                                label = "Peso (Kg)"
                                type = "number"
                                min = "0"
                                step=".1"
                                tamano = "s12 m2"
                                onChange = { handleChange }
                                defaultValue = { paciente.peso }
                                isActive = { paciente.peso ? true : false }
                                elError = { errors.peso && errors.peso?.message }
                            />
                            {setValue("peso", (paciente.peso ? paciente.peso : undefined))}
                            <Input 
                                id = "estatura" 
                                label = "Estatura (cm)" 
                                type = "number"
                                min = "0" 
                                tamano = "s12 m2" 
                                onChange = { handleChange }
                                defaultValue = { paciente.estatura }
                                isActive = { paciente.estatura ? true : false }
                                elError = { errors.estatura && errors.estatura?.message }
                            />
                            {setValue("estatura", (paciente.estatura ? paciente.estatura : undefined))}
                        </LineaCampos>
                        { error 
                            && <div> 
                                    <div className="red-text right"> 
                                        <strong> { error } </strong> 
                                    </div> 
                                    <br/><br/> 
                                </div>
                        }
                        { !loading && <BtnGuardar/>}
                        
                    </form>

                    ) :
                    <></>}

                    </ContainerForm>
                </Card>
            </Main>
        </div>
    )
}

export default EditarPaciente