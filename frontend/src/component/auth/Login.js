import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GoogleButton from "react-google-button";
import { useUserAuth } from '../../context/UserAuthContext'
import Navbar from '../header/Navbar'
import { Container, Box, Paper, Typography, Stack, TextField, Button, IconButton, InputAdornment, FormControl, OutlinedInput, InputLabel } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialUser = {
    email: "",
    password: ""
}

function Login() {
    const [user, setUser] = useState(initialUser)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate()

    // const handleChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value })
    // }

    const handleCancel = () => {
        setUser(initialUser)
        setErrorMessage('')
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        try {
            // await logIn(email, password);
            navigate("/home")
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    // const handleGoogleSignIn = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await googleSignIn();
    //         navigate("/home");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Box flex={1} component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', m: 1 }} >
                    <Paper elevation={3}>
                        <Typography variant="h5" component="h5" align='center' m={1} >Firebase Auth Signup</Typography>
                        <Stack direction="column" spacing={2} m={2}>
                            <TextField required label="Email" size='small' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            {/* <TextField name="password" required label="Password" size='small' value={user.password} onChange={handleChange} /> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction='row' spacing={2} m={2}>
                            <Button variant="contained" type='Submit' disabled={isLoading} >Submit</Button>
                            <Button variant="contained" disabled={isLoading} onClick={handleCancel}>Cancel</Button>
                            {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                        </Stack>
                        {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default Login