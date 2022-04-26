// Cumple la misma funcion que <form>, arregla un poquito el desface.

const Form = ({children}) => {
    return(
        <form className="col s12">
            {children}
        </form>
    )
}

export default Form