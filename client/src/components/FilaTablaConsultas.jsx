import {Link} from 'react-router-dom'

const FilaTablaConsultas = ({ consulta, idPaciente }) => {
    const route = "/consulta/" + idPaciente + "/resumen/" + consulta.objectId

    return(
        <tr>
            <td className="tabla-padding-dos">
                <a href = { route }  >
                    { consulta.fecha }
                </a>
            </td>
            
            <td  >
                <a className="limitador-texto" href = { route }>
                    { consulta.notas }
                </a>
            </td>

            <td  >
                <a href = { route }>
                    { consulta.idUsuario.nombre + " " + consulta.idUsuario.apellidoPaterno} 
                </a>
            </td>
            
            <td className="center">
                <Link to = { route }>
                    <i className="material-icons">
                    insert_drive_file
                    </i>
                </Link>
            </td>
        </tr>
    )
}

export default FilaTablaConsultas