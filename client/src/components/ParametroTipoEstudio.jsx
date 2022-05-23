import Input from './/Input'

// Existen valores booleanos, numericos y de strings

const ParametroRango = ({nombreParametro, valorMin, valorMax, unidad, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <br/>
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

        </div>                             
    )
}

const ParametroBooleano = ({nombreParametro, valorBool, codigo} ) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <br/>
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
            
            <br/>

            <div className="detalles-lista espacio-3vw c-64646A fixed-height">{ valorBool ? "Positivo" : "Negativo" } </div>
            

        </div>       
    )

}

const ParametroTexto = ({nombreParametro, valorString, codigo}) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align'>
            <br/>
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
            <br/>

            <div className="detalles-lista espacio-3vw c-64646A fixed-height">{ valorString } </div>
            

            

        </div>  
    )
}

const ParametroTipoEstudio = ({ nombreValor1="undefined", nombreValor2="undefined",obj1 ,obj2}) => {
    
    if(nombreValor1 === "Positivo/Negativo"){
        if(nombreValor2 === "Positivo/Negativo"){
            return(
                <div>
                    <ParametroBooleano nombreParametro = { obj1.idParametro.nombre } valorBool ={obj1.idParametro.valorBool} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId} />
                    <ParametroBooleano nombreParametro = { obj2.idParametro.nombre } valorBool ={obj2.idParametro.valorBool} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId} />
                </div>
            ) 
        }
        else if(nombreValor2 === "Texto"){
            return(
                <div>
                    
                    <ParametroBooleano nombreParametro = { obj1.idParametro.nombre } valorBool ={obj1.idParametro.valorBool} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId} />
                    <ParametroTexto nombreParametro = {obj2.idParametro.nombre} valorString = {obj2.idParametro.valorString} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>

            )
            
        }
        else if (nombreValor2 === "Numérico"){
            return (
                <div>
                    <ParametroBooleano nombreParametro = { obj1.idParametro.nombre } valorBool ={obj1.idParametro.valorBool} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId} />
                    <ParametroRango nombreParametro = {obj2.idParametro.nombre}valorMin = {obj2.idParametro.valorMin} valorMax = {obj2.idParametro.valorMax}  unidad = {obj2.idParametro.unidad} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>
                
            )
        }
        else{
            return(
                <div>
                    <ParametroBooleano nombreParametro = { obj1.idParametro.nombre } valorBool ={obj1.idParametro.valorBool} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId} />
                </div>
            )
        }
        
    }
    else if(nombreValor1 === "Texto"){
        if(nombreValor2 === "Positivo/Negativo"){
            return(
                <div>
                    <ParametroTexto nombreParametro = {obj1.idParametro.nombre} valorString = {obj1.idParametro.valorString} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroBooleano nombreParametro = { obj2.idParametro.nombre } valorBool ={obj2.idParametro.valorBool} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId} />
                </div>
            ) 
        }
        else if(nombreValor2 === "Texto"){
            return(
                <div>
                    
                    <ParametroTexto nombreParametro = {obj1.idParametro.nombre} valorString = {obj1.idParametro.valorString} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroTexto nombreParametro = {obj2.idParametro.nombre} valorString = {obj2.idParametro.valorString} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>

            )
            
        }
        else if (nombreValor2 === "Numérico"){
            return (
                <div>
                    <ParametroTexto nombreParametro = {obj1.idParametro.nombre} valorString = {obj1.idParametro.valorString} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroRango nombreParametro = {obj2.idParametro.nombre}valorMin = {obj2.idParametro.valorMin} valorMax = {obj2.idParametro.valorMax}  unidad = {obj2.idParametro.unidad} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>
                
            )
        }
        else{
            return(
                <div>
                    <ParametroTexto nombreParametro = {obj1.idParametro.nombre} valorString = {obj1.idParametro.valorString} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                </div>
            )
        }
    }
    else if (nombreValor1 === "Numérico"){
        if(nombreValor2 === "Positivo/Negativo"){
            return(
                <div>
                    <ParametroRango nombreParametro = {obj1.idParametro.nombre}valorMin = {obj1.idParametro.valorMin} valorMax = {obj1.idParametro.valorMax}  unidad = {obj1.idParametro.unidad} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroBooleano nombreParametro = { obj2.idParametro.nombre } valorBool ={obj2.idParametro.valorBool} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId} />
                </div>
            ) 
        }
        else if(nombreValor2 === "Texto"){
            return(
                <div>
                    
                    <ParametroRango nombreParametro = {obj1.idParametro.nombre}valorMin = {obj1.idParametro.valorMin} valorMax = {obj1.idParametro.valorMax}  unidad = {obj1.idParametro.unidad} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroTexto nombreParametro = {obj2.idParametro.nombre} valorString = {obj2.idParametro.valorString} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>

            )
            
        }
        else if (nombreValor2 === "Numérico"){
            return (
                <div>
                    <ParametroRango nombreParametro = {obj1.idParametro.nombre}valorMin = {obj1.idParametro.valorMin} valorMax = {obj1.idParametro.valorMax}  unidad = {obj1.idParametro.unidad} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                    <ParametroRango nombreParametro = {obj2.idParametro.nombre}valorMin = {obj2.idParametro.valorMin} valorMax = {obj2.idParametro.valorMax}  unidad = {obj2.idParametro.unidad} codigo = {obj2.idParametro.codigo} key = {obj2.idParametro.objectId}/>
                </div>
                
            )
        }
        else{
            return(
                <div>
                    <ParametroRango nombreParametro = {obj1.idParametro.nombre}valorMin = {obj1.idParametro.valorMin} valorMax = {obj1.idParametro.valorMax}  unidad = {obj1.idParametro.unidad} codigo = {obj1.idParametro.codigo} key = {obj1.idParametro.objectId}/>
                </div>
            )
        }
    }
}


export {ParametroTexto, ParametroRango, ParametroBooleano, ParametroTipoEstudio};