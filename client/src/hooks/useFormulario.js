import { useState } from 'react'

const useFormulario = (inicial) => {
    const [formulario, setFormulario] = useState(inicial)
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value
        })
    }

    console.log(formulario)

    const reset = () => {
        setFormulario(inicial)
    }

    return [formulario, handleChange, reset]
}

export default useFormulario