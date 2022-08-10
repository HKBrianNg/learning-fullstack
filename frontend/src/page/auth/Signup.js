import { useState } from 'react'
import Navbar from '../../component/header/Navbar'
import { useNavigate } from 'react-router-dom'
import { signupAPI } from '../../api/user'


function Signup() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [errmsg, setErrmsg] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrmsg(null)
        const { okStatus, data } = await signupAPI(user)
        setIsLoading(false)
        if (okStatus) {
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/home', { replace: true })
        } else {
            setErrmsg(data)
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
                {errmsg && <div className='error'>{errmsg}</div>}
            </form>
        </>
    )
}

export default Signup