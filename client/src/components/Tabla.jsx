// Datos de ejemplo
import FilaTablaPaciente from "./FilaTablaPaciente";

const Tabla = ({ datos }) => {

  const tableContent = datos.map((paciente)=>(
    <FilaTablaPaciente paciente= { paciente } />
  ))

  return(
    <>
      <div className="card contenedor tabla-altura"  >
        <table id="doctores" className="highlight"  >
            
          <thead  >
            <tr className="figma"  >
                <th className="tabla-padding"  >
                  Nombre
                </th>
                <th  >
                  Correo
                </th>
                <th  >
                  Teléfono
                </th>
                <th className="center"  >
                  Detalle
                </th>
            </tr>
          </thead>
          
          { tableContent }
        </table>
      </div>  
      <br  />
      <br  />
    </>
  )
}

export default Tabla

// Guía de diseño

// En el <thead>, donde está el tr,
// el primer th debe tener la clase "tabla-paddinng",
// el segundo th y los que siguen sólo el dato,
// el último th debe tener la clase "center".

// Para los datos como tal,
// se debe generar un tr por cada renglón de datos
// el primer td tendrá la clase "tabla-padding", un <br> sin clase y un <g> con clase "tabla-sexo"
// el segundo td y los que siguen sólo los datos,
// el último td debe contener la clase "center" con un ícono fijo "insert_drive_file"