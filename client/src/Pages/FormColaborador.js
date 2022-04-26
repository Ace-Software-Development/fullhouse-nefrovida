import { useState } from 'react';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import Form from '../components/Form';
import Input from '../components/Input'
import Datepicker from '../components/Datepicker';
import Select from '../components/Select'
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';

const FormColaborador = () => {
    
    const [datos, setDatos] = useState({
        usuario: '',
        nombre: '',
        paterno: '',
        materno: '',
        nacimiento: '',
        sexo: '',
        correo: '',
        password: '',
        confpassword: ''
    })

    const handleInputChange = (e) =>{
        console.log('funciona')
    }
    
    return(
        <Card>
        <CardTitulo icono="person_add" titulo="Registrar Empleado"/>
        <ContainerForm>
          <BtnRegresar/><br/><br/>
          <form>
            <LineaCampos>
              <div class="input-field col m3 s12">
                        <input id="usuario" type="text" className="validate z-depth-1"/>
                        <label for="usuario">Usuario</label>
              </div>
              <div class="input-field col m3 s12">
                        <input id="nombre" type="text" className="validate z-depth-1"/>
                        <label for="nombre">Nombre</label>
              </div>
              <div class="input-field col m3 s12">
                        <input id="paterno" type="text" className="validate z-depth-1"/>
                        <label for="paterno">Apellido Paterno</label>
              </div>
              <div class="input-field col m3 s12">
                      <input id="materno" type="text" className="validate z-depth-1"/>
                      <label for="materno">Apellido Materno</label>
              </div>
              <div class="input-field col s8 m4">
                      <input id="nacimiento" type="text" class="datepicker z-depth-1"/>
                      <label for="nacimiento">Fecha de nacimiento</label>
              </div>
              <div class="input-field col s4 m2">
                <select id="sexo">
                  <option value="" disabled selected></option>
                  <option value="1">Hombre</option>
                  <option value="2">Mujer</option>
                </select>
                <label>Sexo</label>
              </div>
              <div class="input-field col m4 s8">
                      <input id="materno" type="text" className="validate z-depth-1"/>
                      <label for="materno">Apellido Materno</label>
              </div>
              <div class="input-field col s4 m2">
                <select id="rol">
                  <option value="" disabled selected></option>
                  <option value="1">Hombre</option>
                  <option value="2">Mujer</option>
                </select>
                <label>Rol</label>
              </div>
              <div class="input-field col s12 m4">
                      <input id="correo" type="email" class="validate z-depth-1"/>
                      <label for="correo">Correo electrónico</label>
              </div>
              <div class="input-field col s12 m4">
                      <input id="password" type="password" class="validate z-depth-1"/>
                      <label for="password">Contraseña</label>
              </div>
              <div class="input-field col s12 m4">
                      <input id="confpassword" type="password" class="validate z-depth-1"/>
                      <label for="confpassword">Confirmar contraseña</label>
              </div>
            </LineaCampos>
          <BtnGuardar/>
          </form>
        </ContainerForm>
      </Card>
    )
}

export default FormColaborador

/* <Input id="usuario" label="Usuario" tamano="m3 s12" handleInputChange/>
<Input id="nombre" label="Nombre" tamano="m3 s12"/>
<Input id="paterno" label="Apellido Paterno" tamano="m3 s12"/>
<Input id="materno" label="Apellido Materno" tamano="m3 s12"/>
<Datepicker id="nacimiento" label="Fecha de nacimiento" tamano="s8 m4"/>
<Select id="sexo" label="Sexo" arr={["Hombre", "Mujer", "Uganga", "Unu"]}/>
<Input id="telefono" label="Telefono" tamano="s8 m4"/>
<Select id="rol" label="Rol" arr={["Activo", "Pasivo", "a"]}/>
<Input id="correo" label="Correo electrónico" tamano="s12 m4"/>
<Input id="password" label="Contraseña" tamano="s12 m4" tipo="password"/>
<Input id="confpassword" label="Confirmar contraseña" tamano="s12 m4" tipo="password"/> */