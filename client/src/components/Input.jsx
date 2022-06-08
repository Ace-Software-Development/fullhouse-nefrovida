const Input = ({ requerido = false, tamano = "s12 m4", id = "nombre", label = "Nombre", type="text", elError, isActive = false, ...rest}) => {
  return(
    <div className={"input-field col " + tamano}  >
      <input 
        id={id}
        name={id}
        type={type} 
        className="validate z-depth-1"
        {...rest}/>


      <label className={isActive ? "active" : ""} htmlFor={id}  >
        {label} { requerido 
          ? <span className="red-text"> *</span> 
          : null }
      </label>
      
      
      <span className="helper-text left red-text">
        {elError}
      </span>
    </div>
  )
}

export default Input