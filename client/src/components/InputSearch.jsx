const InputSearch = ({ id="", label="", ...rest }) => {
    return(
        <input 
            id = { id } 
            type = "text" 
            name = { id } 
            placeholder = { label }
            className = "validate z-depth-1 input-pequeno right" { ...rest }
        />
    )
}

export default InputSearch