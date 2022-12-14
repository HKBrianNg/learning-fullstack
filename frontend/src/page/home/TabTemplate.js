import { useState, useContext } from 'react'
import { Container, Stack, Box } from '@mui/material';
import VideoList from './VideoList'
import SetupVideo from './SetupVideo';
import TopicDetails from './TopicDetails'
import { AppContext } from '../../App'


const TabTemplate = ({ data }) => {
    const [selectedId, setSelectedId] = useState("-1")
    const { app } = useContext(AppContext)


    return (
        <Container maxWidth='xl'>
            {app.subCategory === 'ALL' ?
                (
                    <Stack display='flex' direction={{ xs: 'column', md: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: 600, overflowY: "scroll", }}>
                            <VideoList setSelectedId={setSelectedId} />
                        </Box>
                    </Stack>
                ) :
                (
                    <Stack display='flex' direction={{ xs: 'column', md: 'row' }} >
                        {(selectedId === "-1") &&
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: 600, overflowY: "scroll", }}>
                                <TopicDetails data={data} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        {(selectedId === "0") &&
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: 600, overflowY: "scroll", }}>
                                <SetupVideo selectedId={selectedId} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        {(selectedId !== "0" && selectedId !== "-1") &&
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: 600, overflowY: "scroll", }}>
                                <SetupVideo selectedId={selectedId} setSelectedId={setSelectedId} />
                            </Box>
                        }
                        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: 600, overflowY: "scroll", }}>
                            <VideoList setSelectedId={setSelectedId} />
                        </Box>
                    </Stack>
                )
            }

        </Container >
    )
}

export default TabTemplate