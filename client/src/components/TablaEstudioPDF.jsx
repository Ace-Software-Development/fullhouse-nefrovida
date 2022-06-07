// Datos de ejemplo
import FilaTablaEstudioPDF from "./FilaTablaEstudioPDF"

const TablaEstudioPDF = ({ datos}) => {

    const tableContent = datos.map((estudio, index) =>(
        <FilaTablaEstudioPDF key = { index } estudio = { estudio } />
    ))

return(
        <table className="striped">
            <thead>
                <tr>
                    <th className="negrita">Parámetro</th>
                    <th className="negrita">Resultado</th>
                    <th className="negrita">Valor de referencia</th>
                </tr>
            </thead>
            <tbody>
                { tableContent }
            </tbody>
        </table>
    )
}

export default TablaEstudioPDF