import { useState, useEffect, useContext } from 'react';
import { Container, Stack, Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Navbar from '../../component/header/Navbar'
import { data as React } from '../../data/ReactData'
import CircularProgress from '@mui/material/CircularProgress'
import { getVideosAPI } from '../../api/video'
import { getTopicsAPI } from '../../api/topic'
import { AppContext, TopicContext, VideoContext } from '../../App'
import VideoList from './VideoList'
import SetupVideo from './SetupVideo';
import TopicList from './TopicList'


function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [value, setValue] = useState('AppService')
    const [filter, setFilter] = useState({ category: 'IT', subCategory: 'AppService' })
    const { topicData, setTopicData } = useContext(TopicContext)
    const { setVideoData } = useContext(VideoContext)
    const { app, setApp } = useContext(AppContext)
    const [selectedId, setSelectedId] = useState("-1")
    const [isConfigReady, setIsConfigReady] = useState(false)


    const getTopics = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getTopicsAPI()
        if (okStatus) {

            setTopicData(data)
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


    const getConfigData = async () => {
        await getTopics()
        await getVideos()
        setIsConfigReady(true)
    }

    useEffect(() => {
        getConfigData()
    }, [])



    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter({ ...filter, subCategory: newValue })
        setApp({ ...app, currentTab: value })
    };


    const TabTemplate = ({ data, filter }) => {
        return (
            <>
                <Container maxWidth='xl'>
                    <Stack display='flex' direction={{ xs: 'column', md: 'row' }} >
                        {(selectedId === "-1") &&
                            <Box sx={{
                                display: "flex", flex: 1,
                                flexDirection: "column",
                                height: 600,
                                overflowY: "scroll",
                            }}>
                                <TopicList data={data} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        {(selectedId === "0") &&
                            <Box sx={{
                                display: "flex", flex: 1,
                                flexDirection: "column",
                                height: 600,
                                overflowY: "scroll"
                            }}>
                                <SetupVideo selectedId={selectedId} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        {(selectedId !== "0" && selectedId !== "-1") &&
                            <Box sx={{
                                display: "flex", flex: 1,
                                flexDirection: "column",
                                height: 600,
                                overflowY: "scroll",
                            }}>
                                <SetupVideo selectedId={selectedId} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        <Box sx={{
                            flex: 1, display: "flex",
                            flexDirection: "column",
                            height: 600,
                            overflowY: "scroll",
                        }}>
                            <VideoList filter={filter} setSelectedId={setSelectedId} />
                        </Box>
                    </Stack>

                </Container>
            </>
        )
    }


    const ShowTab = () => {
        const data = topicData
            .filter((item) => item.category === filter.category)
            .sort((a, b) => { return a.id - b.id })

        return (
            <>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                        <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile value={value}>
                            {
                                data.map((item) => (
                                    <Tab key={item._id} label={item.subCategory} value={item.subCategory} />
                                ))
                            }
                        </TabList>
                    </Box>
                    {
                        data.map((item) => (
                            <TabPanel key={item._id} value={item.subCategory}>
                                <TabTemplate data={item} filter={filter} />
                            </TabPanel>
                        ))
                    }
                </TabContext>

            </>
        )
    }


    return (
        <>
            <Navbar />
            <Box sx={{ width: '100%', postion: 'sticky' }}>
                {isConfigReady && <ShowTab />}
                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            </Box>
        </>
    );
}

export default Home



