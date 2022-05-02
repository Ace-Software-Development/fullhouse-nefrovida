import { useState } from 'react';
import Tabla from '../components/Tabla'
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import FormColaborador from './FormColaborador'
import CardTitulo from '../components/CardTitulo'
import CardSubtitulo from '../components/CardSubtitulo'

function ConsultarInfPaciente() {
    const datos = [{nombre: "Eduardo", materno: "Pete", paterno: "Gil", sexo:"Hombre", rol: "Dueño de pepe", telefono:"4641063915", detalle:"http://store.steampowered.com/", correo: "xd@mo.com"},
             {nombre: "Quehuevos", materno: "lostuyos", paterno: "cocidos", sexo:"hHUEVOTES", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
          ,  {nombre: "xd", materno: "XD", paterno: "xd", sexo: "mucho", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "Manolo", materno: "coloreador", paterno: "crayola", sexo:"bieja wanga", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "Pepino", materno: "comes", paterno: "tu", sexo:"Mujer", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "Ant", materno: "Pineapple", paterno: "Pen", sexo:"Mujer", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "ElcheTeamleader", materno: "renuncio", paterno: "quehuevos", sexo:"Mujer", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "Daviiiiiid", materno: "lolsito", paterno: "viciado", sexo:"Mujer", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
,             {nombre: "Carro", materno: "tuneado", paterno: "rrom", sexo:"Mujer", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}

            ]

    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <CardTitulo icono="person" titulo="Pacientes"/>
            <CardSubtitulo subtitulo= "Pacientes"/>
            <Tabla datos= {datos}/>
            </Main>
        </div>
    )
}

export default ConsultarInfPaciente;
