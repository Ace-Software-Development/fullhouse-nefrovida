const FilaTablaEstudioPDF = ({ estudio }) => {

    console.log("Dentro de FilaTablaEstudioPDF")
    console.log(estudio)

    return(
        <tr>
            <td>{ estudio.nombreParametro }</td>
            <td>{ estudio.valorResultado } { estudio.unidadParametro }</td>
            <td>{ estudio.valorReferenciaParametro } { estudio.unidadParametro }</td>
        </tr>
    )
}

export default FilaTablaEstudioPDF