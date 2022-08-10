import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()

        setIsLoading(false)
        if (!response.ok) {
            setError(json.error)
        } else {
            // save to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({ type: 'LOGIN', payload: json })
        }
    }
    return { signup, isLoading, error }
}