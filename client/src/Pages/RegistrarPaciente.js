import { useState } from 'react'
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm'
import Input from '../components/Input'
import Datepicker from '../components/Datepicker';
import Select from '../components/Select'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import useFormulario from '../hooks/useFormulario'
import validarRegistrarPaciente from '../util/validators/validarRegistrarPaciente'

const RegistrarPaciente = () => {
    let submitted = false

    const [formulario, handleChange, reset, errors] = useFormulario({
        curp: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        telefono: null,
        correo: '',
        sexo: '',
        estatura: null,
        peso: null,
    }, validarRegistrarPaciente)

    //const [errors, setErrors] = useState({})

    async function handleSubmit (e) {
        formulario.estatura = Number(formulario.estatura)
        formulario.peso = Number(formulario.peso)
        formulario.telefono = Number(formulario.telefono)
        formulario.fechaNacimiento = String(formulario.fechaNacimiento)

        e.preventDefault()
        const response = await fetch('http://localhost:6535/paciente', { method: 'POST', body: JSON.stringify(formulario), headers: {'Content-Type': 'application/json'} })
        const paciente = await response.json()
        if(!response.ok) {
            window.alert(paciente.message);
            return;
        }
        else {
            window.alert(paciente.message);
        }
        console.log(paciente)

        
    }

    return(
        <div>
            <Navbar/>
            <Main>
                <br></br>
                <Card>
                    <CardTitulo icono="person_add" titulo="Registrar Paciente"/>
                    <ContainerForm>
                    <BtnRegresar url="/"/><br/><br/>
                    <form onSubmit={handleSubmit}>
                        <LineaCampos>
                            <Input 
                                id="nombre" 
                                label="Nombre" 
                                value={formulario.nombre}
                                onChange={handleChange}
                                tamano="m4 s12"/>
                            { errors.nombre 
                                ? <p>Nombre requerido</p>
                                : null}
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
                        </LineaCampos>
                        <LineaCampos>
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
                                type="number"
                                value={formulario.telefono}
                                onChange={handleChange}
                                tamano="s8 m4"/>
                        </LineaCampos>
                        <LineaCampos>
                            <Input 
                                id="correo" 
                                label="Correo electrónico" 
                                value={formulario.correo}
                                onChange={handleChange}
                                tamano="s12 m4"
                                type="email"/>
                            <Input 
                                id="curp" 
                                label="curp" 
                                value={formulario.curp}
                                onChange={handleChange}
                                tamano="s12 m4"/>
                            <Input 
                                id="peso" 
                                label="Peso"
                                type="number"
                                value={formulario.peso}
                                onChange={handleChange} 
                                tamano="s12 m2"/>
                            <Input 
                                id="estatura" 
                                label="Estatura" 
                                type="number"
                                value={formulario.estatura}
                                onChange={handleChange}
                                tamano="s12 m2" />
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