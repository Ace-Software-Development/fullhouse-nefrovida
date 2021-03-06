import {Link} from 'react-router-dom'

const FilaTablaColaborador = ({ colaborador }) => {
  const route = "/colaborador/" + colaborador.objectId +"/"+ colaborador.idRol.nombre

  return(
    <tbody>
      <tr>
        <td className="tabla-padding">
          <a href = { route }  >
            { colaborador.nombre } { colaborador.apellidoPaterno } { colaborador.apellidoMaterno }
          </a>
        </td>
        
        <td  >
          <a href = { route }>
            { colaborador.username }
          </a>
        </td>
      
        <td  >
          <a href = { route }>
            { colaborador.telefono }
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
  
export default FilaTablaColaborador