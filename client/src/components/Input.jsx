const Input = ({tamano = "s12 m4", id = "nombre", label = "Nombre", type="text", elError="", ...rest}) => {
  return(
    <div className={"input-field col " + tamano}  >
      <input 
        id={id}
        name={id}
        type={type} 
        className="validate z-depth-1"
        {...rest}/>
      <label for={id}  >{label}</label>
      <span className="helper-text left red-text">
        {elError}
      </span>
    </div>
  )
}

export default Input