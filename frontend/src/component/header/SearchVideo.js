import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, TextField, Autocomplete, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { videoData } from '../../data/videoData';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    border: "2px solid white",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        border: '2px solid white',
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
}));


function SearchVideo() {
    const [videoId, setVideoId] = useState('');
    const navigate = useNavigate();

    const handleChange = (value) => {
        value && setVideoId(value.videoId);
    }

    const openVideo = () => {

        videoId && navigate(`/home/video/${videoId}`, { replace: true });
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Search>
                <Autocomplete
                    options={videoData}
                    getOptionLabel={(option) => option.title}
                    disablePortal
                    sx={{ input: { color: "white", }, width: '23ch', }}
                    onChange={(event, value) => handleChange(value)}
                    renderInput={(params) => <TextField {...params} />}
                />

                <Button onClick={openVideo}>
                    <SearchOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                </Button>
            </Search>

        </Box>
    )
}

export default SearchVideo;