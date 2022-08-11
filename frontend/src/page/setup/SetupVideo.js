import { useState } from 'react'
import Navbar from '../../component/header/Navbar'
import { Typography, Container, Box, TextField, Stack, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'


function SetupVideo() {
    const [video, setVideo] = useState({
        category: "IT",
        subCategory: "",
        source: "youtube#video",
        videoUrl: "",
        videoId: "",
        publishedAt: "",
        title: "",
        description: "",
        thumbnailUrl: ""
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setVideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!video.videoId) {
            setErrorMessage('101-pls press decode to get video ID')
        } else {
            console.log("video:", video)
            setIsLoading(true)
            // send api
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }

    }

    const handleDecodeURL = () => {
        const videoId = video.videoUrl.substring(32)
        const url = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        setVideo({ ...video, videoId: videoId, thumbnailUrl: url })
        setErrorMessage('')
    }

    const handleCancel = () => {
        setVideo({
            category: "IT",
            subCategory: "",
            source: "youtube#video",
            videoUrl: "",
            videoId: "",
            publishedAt: "",
            title: "",
            description: "",
            thumbnailUrl: ""
        })
    }

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Box component="form" Validate autoComplete="off" m={2} onSubmit={handleSubmit}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Paper elevation={3}>
                        <Typography variant="h5" component="h5" align='center' m={1} >Video Maintenance</Typography>
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
            </Container>
        </>
    )
}

export default SetupVideo