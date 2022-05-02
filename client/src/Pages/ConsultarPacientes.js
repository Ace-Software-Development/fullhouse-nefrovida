import { useEffect, useState } from 'react';
import Tabla from '../components/TablaPacientes'
import CardTitulo from '../components/CardTitulo'
import CardSubtitulo from '../components/CardSubtitulo'

function ConsultarPacientes() {
    const [isLoadind, setIsLoading] = useState(true)
    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        getPacientes();
    }, [])

    async function getPacientes(){
        const response = await fetch('http://localhost:6535/paciente', {method: 'GET', headers: {'Content-Type': 'application/json'}})
        const listaPacientes = await response.json()
        setIsLoading(false)
        if(!response.ok) {
            window.alert(listaPacientes.message);
            return;
        }
        setPacientes(listaPacientes.data.data)
        console.log(pacientes)
    }

    return (
        <div>
            <br/><br/>
            <CardTitulo icono="person" titulo="Pacientes"/>
            <CardSubtitulo subtitulo= "Pacientes"/>
            { isLoadind ?  <div>Cargando...</div> : <Tabla datos= {pacientes}/>}
            
        </div>
    )
}

export default ConsultarPacientes;
