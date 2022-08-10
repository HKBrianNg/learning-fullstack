import { useState } from 'react'
import Navbar from '../header/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate()

    const signupAPI = async (user) => {
        const url = 'http://localhost/4000'

        try {
            const response = await axios.post(`${url}/user/signup`, user)
            console.log("signupAPI() success:", response)
        } catch (error) {
            setError(error)
            console.log("signupAPI() error:", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        await signupAPI(user)
        setIsLoading(false)
        if (!error) {
            navigate('/home', { replace: true })
        }
    }


    return (
        <>
            <Navbar />
            <form className='Signup' onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <label>Name:</label>
                <input type="text" onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name} />
                <label>Email:</label>
                <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                <label>Password:</label>
                <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} />
                <button disabled={isLoading}>Sign Up</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </>
    )
}

export default Signup