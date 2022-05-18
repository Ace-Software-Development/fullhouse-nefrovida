import Input from './/Input'

// Existen valores booleanos, numericos y de strings

const ParametroTipoEstudio = ({nombreValor="undefined", nombreParametro="undefined", codigo="?", valorA="?", valorB="?", unidad="undefined"}) => {
    return(
        <div className='col s12 l6 espacio-vertical left-align'>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-908F98">format_list_numbered</i>
                <div className="detalles-lista negrita-grande c-908F98">
                    { nombreParametro }
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor numerico con rango
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

export default ParametroTipoEstudio;