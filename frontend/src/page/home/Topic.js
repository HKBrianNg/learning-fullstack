import React, { useState } from 'react';
import { Box, Stack, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Link, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'


function Topic({ data, setSelectedId }) {
    const [expanded, setExpanded] = useState(false)


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handleCreateClick = () => {
        setSelectedId("0")
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Paper padding={3}>
                <Stack justifyContent='center' alignItems='center' direction='row'>
                    <Typography variant="h4" gutterBottom component="div" align='center'>
                        {data.title}
                    </Typography>
                    <Tooltip title="Add Video">
                        <IconButton size='large' onClick={handleCreateClick} edge="end" sx={{ pb: 3 }}>
                            <AddCircleOutlineIcon fontSize='medium' sx={{ color: 'primary' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Typography variant="h6" gutterBottom component="div" sx={{ paddingX: 2 }} >
                    {data.summary}
                </Typography>
                <Typography variant='body1' gutterBottom component="div" sx={{ padding: 2, color: grey[600] }}>
                    {data.content}
                </Typography>
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
            </Paper>
        </Box>
    )
}

export default Topic