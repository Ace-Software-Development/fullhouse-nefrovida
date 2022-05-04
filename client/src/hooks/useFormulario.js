import { useState } from 'react'

const useFormulario = (inicial, validate) => {
    const [formulario, setFormulario] = useState(inicial)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value
        })

        setErrors(validate(formulario))
    }

    console.log(formulario)

    const reset = () => {
        setFormulario(inicial)
    }

    return [formulario, handleChange, reset, errors]
}

export default useFormulario