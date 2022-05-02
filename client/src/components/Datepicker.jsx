const Datepicker = ({tamano = "s12 m4", id, label, elError, ...rest}) => {
  return(
    <div className={"input-field col " + tamano}  >
      <input
        name={id}
        id={id} 
        type="date"
        className="validate z-depth-1" 
        {...rest}/>
      <label for={id}>{label}</label>
      <span className="helper-text left red-text">
        {elError}
      </span>
    </div>
  )
}
  
export default Datepicker