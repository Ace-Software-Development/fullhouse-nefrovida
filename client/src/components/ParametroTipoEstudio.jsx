import Input from './/Input'

// Existen valores booleanos, numericos y de strings

const ParametroRango = ({nombreParametro, valorA, valorB, unidad, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-908F98">format_list_numbered</i>
                <div className="detalles-lista negrita-grande c-908F98">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor numérico con Rango
            </div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A">{ valorA } - </div>

            <div className="detalles-lista espacio-3vw c-64646A">{ valorB } </div>

            <div className="detalles-lista espacio-3vw c-64646A"> { unidad }</div><br/><br/>
            
            <div className="detalles-lista espacio-pequeno c-64646A">Mínimo Máximo Unidad</div>
            <br/><br/>
        </div>                             
    )
}

const ParametroBooleano = ({nombreParametro, valorBool, codigo} ) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-908F98">format_list_numbered</i>
                <div className="detalles-lista negrita-grande c-908F98">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor positivo / negativo
            </div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A">{ valorBool ? "Positivo" : "Negativo" } </div>
            
            <br/><br/>
        </div>       
    )

}

const ParametroTexto = ({nombreParametro, valorString, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-908F98">format_list_numbered</i>
                <div className="detalles-lista negrita-grande c-908F98">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor de texto
            </div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A">{ valorString } </div>
            <br/><br/><br/>
        </div>  
    )
}




const ParametroTipoEstudio = ({nombreValor=null, nombreParametro="undefined", codigo="?", valorA="?", valorB="?", valorBool=null, valorString="undefined", unidad="undefined", ...rest}) => {
    
    if (nombreValor === "Positivo/Negativo") {
        return(
            <ParametroBooleano nombreParametro = {nombreParametro} valorBool ={valorBool} codigo = {codigo} />
        )
    }
    else if (nombreValor === "Texto") {
        return(
            <ParametroTexto nombreParametro = {nombreParametro} valorString = {valorString} codigo = {codigo}/>
            )
        }
    else if (nombreValor === "Numérico") {
            return(
            <ParametroRango nombreParametro = {nombreParametro} valorA = {valorA} valorB = {valorB} unidad = {unidad} codigo = {codigo}/>
        )
    }
}

export default ParametroTipoEstudio;