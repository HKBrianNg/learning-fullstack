import { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import { getVideosAPI } from '../../api/video'
import { getTopicsAPI } from '../../api/topic'
import { AppContext, TopicContext, VideoContext } from '../../App'
import ShowTab from './ShowTab'
import Navbar from '../../component/header/Navbar'
import { SysMsg } from '../../constant'


function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { app } = useContext(AppContext)
    const { topicData, setTopicData } = useContext(TopicContext)
    const { setVideoData } = useContext(VideoContext)
    const [isConfigReady, setIsConfigReady] = useState(false)


    const getTopics = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getTopicsAPI()
        if (okStatus) {
            if (data.length > 0) {
                setTopicData(data)
            } else {
                setErrorMessage(SysMsg[0])
            }
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const getVideos = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getVideosAPI()
        if (okStatus) {
            setVideoData(data)
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const getConfigData = async (callback) => {
        await getTopics()
        await getVideos()
        callback()
    }

    const setupConfig = () => {
        setIsConfigReady(true)
        console.log("System is ready.")
    }

    useEffect(() => {
        console.log("home useffect")
        getConfigData(function () {
            setupConfig()
        })
    }, [])

    console.log("The app & topic data:", app, topicData)
    return (
        <>
            <Navbar />
            <Box sx={{ width: '100%', postion: 'sticky' }}>
                {isConfigReady && <ShowTab />}
                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            </Box>
        </>
    )
}

export default Home



