import { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'
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
import { VideoContext } from '../../App'


function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component='span'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Home() {
    const [value, setValue] = useState(0)
    const [filter, setFilter] = useState(videoCategory[0])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { setVideoData } = useContext(VideoContext)

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
        setValue(newValue)
        setFilter(videoCategory[newValue])
    }

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs position="sticky" variant="scrollable" scrollButtons="auto"
                            allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Application Service" {...a11yProps(0)} />
                            <Tab label="DevOps" {...a11yProps(1)} />
                            <Tab label="CICD" {...a11yProps(2)} />
                            <Tab label="IDE" {...a11yProps(3)} />
                            <Tab label="GitHub" {...a11yProps(4)} />
                            <Tab label="Docker" {...a11yProps(5)} />
                            <Tab label="React" {...a11yProps(6)} />
                            <Tab label="MERN" {...a11yProps(7)} />
                            <Tab label="Microservices" {...a11yProps(8)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <TabTemplate data={AppService} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabTemplate data={DevOps} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabTemplate data={CICD} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TabTemplate data={IDE} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <TabTemplate data={GitHub} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <TabTemplate data={Docker} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <TabTemplate data={React} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <TabTemplate data={MERN} filter={filter} />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <TabTemplate data={Microservices} filter={filter} />
                    </TabPanel>
                </Box>
                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
            </Container>
        </>
    );
}

export default Home;