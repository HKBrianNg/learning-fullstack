import { useEffect, useState, useContext } from 'react'
import { Container, Box, Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress'
import { AppContext } from '../../App'


function Logout() {
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { logOut } = useAuth()
    const { app, setApp } = useContext(AppContext)
    const navigate = useNavigate()


    const handleClick = () => {
        navigate("/home", { replace: true })
    }

    const logout = async () => {
        try {
            setErrorMessage("")
            setIsLoading(true)
            await logOut()
            setApp({ ...app, email: "" })
        } catch (err) {
            setErrorMessage(err.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        logout()
    }, [])

    return (
        <Container maxWidth='lg'>
            <Box m={5} sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                <Paper elevation={3}>
                    <Typography variant="h5" align='center' m={1} >Welcome to visit Learning Website</Typography>
                    <Button variant="contained" onClick={handleClick} fullWidth disabled={isLoading}>Back to Home Page</Button>
                    {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                    {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                </Paper>
            </Box>
        </Container>

    )
}

export default Logout