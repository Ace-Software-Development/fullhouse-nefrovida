import React from 'react';

const Select = ({tamano = "s4 m2", id = "nombre", label = "Nombre", arr = ["Hombre", "Mujer"]}) => {

    return(
      <div className={"input-field col " + tamano}>
        <select id={id} name={id}>
          <option value="" disabled selected>{label}</option>
            {
                arr.map((item, index) => 
                    <option value={index}>{item}</option>
                )
            }
        </select>
        <label>{label}</label>
      </div>
    )
}

export default Select