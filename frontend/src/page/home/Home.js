import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Navbar from '../../component/header/Navbar'
import TabTemplate from './TabTemplate'
import { data as AppServiceData } from '../../data/AppServiceData'
import { data as DevOpsData } from '../../data/DevOpsData'
import { data as CICDData } from '../../data/CICDData'
import { data as IDEData } from '../../data/IDEData'
import { data as GitHubData } from '../../data/GitHubData'
import { data as DockerData } from '../../data/DockerData'
import { data as ReactData } from '../../data/ReactData'
import { data as MERNData } from '../../data/MERNData'
import { data as MicroservicesData } from '../../data/MicroservicesData'


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
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Navbar />
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
                    <TabTemplate data={AppServiceData} filter={{ category: 'IT', subCategory: 'Application Service' }} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabTemplate data={DevOpsData} filter={{ category: 'IT', subCategory: 'DevOps' }} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TabTemplate data={CICDData} filter={{ category: 'IT', subCategory: 'CICD' }} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TabTemplate data={IDEData} filter={{ category: 'IT', subCategory: 'IDE' }} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TabTemplate data={GitHubData} filter={{ category: 'IT', subCategory: 'GitHub' }} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <TabTemplate data={DockerData} filter={{ category: 'IT', subCategory: 'Docker' }} />
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <TabTemplate data={ReactData} filter={{ category: 'IT', subCategory: 'React' }} />
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <TabTemplate data={MERNData} filter={{ category: 'IT', subCategory: 'MERN' }} />
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <TabTemplate data={MicroservicesData} filter={{ category: 'IT', subCategory: 'Microservices' }} />
                </TabPanel>
            </Box>
        </>
    );
}

export default Home;