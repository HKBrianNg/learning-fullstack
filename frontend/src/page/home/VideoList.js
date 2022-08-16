import { useState, useContext } from 'react'
import { Box, Card, CardMedia, CardContent, IconButton, Typography, CardActions, Tooltip } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { AppContext, VideoContext } from '../../App'
import { deleteVideoAPI } from '../../api/video'
import CircularProgress from '@mui/material/CircularProgress'

function VideoList({ setSelectedId }) {
    const { app } = useContext(AppContext)
    const { videoData, setVideoData } = useContext(VideoContext)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let currentData
    if (app.subCategory === 'ALL') {
        currentData = videoData
            .filter((item) => item.category === app.category)
            .sort((a, b) => { return a.id - b.id })
    } else {
        currentData = videoData
            .filter((item) => item.subCategory === app.subCategory && item.category === app.category)
            .sort((a, b) => { return a.id - b.id })
    }

    const openVideo = (videoId) => {
        navigate(`/video/${videoId}`, { replace: true })
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

    const handlleEditClick = (id) => {
        setSelectedId(id)
    }

    return (
        <>
            {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
            {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            <Box sx={{ display: 'flex', direction: 'row', flexWrap: 'wrap' }}>
                {currentData.map((item) => (
                    <Card key={item._id} sx={{ maxWidth: 250, padding: 1 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: deepOrange[600] }} gutterBottom>
                            {item.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} gutterBottom>
                            Published at: {item.publishedAt}
                        </Typography>
                        <CardActions>
                            {app.email &&
                                <div>
                                    <Tooltip title="Edit Video">
                                        <IconButton onClick={() => handlleEditClick(item._id)}><EditIcon /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Video">
                                        <IconButton onClick={() => deleteVideo(item._id)}><DeleteIcon /></IconButton>
                                    </Tooltip>
                                </div>
                            }
                        </CardActions>
                        <Tooltip title="Play Video">
                            <CardMedia
                                component="img"
                                image={item.thumbnailUrl}
                                alt={item.title}
                                onClick={() => openVideo(item.videoId)}
                            />
                        </Tooltip>

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.publishedAT} {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
}



export default VideoList;