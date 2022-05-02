const ContenidoTablaPx = (paciente) => {
console.log (paciente);
paciente=paciente.paciente;

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
        <a href="http://www.google.com"  >
          <i class="material-icons"  >
            insert_drive_file
          </i>
        </a>
      </td>
    </tr>
      </>
    )
  }
  
  export default ContenidoTablaPx