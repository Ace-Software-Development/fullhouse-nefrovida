import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm'
import Input from '../components/Input'
import Datepicker from '../components/Datepicker';
import Select from '../components/Select'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Navbar from './Navbar';
import Main from '../components/Main'
import useFormulario from '../hooks/useFormulario'

const RegistrarPaciente = () => {

    const [formulario, handleChange, reset] = useFormulario({
        curp: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        telefono: '',
        correo: '',
        sexo: '',
        estatura: '',
        peso: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/paciente', { method: 'POST', body: formulario })
    }

    return(
        <div>
            <Navbar/>
            <Main>
                <br></br>
                <Card>
                    <CardTitulo icono="person_add" titulo="Registrar Paciente"/>
                    <ContainerForm>
                    <BtnRegresar/><br/><br/>
                    <form>
                        <LineaCampos>
                        <Input 
                            id="nombre" 
                            label="Nombre" 
                            value={formulario.nombre}
                            onChange={handleChange}
                            tamano="m4 s12"/>
                        <Input 
                            id="apellidoPaterno" 
                            label="Apellido Paterno" 
                            value={formulario.apellidoPaterno}
                            onChange={handleChange}
                            tamano="m4 s12"/>
                        <Input 
                            id="apellidoMaterno" 
                            label="Apellido Materno" 
                            value={formulario.apellidoMaterno}
                            onChange={handleChange}
                            tamano="m4 s12"/>
                        <Datepicker 
                            id="fechaNacimiento" 
                            label="Fecha de nacimiento" 
                            value={formulario.fechaNacimiento}
                            onChange={handleChange}
                            tamano="s8 m4"/>
                        <Select 
                            id="sexo" 
                            label="Sexo" 
                            handleChange={handleChange}
                            value={formulario.sexo}
                            arr={[{value: "masculino", option: "Masculino"}, {value: "femenino", option: "Femenino"}]}/>
                        <Input 
                            id="telefono" 
                            label="Telefono" 
                            value={formulario.telefono}
                            onChange={handleChange}
                            tamano="s8 m4"/>
                        <Input 
                            id="correo" 
                            label="Correo electrónico" 
                            value={formulario.correo}
                            onChange={handleChange}
                            tamano="s12 m4"/>
                        <Input 
                            id="curp" 
                            label="curp" 
                            value={formulario.curp}
                            onChange={handleChange}
                            tamano="s12 m4"/>
                        <Input 
                            id="peso" 
                            label="Peso"
                            value={formulario.peso}
                            onChange={handleChange} 
                            tamano="s12 m2" 
                            type="text"/>
                        <Input 
                            id="estatura" 
                            label="Estatura" 
                            value={formulario.estatura}
                            onChange={handleChange}
                            tamano="s12 m2" 
                            type="text"/>
                        </LineaCampos>
                        <BtnGuardar/>
                    </form>
                    </ContainerForm>
                </Card>
            </Main>
        </div>
    )
}

export default RegistrarPaciente