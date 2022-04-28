const Select = ({value, tamano = "s4 m2", id = "nombre", label = "Nombre", arr = ["Hombre", "Mujer"], handleChange}) => {

    return(
      <div className={"input-field col " + tamano}>
        <select value={value} id={id} name={id} onChange={handleChange}>
          <option value="" disabled selected>{label}</option>
            {
                arr.map((item, index) => 
                    <option key={index} value={item.value}>{item.option}</option>
                )
            }
        </select>
        <label>{label}</label>
      </div>
    )
}

export default Select