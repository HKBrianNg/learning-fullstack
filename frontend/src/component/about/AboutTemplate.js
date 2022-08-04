import React, { useState } from 'react';
import { Container, Box, Stack, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoInfo from '../video/VideoInfo';
import { grey } from '@mui/material/colors';


function AboutTemplate({ data, filter }) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <>
            <Container maxWidth='xl'>
                <Stack display='flex' direction={{ xs: 'column', md: 'row' }} >
                    <Box sx={{ flex: 1, padding: 1 }}>
                        <Paper padding={3}>
                            <Typography variant="h4" gutterBottom component="div" align='center'>
                                {data.title}
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div" sx={{ paddingX: 2 }} >
                                {data.summary}
                            </Typography>
                            <Typography variant='body1' gutterBottom component="div" sx={{ padding: 2, color: grey[600] }}>
                                {data.content}
                            </Typography>
                        </Paper>
                    </Box>
                    <Box sx={{ flex: 2, padding: 1 }}>
                        {data.items.map((item) => (
                            <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{item.summary}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {item.content.substring(0, 4) === 'http'
                                        ? (<Link target="_blank" rel="noopener" href={item.content}>{item.content}</Link>)
                                        : (item.content)
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                    <Box sx={{ flex: 1, padding: 1, height: 700, overflow: "hidden", overflowY: "scroll" }}>
                        <VideoInfo filter={filter} />
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default AboutTemplate;