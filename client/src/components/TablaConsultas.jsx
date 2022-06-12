// Datos de ejemplo
import FilaTablaConsultas from "./FilaTablaConsultas"

const TablaConsultas = ({ datos, idPaciente, rol}) => {

    const tableContent = datos.map((consulta, index) =>(
        consulta.idUsuario.idRol.nombre ===  rol ? 
            <FilaTablaConsultas key = { index } consulta = { consulta } idPaciente = {idPaciente}/> : null
    ))

return(
    <div className="animate-new-element">
        <div>
            <div className="card contenedor tabla-altura">
                <table id="estudios" className="highlight">     
                    <thead  >
                    <tr className="figma"  >
                        <th className="tabla-padding">
                            Fecha
                        </th>
                        <th  >
                            Nota
                        </th>
                        <th className="center">
                            Detalle
                        </th>
                    </tr>
                    </thead>
                    { tableContent }
                </table>
                {(tableContent.length === 0 || !tableContent[0]) &&
                    <div> <div className="blue-text text-darken-3 center"> <br/><strong> No hay consultas registradas </strong> </div> <br/><br/> </div>
                }
            </div>
        </div>  
    </div>
    )
}

export default TablaConsultas

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