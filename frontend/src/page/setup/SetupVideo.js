import { useEffect, useState } from 'react'
import Navbar from '../../component/header/Navbar'
import { Typography, Container, Box, TextField, Stack, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { createVideoAPI, getVideoAPI, updateVideoAPI } from '../../api/video'
import { useParams } from 'react-router-dom'

const sysMsg = [
    "Please decode video Id first.",
]

const initialVideo = {
    category: "IT",
    subCategory: "",
    source: "youtube#video",
    videoUrl: "",
    videoId: "",
    publishedAt: "",
    title: "",
    description: "",
    thumbnailUrl: ""
}


function SetupVideo() {
    const [video, setVideo] = useState(initialVideo)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        if (id !== '0') {
            getVideo()
        }
    }, [])

    const handleChange = (e) => {
        setVideo({ ...video, [e.target.name]: e.target.value })
    }

    const getVideo = async () => {
        const { okStatus, data } = await getVideoAPI(id)
        if (okStatus) {
            setVideo(data)
        }
        else {
            setErrorMessage(data)
        }
    }

    const createVideo = async () => {
        const { okStatus, data } = await createVideoAPI(video)
        if (okStatus) {
            handleCancel()
        }
        else {
            setErrorMessage(data)
        }
    }

    const updateVideo = async () => {
        const { okStatus, data } = await updateVideoAPI(video, id)
        if (okStatus) {
            handleCancel()
        }
        else {
            setErrorMessage(data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!video.videoId) {
            setErrorMessage(sysMsg[0])
        } else {
            setIsLoading(true)
            if (id === '0') {
                await createVideo()
            } else {
                await updateVideo()
            }
            setIsLoading(false)
        }
    }

    const handleDecodeURL = () => {
        const videoId = video.videoUrl.substring(32)
        const url = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        setVideo({ ...video, videoId: videoId, thumbnailUrl: url })
        setErrorMessage('')
    }

    const handleCancel = () => {
        setVideo(initialVideo)
        setErrorMessage('')
    }


    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Stack direction='row'>
                    <Box flex={1} component="form" Validate autoComplete="off" m={2} onSubmit={handleSubmit}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Paper elevation={3}>
                            <Typography variant="h5" component="h5" align='center' m={1} >{id !== '0' ? 'Edit Video' : 'Create Video'}</Typography>
                            <Stack direction="row" spacing={2} m={2}>
                                <TextField name="category" required fullWidth disabled label="Category" size='small' value={video.category} onChange={handleChange} />
                                <FormControl fullWidth size='small' required>
                                    <InputLabel id="subCategroy">Sub Category</InputLabel>
                                    <Select name="subCategory" labelId="subCategory" value={video.subCategory} label="Sub Category" onChange={handleChange} >
                                        <MenuItem value='AppService'>AppService</MenuItem>
                                        <MenuItem value='DevOps'>DevOps</MenuItem>
                                        <MenuItem value='CICD'>CICD</MenuItem>
                                        <MenuItem value='IDE'>IDE</MenuItem>
                                        <MenuItem value='GitHub'>GitHub</MenuItem>
                                        <MenuItem value='Docker'>Docker</MenuItem>
                                        <MenuItem value='React'>React</MenuItem>
                                        <MenuItem value='MERN'>MERN</MenuItem>
                                        <MenuItem value='Microservices'>Microservices</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2} m={2}>
                                <TextField name="videoUrl" fullWidth required label="Video URL" size='small' value={video.videoUrl} onChange={handleChange} />
                            </Stack>
                            <Stack direction="row" spacing={2} m={2}>
                                <TextField name="videoId" required disabled label="Video ID" size='small' value={video.videoId} onChange={handleChange} />
                                <TextField name="publishedAt" required label="Published At" size='small' value={video.publishedAt} onChange={handleChange} />
                            </Stack>
                            <Stack direction="column" spacing={2} m={2}>
                                <TextField name="title" fullWidth required label="Title" size='small' multiline minRows={2} maxRows={2} value={video.title} onChange={handleChange} />
                                <TextField name="description" fullWidth label="Description" size='small' multiline minRows={2} maxRows={4} value={video.description} onChange={handleChange} />
                            </Stack>
                            <Stack direction='row' spacing={2} m={2}>
                                <Button variant="contained" type='Submit' disabled={isLoading} >Submit</Button>
                                <Button variant="contained" disabled={isLoading} onClick={handleCancel}>Cancel</Button>
                                <Button variant="contained" disabled={isLoading} onClick={handleDecodeURL}>Decode URL</Button>
                                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                            </Stack>
                            {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default SetupVideo