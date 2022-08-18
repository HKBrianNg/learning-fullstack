import { useEffect, useState, useContext } from 'react'
import { Typography, Box, TextField, Stack, Paper, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { createUserAPI, getUserAPI, updateUserAPI } from '../../api/user'
import { UserContext } from '../../App'


const initialUser = {
    id: "",
    name: "",
    email: "",
    password: ""
}

function SetupUser({ selectedId, setSelectedId }) {
    const { userData, setUserData } = useContext(UserContext)
    const [user, setUser] = useState(initialUser)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        console.log('setupuser effect()', selectedId)
        if (selectedId !== '0') {
            getUser()
        }
    }, [selectedId])

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const getUser = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getUserAPI(selectedId)
        if (okStatus) {
            setUser(data)
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const createUser = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await createUserAPI(user)
        if (okStatus) {
            setUserData(current => [...current, data])
            setUser(initialUser)
            setSelectedId('0')
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const updateUser = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await updateUserAPI(user, selectedId)
        if (okStatus) {
            const newUserData = userData.map(el => el._id === user._id ? user : el)
            setUserData(newUserData)
            setUser(initialUser)
            setSelectedId('0')
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (selectedId === '0') {
            await createUser()
        } else {
            await updateUser()
        }
        setIsLoading(false)
    }

    const handleCancel = () => {
        setUser(initialUser)
        setSelectedId('0')
        setErrorMessage('')
    }


    return (
        <>
            <Box flex={1} component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center' }} >
                <Paper elevation={3}>
                    <Typography variant="h5" component="h5" align='center' m={1} >{selectedId !== '0' ? 'Edit User' : 'Create User'}</Typography>
                    <Stack direction='row' spacing={2} m={2}>
                        <TextField name="id" required label="ID" size='small' value={user.id} onChange={handleChange} />
                        <TextField name="name" required fullWidth label="Name" size='small' value={user.name} onChange={handleChange} />
                    </Stack>
                    <Stack direction="column" spacing={2} m={2}>
                        <TextField name="email" required fullWidth label="Email" size='small' value={user.email} onChange={handleChange} />
                        <TextField name="password" fullWidth required label="Password" size='small' multiline minRows={2} maxRows={2} value={user.password} onChange={handleChange} />
                    </Stack>
                    <Stack direction='row' spacing={2} m={2}>
                        <Button variant="contained" type='Submit' disabled={isLoading} >Submit</Button>
                        <Button variant="contained" disabled={isLoading} onClick={handleCancel}>Cancel</Button>
                        {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                    </Stack>
                    {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                </Paper>
            </Box>
        </>
    )
}

export default SetupUser