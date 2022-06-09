import {Link} from 'react-router-dom'


const FilaTablaConsultas = ({ consulta, idPaciente }) => {
    const route = "/consulta/" + idPaciente + "/resumen/" + consulta.objectId

    return(
        <tbody>
            <tr  >
                <td className="tabla-padding">
                    <a href = { route }  >
                        { consulta.fecha }
                    </a>
                </td>
                
                <td  >
                    <a href = { route }>
                        { consulta.notas }
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
        </tbody>
    )
}

export default FilaTablaConsultas