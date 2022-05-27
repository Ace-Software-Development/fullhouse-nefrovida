import {Link} from 'react-router-dom'


const FilaTablaEstudios = ({ estudio }) => {
    estudio = estudio;
    const route = "/estudio/" + estudio.objectIdEstudio

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
            </tr>
        </tbody>
    )
}

export default FilaTablaEstudios