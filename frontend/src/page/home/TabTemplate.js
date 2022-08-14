import { useState } from 'react'
import { Container, Stack, Box } from '@mui/material'
import Summary from '../../component/summary/Summary'
import VideoInfo from '../../component/video/VideoInfo'
import SetupVideo from '../setup/SetupVideo'


function TabTemplate({ data, filter }) {
    const [selectedId, setSelectedId] = useState("-1")

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
                            <Summary data={data} setSelectedId={setSelectedId} />
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
                        <VideoInfo filter={filter} setSelectedId={setSelectedId} />
                    </Box>
                </Stack>

            </Container>
        </>
    )
}

export default TabTemplate;