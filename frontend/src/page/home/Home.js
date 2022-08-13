import { useState, useEffect, useContext } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Navbar from '../../component/header/Navbar'
import TabTemplate from './TabTemplate'
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
import { VideoContext, AppContext } from '../../App'
import SetupVideo from '../setup/SetupVideo';


function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [value, setValue] = useState('0');
    const [filter, setFilter] = useState(videoCategory[0])
    const { setVideoData } = useContext(VideoContext)
    const { app, setApp } = useContext(AppContext)


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
        getVideos()
    }, [])



    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter(videoCategory[newValue])
        setApp({ ...app, currentTab: value })
    };


    const ShowTabPanel = () => {
        return (
            <>
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



