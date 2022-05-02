import { useState } from 'react'

const useLogin = (inicial, validate) => {
    const [formulario, setFormulario] = useState(inicial)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.type === 'checkbox'
                ? e.targjnmet.checked
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

export default useLogin