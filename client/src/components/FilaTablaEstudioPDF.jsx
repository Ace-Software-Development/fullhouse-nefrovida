const FilaTablaEstudioPDF = ({ estudio }) => {
    return(
        <tr>
            <td className="pdfTd">{ estudio.nombreParametro }</td>
            <td className="pdfTd">{ estudio.valorResultado } { estudio.unidadParametro }</td>
            <td className="pdfTd">{ estudio.valorReferenciaParametro } { estudio.unidadParametro }</td>
        </tr>
    )
}

export default FilaTablaEstudioPDF