import React, { useContext } from 'react';
import { Box, Stack, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { AppContext } from '../../App';


function TopicDetails({ data, setSelectedId }) {
    const { app } = useContext(AppContext)

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
                    {app.email &&
                        <Tooltip title="Add Video">
                            <IconButton size='large' onClick={handleCreateClick} edge="end" sx={{ pb: 3 }}>
                                <AddCircleOutlineIcon fontSize='medium' sx={{ color: 'primary' }} />
                            </IconButton>
                        </Tooltip>
                    }
                </Stack>
                <Typography variant="h6" gutterBottom component="div" sx={{ padding: 2 }} >
                    {data.summary}
                </Typography>
                <Typography variant='body1' gutterBottom component="div" sx={{ padding: 2, color: grey[600] }}>
                    {data.content}
                </Typography>
            </Paper>
        </Box>
    )
}

export default TopicDetails