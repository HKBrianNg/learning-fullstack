import { useContext, useEffect, useState } from 'react'
import { Typography, Box, TextField, Stack, Paper, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { createTopicAPI, getTopicAPI, updateTopicAPI } from '../../api/topic'
import { AppContext } from '../../App'


const sysMsg = [
    "",
]

const initialTopic = {
    id: "",
    category: "",
    subCategory: "",
    title: "",
    summary: "",
    content: "",
    contentUrl: ""
}


function SetupTopic({ selectedId, setSelectedId }) {
    // const [app, setApp] = useContext(AppContext)
    const [topic, setTopic] = useState(initialTopic)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (selectedId !== '0') {
            getTopic()
        }
    }, [selectedId])

    const handleChange = (e) => {
        setTopic({ ...topic, [e.target.name]: e.target.value })
    }

    const getTopic = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getTopicAPI(selectedId)
        if (okStatus) {
            setTopic(data)
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const createTopic = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await createTopicAPI(topic)
        if (okStatus) {
            handleCancel()
            // setApp({ ...app, dirtyFlag: true })
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const updateTopic = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await updateTopicAPI(topic, selectedId)
        if (okStatus) {
            handleCancel()
            // setApp({ ...app, dirtyFlag: true })
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
            await createTopic()
        } else {
            await updateTopic()
        }
        setIsLoading(false)
    }

    const handleCancel = () => {
        setTopic(initialTopic)
        setSelectedId('0')
        setErrorMessage('')
    }


    return (
        <>
            <Box flex={1} component="form" autoComplete="off" onSubmit={handleSubmit}
                sx={{ display: 'flex', justifyContent: 'center' }} >
                <Paper elevation={3}>
                    <Typography variant="h5" component="h5" align='center' m={1} >{selectedId !== '0' ? 'Edit Topic' : 'Create Topic'}</Typography>
                    <Stack direction="row" spacing={2} m={2}>
                        <TextField name="category" required fullWidth label="Category" size='small' value={topic.category} onChange={handleChange} />
                        <TextField name="subCategory" required fullWidth label="SubCategory" size='small' value={topic.subCategory} onChange={handleChange} />
                        <TextField name="id" required fullWidth label="ID" size='small' value={topic.id} onChange={handleChange} />
                    </Stack>

                    <Stack direction="column" spacing={2} m={2}>
                        <TextField name="title" fullWidth required label="Title" size='small' multiline minRows={2} maxRows={2} value={topic.title} onChange={handleChange} />
                        <TextField name="summary" required label="Summary" size='small' multiline minRows={2} maxRows={4} value={topic.summary} onChange={handleChange} />
                        <TextField name="content" fullWidth label="Content" size='small' multiline minRows={2} maxRows={4} value={topic.content} onChange={handleChange} />
                        <TextField name="contentUrl" fullWidth label="Content URL" size='small' value={topic.contentUrl} onChange={handleChange} />
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

export default SetupTopic