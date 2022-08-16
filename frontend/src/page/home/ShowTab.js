import { useContext } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { AppContext, TopicContext } from '../../App'
import TabTemplate from './TabTemplate'


function ShowTab() {
    const { app, setApp } = useContext(AppContext)
    const { topicData } = useContext(TopicContext)

    const handleChange = (event, newValue) => {
        setApp({ ...app, subCategory: newValue })
    };

    const data = topicData
        .filter((item) => item.category === app.category)
        .sort((a, b) => { return a.id - b.id })

    console.log("ShowTab():", app.subCategory)
    return (
        <TabContext value={app.subCategory}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile value={app.subCategory}>
                    {data.map((item) => (<Tab key={item._id} label={item.subCategory} value={item.subCategory} />))}
                </TabList>
            </Box>
            {data.map((item) => (
                <TabPanel key={item._id} value={item.subCategory}>
                    <TabTemplate data={item} />
                </TabPanel>
            ))}
        </TabContext>
    )
}

export default ShowTab