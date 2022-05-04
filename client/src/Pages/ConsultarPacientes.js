import { useEffect, useState } from 'react';
import Tabla from '../components/TablaPacientes'
import Card from '../components/Card'
import CardTitulo from '../components/CardTitulo'
import CardSubtitulo from '../components/CardSubtitulo'
import InputSearch from '../components/InputSearch'

function ConsultarPacientes() {
    const [isLoadind, setIsLoading] = useState(true)
    const [pacientes, setPacientes] = useState([])
    const [buscar, setBuscar] = useState("")

    useEffect(() => {
        getPacientes();
    }, [])

    async function getPacientes() {
        const response = await fetch('http://localhost:6535/paciente', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        const listaPacientes = await response.json()
        setIsLoading(false)
        if(!response.ok) {
            window.alert(listaPacientes.message);
            return;
        }
        setPacientes(listaPacientes.data.data)
        console.log(pacientes)
    }

    function handleChange(e) {
        setBuscar(e.target.value)
    }

    console.log(buscar)

    return (
        <div>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Pacientes"/>
                <CardSubtitulo subtitulo= "Pacientes">
                    <InputSearch
                        id = "buscar"
                        label = "Buscar"
                        value = { buscar }
                        onChange = { handleChange }
                    />
                </CardSubtitulo>
                { isLoadind ?  <div> Cargando... </div> : <Tabla datos= { pacientes }/>}
            </Card>
        </div>
    )
}

export default ConsultarPacientes;
