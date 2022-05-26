import {Link} from 'react-router-dom'


const FilaTablaPaciente = ({ paciente }) => {
  paciente = paciente;
  const route = "/" + paciente.curp

  return(
    <tbody>
      <tr  >
        <td className="tabla-padding">
          <a href = { route }  >
            { paciente.nombre } { paciente.apellidoPaterno } { paciente.apellidoMaterno }
          </a>
          <br/>
          <a className="tabla-sexo">
            { paciente.curp }
          </a>
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
            <i className="material-icons">
              insert_drive_file
            </i>
          </Link>
        </td>
      </tr>
    </tbody>
  )
}
  
export default FilaTablaPaciente