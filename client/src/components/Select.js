import { useState } from 'react'

const Select = ({value, tamano = "s4 m2", id, label, arr, handleChange}) => {
    return(
      <div className={"input-field col " + tamano}>
        <select value={value} id={id} name={id} onChange={handleChange}>
          <option value="" disabled selected>{label}</option>
            {
                arr.map((item, index) => 
                    <option value={item.value}>{item.option}</option>
                )
            }
        </select>
        <label>{label}</label>
      </div>
    )
}

export default Select