import {Link} from 'react-router-dom'


const ContenidoTablaPx = ({paciente}) => {
  paciente = paciente;
  const route = "/" + paciente.curp

  return(
    <>
      <tr  >
        <td className="tabla-padding"  >
          <a href="http://www.google.com"  >
            {paciente.nombre} {paciente.materno} {paciente.paterno}
          </a>
          <br/>
          <g className="tabla-sexo"  >
            {paciente.sexo}
          </g>
        </td>
        <td  >
          <a href="http://www.google.com"  >
            { paciente.correo}
          </a>
        </td>
        <td  >
          <a href="http://www.google.com"  >
            { paciente.telefono}
          </a>
        </td>
        <td className="center"  >
          <Link to = {route}  >
            <i class="material-icons"  >
              insert_drive_file
            </i>
          </Link>
        </td>
      </tr>
    </>
  )
}
  
  export default ContenidoTablaPx