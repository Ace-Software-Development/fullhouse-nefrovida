import {Link} from 'react-router-dom'


const FilaTablaPaciente = ({ paciente }) => {
  paciente = paciente;
  const route = "/" + paciente.curp

  return(
    <tr  >
      <td className="tabla-padding">
        <a href = { route }  >
          { paciente.nombre } { paciente.apellidoPaterno } { paciente.apellidoMaterno }
        </a>
        <br/>
        <g className="tabla-sexo">
          { paciente.curp }
        </g>
      </td>
      <td  >
        <a href = { route }>
          { paciente.correo }
        </a>
      </td>
      <td  >
        <a href = { route }>
          { paciente.telefono }
        </a>
      </td>
      <td className="center">
        <Link to = { route }>
          <i class="material-icons">
            insert_drive_file
          </i>
        </Link>
      </td>
    </tr>
  )
}
  
export default FilaTablaPaciente