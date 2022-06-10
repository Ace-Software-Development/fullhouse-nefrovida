import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";

const Select = ({requerido = false, value, tamano = "s4 m2", id = "nombre", label = "Nombre", arr, elError, handleChange, index ="_"}) => {

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
      index = {index}
    >
      <option value="" disabled>
        {label}
      </option>
      {
        arr.map((item, index) =>
          <option
            key={index}
            value={item.value}>
              {item.option}
          </option>
        )
      }
    </select>
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

export default Select