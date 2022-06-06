// Datos de ejemplo
import FilaTablaEstudios from './FilaTablaEstudios';

const TablaEstudios = ({ datos, idPaciente}) => {

    const tableContent = datos.map((estudio, index) =>(
        <FilaTablaEstudios key = { index } estudio = { estudio } idPaciente = {idPaciente}/>
    ))

return(
    <div>
        <div className="card contenedor tabla-altura">
        <table id="estudios" className="highlight">     
            <thead  >
            <tr className="figma"  >

                <th className="tabla-padding">
                    Tipo de estudio
                </th>
                <th  >
                    Código
                </th>
                <th  >
                    Químico/a
                </th>
                <th  >
                    Fecha
                </th>
                <th className="center">
                    Detalle
                </th>
                <th className="center">
                    PDF
                </th>
            </tr>
            </thead>
            { tableContent }
        </table>
        </div>  
        <br/>
        <br/>
    </div>
    )
}

export default TablaEstudios

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