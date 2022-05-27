import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";

const SelectEstudios = ({requerido = false, value, id = "nombre", label = "Nombre", arr, handleChange, paraEstudios = false}) => {
    
    useEffect(() => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }, []);

    if (paraEstudios === true){
        arr.push({
            value: "%20",
            option: "Todos los estudios"
        });
    }

    return(
    <div className = "validate z-depth-1 select-grande right">
        <select 
            value={value} 
            id={id} 
            name={id} 
            onChange={handleChange}
        >
            <option key={0} value={value} disabled>
            {label}
            </option>
            {arr.map((item, index) => 
                <option key={index+1} value={item.value}>
                    {item.option}
                </option>)
            }
        </select>
    </div>
    )
}

export default SelectEstudios