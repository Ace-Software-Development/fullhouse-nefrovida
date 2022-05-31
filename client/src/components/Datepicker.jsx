const Datepicker = ({requerido = false, tamano = "s12 m4", id, label, elError, ...rest}) => {
  return(
    <div className={"input-field col " + tamano}  >
      <input
        name={id}
        id={id} 
        type="date"
        className="validate z-depth-1" 
        {...rest}/>
      <label htmlFor={id}  >
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
  
export default Datepicker