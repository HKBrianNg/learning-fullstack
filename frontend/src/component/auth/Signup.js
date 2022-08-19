import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GoogleButton from "react-google-button";
import { useAuth } from '../../context/AuthContext'
import Navbar from '../header/Navbar'
import { Container, Box, Paper, Typography, Stack, TextField, Button, IconButton, InputAdornment, FormControl, OutlinedInput, InputLabel } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialUser = {
    name: "",
    email: "",
    password: ""
}

function Signup() {
    const [user, setUser] = useState(initialUser)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { signUp } = useAuth();
    const navigate = useNavigate()

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
        setIsLoading(true)
        setErrorMessage("")
        try {
            await signUp(user.email, user.password);
            navigate('/auth/login', { replace: true })
        } catch (err) {
            setErrorMessage(err.message)
        }
        setIsLoading(false)
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
                            <TextField required label="Name" size='small' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            <TextField required label="Email" type="email" size='small' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            {/* <TextField name="password" required label="Password" size='small' value={user.password} onChange={handleChange} /> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    size='medium'
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                size="small"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password *"
                                />
                            </FormControl>
                            <Stack direction='row' spacing={2} m={2}>
                                <Button variant="contained" type='Submit' disabled={isLoading} >Submit</Button>
                                <Button variant="contained" disabled={isLoading} onClick={handleCancel}>Cancel</Button>
                                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                            </Stack>
                        </Stack>
                        <Stack direction='row' spacing={2} m={2}>
                            <Typography variant="subtitle1" m={1} >Already have an account?</Typography>
                            <Link to='/auth/login'>Login</Link>
                        </Stack>
                        {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default Signup