import { useState, useContext } from 'react'
import { Box, Card, CardMedia, CardContent, IconButton, Typography, CardActions } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { VideoContext } from '../../App'
import { deleteVideoAPI } from '../../api/video'
import CircularProgress from '@mui/material/CircularProgress'


function VideoInfo({ filter }) {
    const { videoData, setVideoData } = useContext(VideoContext)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let currentData = videoData;
    if (filter) {
        currentData = videoData.filter((item) => (item.subCategory === filter.subCategory && item.category === filter.category))
    }

    const openVideo = (videoId) => {
        navigate(`/home/video/${videoId}`, { replace: true })
    }

    const editVideo = (id) => {
        navigate(`/setup/video/${id}`, { replace: true })
    }

    const deleteVideo = async (id) => {
        const { okStatus, data } = await deleteVideoAPI(id)
        setIsLoading(true)
        setErrorMessage('')
        if (okStatus) {
            const newVideoData = videoData.filter((item) => (item._id !== id))
            setVideoData(newVideoData)
            setErrorMessage('')
        } else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
            {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            {currentData.map((item) => (
                <Card key={item._id} sx={{ maxWidth: 250, padding: 1 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: deepOrange[600] }} gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} gutterBottom>
                        Published at: {item.publishedAt}
                    </Typography>
                    <CardActions>
                        <IconButton onClick={() => editVideo(item._id)}><EditIcon /></IconButton>
                        <IconButton onClick={() => deleteVideo(item._id)}><DeleteIcon /></IconButton>
                    </CardActions>
                    <CardMedia
                        component="img"
                        image={item.thumbnailUrl}
                        alt={item.title}
                        onClick={() => openVideo(item.videoId)}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.publishedAT} {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}



export default VideoInfo;