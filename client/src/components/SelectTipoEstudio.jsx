import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";

const Select = ({value, tamano = "s4 m2", id = "nombre", label = "Nombre", arr = ["Hombre", "Mujer"], handleChange}) => {
  
  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }, []);

  return (
  <div className={"input-field col " + tamano}  >
    <select 
      value={value} 
      id={id} 
      name={id} 
      onChange={handleChange}
    >
      <option value="" disabled selected  >
        {label}
      </option>
      {
        arr.map((item, index) => 
          <option 
            key={index} 
            value={item.value}>
              {item}
          </option>
        )
      }
    </select>
    <label  >
      {label}
    </label>
  </div>
  )
}

export default Select