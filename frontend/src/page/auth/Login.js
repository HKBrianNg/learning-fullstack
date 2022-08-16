import { useState, useContext } from 'react'
import Navbar from '../../component/header/Navbar'
import { loginAPI } from '../../api/user'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'

function Login() {
    const { app, setApp } = useContext(AppContext)
    const [user, setUser] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(null)
    const [errmsg, setErrmsg] = useState(null)
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrmsg(null)
        const { okStatus, data } = await loginAPI(user)
        setIsLoading(false)
        if (okStatus) {
            localStorage.setItem('user', JSON.stringify(data))
            setApp({ ...app, email: data.email, token: data.token })
            navigate('/home', { replace: true })
        } else {
            setErrmsg(data)
        }
    }

    return (
        <>
            <Navbar />
            <form className='Login' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Email:</label>
                <input type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label>Password:</label>
                <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button disabled={isLoading}>Login</button>
                {errmsg && <div className='error'>{errmsg}</div>}
            </form>
        </>
    )
}

export default Login