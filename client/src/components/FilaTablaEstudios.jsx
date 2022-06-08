import {Link} from 'react-router-dom'


const FilaTablaEstudios = ({ estudio, idPaciente }) => {
    const route = "/paciente/" + idPaciente + "/estudio/" + estudio.objectIdEstudio
    const routePDF = "/estudio/PDF/" + estudio.objectIdEstudio + "/" + idPaciente

    return(
        <tbody>
            <tr  >
                <td className="tabla-padding">
                    <a href = { route }  >
                        { estudio.nombreTipoEstudio }
                    </a>
                </td>
                
                <td  >
                    <a href = { route }>
                        { estudio.codigoTipoEstudio }
                    </a>
                </td>
                
                <td  >
                    <a href = { route }>
                        { estudio.nombreColaborador }
                    </a>
                </td>

                <td  >
                    <a href = { route }>
                        { estudio.fechaEstudio }
                    </a>
                </td>
                
                <td className="center">
                    <Link to = { route }>
                        <i className="material-icons">
                        insert_drive_file
                        </i>
                    </Link>
                </td>

                <td className="center">
                    <Link to = { routePDF }>
                        <i className="material-icons">
                        insert_drive_file
                        </i>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

export default FilaTablaEstudios