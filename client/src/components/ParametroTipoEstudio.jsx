import Input from './/Input'

// Existen valores booleanos, numericos y de strings

const ParametroRango = ({nombreParametro, valorMin, valorMax, unidad, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align no-margin-left'>
            <br/>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                <div className="detalles-lista texto-grande c-64646A">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor numérico con Rango
            </div>
            <br/><br/><br/>

            <div className="center-align">
                <div className="rango-parametros">
                    <div className="espacio-rango">
                        <div className="espacio-3vw c-64646A">
                            { valorMin }
                        </div>
                        <p className="c-64646A">Minimo</p>
                    </div>
                    <div className="espacio-rango">
                        <div className="espacio-3vw c-64646A">
                            &nbsp;-&nbsp;
                        </div>
                        <p className="c-64646A"></p>
                    </div>
                    <div className="espacio-rango">
                        <div className="espacio-3vw c-64646A">
                            { valorMax }
                        </div>
                        <p className="c-64646A">Maximo</p>
                    </div>
                    <div className="espacio-rango">
                        <div className="espacio-3vw c-64646A">
                            { unidad }
                        </div>
                        <p className="c-64646A">Unidad</p>
                    </div>
                </div>
            </div>

            <br/>

            <div className="identificacion-registrar"></div>

        </div>
    )
}

const ParametroBooleano = ({nombreParametro, valorBool, codigo} ) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align no-margin-left'>
            <br/>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                <div className="detalles-lista texto-grande c-64646A">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor positivo / negativo
            </div>

            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A fixed-height">{ valorBool ? "Positivo" : "Negativo" } </div>

            <div className="identificacion-registrar"></div>

        </div>
    )

}

const ParametroTexto = ({nombreParametro, valorString, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align no-margin-left'>
            <br/>
            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                <div className="detalles-lista texto-grande c-64646A">
                    { nombreParametro + " (" + codigo + "):"}
                </div>
            </div>
            <br/>

            <div className="detalles-lista light-pequeno c-908F98">
                Valor de texto
            </div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A fixed-height">{ valorString } </div>

            <div className="identificacion-registrar"></div>

        </div>
    )
}


export {ParametroTexto, ParametroRango, ParametroBooleano};