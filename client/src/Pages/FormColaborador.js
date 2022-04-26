import { useState } from 'react';
import Card from '../components/Card';
import CardTitulo from '../components/CardTitulo';
import Input from '../components/Input'
import Datepicker from '../components/Datepicker';
import Select from '../components/Select'
import LineaCampos from '../components/LineaCampos';
import ContainerForm from '../components/ContainerForm'
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';

const FormColaborador = () => {
    
    return(
        <Card>
        <CardTitulo icono="person_add" titulo="Registrar Empleado"/>
        <ContainerForm>
          <BtnRegresar/><br/><br/>
          <form>
            <LineaCampos>
              <Input id="usuario" label="Usuario" tamano="m3 s12" handleInputChange/>
              <Input id="nombre" label="Nombre" tamano="m3 s12"/>
              <Input id="paterno" label="Apellido Paterno" tamano="m3 s12"/>
              <Input id="materno" label="Apellido Materno" tamano="m3 s12"/>
            </LineaCampos>
            <LineaCampos>
              <Datepicker id="nacimiento" label="Fecha de nacimiento" tamano="s8 m4"/>
              <Select id="sexo" label="Sexo" arr={["Hombre", "Mujer", "Uganga", "Unu"]}/>
              <Input id="telefono" label="Telefono" tamano="s8 m4"/>
              <Select id="rol" label="Rol" arr={["Activo", "Pasivo", "a"]}/>
            </LineaCampos>
            <LineaCampos>
              <Input id="correo" label="Correo electrónico" tamano="s12 m4"/>
              <Input id="password" label="Contraseña" tamano="s12 m4" tipo="password"/>
              <Input id="confpassword" label="Confirmar contraseña" tamano="s12 m4" tipo="password"/>
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