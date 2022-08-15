import { useState, useEffect, useContext } from 'react';
import { Container, Stack, Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Navbar from '../../component/header/Navbar'
import { data as AppService } from '../../data/AppServiceData'
import { data as DevOps } from '../../data/DevOpsData'
import { data as CICD } from '../../data/CICDData'
import { data as IDE } from '../../data/IDEData'
import { data as GitHub } from '../../data/GitHubData'
import { data as Docker } from '../../data/DockerData'
import { data as React } from '../../data/ReactData'
import { data as MERN } from '../../data/MERNData'
import { data as Microservices } from '../../data/MicroservicesData'
import { videoCategory } from '../../constant'
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
    const [value, setValue] = useState('0');
    const [filter, setFilter] = useState(videoCategory[0])
    const { topicData, setTopicData } = useContext(TopicContext)
    const { setVideoData } = useContext(VideoContext)
    const { app, setApp } = useContext(AppContext)
    const [selectedId, setSelectedId] = useState("-1")

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


    useEffect(() => {
        getTopics()
        getVideos()
    }, [])



    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter(videoCategory[newValue])
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
                            // overflow: "hidden",
                            overflowY: "scroll",
                        }}>
                            <VideoList filter={filter} setSelectedId={setSelectedId} />
                        </Box>
                    </Stack>

                </Container>
            </>
        )
    }


    const ShowTabPanel = () => {
        let AppService1
        if (topicData.length > 0) {
            AppService1 = topicData.filter((item) => item.category === "IT" && item.subCategory === "AppService")
            console.log("topicData:", AppService1)
        }
        return (
            <>
                {topicData.length > 0 &&
                    <div>
                        <TabPanel value='0'>
                            <TabTemplate data={AppService} filter={filter} />
                        </TabPanel>
                        <TabPanel value='1'>
                            <TabTemplate data={DevOps} filter={filter} />
                        </TabPanel>
                        <TabPanel value='2'>
                            <TabTemplate data={CICD} filter={filter} />
                        </TabPanel>
                        <TabPanel value='3'>
                            <TabTemplate data={IDE} filter={filter} />
                        </TabPanel>
                        <TabPanel value='4'>
                            <TabTemplate data={GitHub} filter={filter} />
                        </TabPanel>
                        <TabPanel value='5'>
                            <TabTemplate data={Docker} filter={filter} />
                        </TabPanel>
                        <TabPanel value='6'>
                            <TabTemplate data={React} filter={filter} />
                        </TabPanel>
                        <TabPanel value='7'>
                            <TabTemplate data={MERN} filter={filter} />
                        </TabPanel>
                        <TabPanel value='8'>
                            <TabTemplate data={Microservices} filter={filter} />
                        </TabPanel>
                    </div>
                }
            </>
        )
    }

    return (
        <>
            <Navbar />
            <Box sx={{ width: '100%', typography: 'body1', position: "sticky" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                        <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile value={value}>
                            <Tab label="Application Service" value="0" />
                            <Tab label="DevOps" value="1" />
                            <Tab label="CICD" value="2" />
                            <Tab label="IDE" value="3" />
                            <Tab label="GitHub" value="4" />
                            <Tab label="Docker" value="5" />
                            <Tab label="React" value="6" />
                            <Tab label="MERN" value="7" />
                            <Tab label="Microservices" value="8" />
                        </TabList>
                    </Box>
                    <ShowTabPanel />
                </TabContext>
                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            </Box>
        </>
    );
}

export default Home



