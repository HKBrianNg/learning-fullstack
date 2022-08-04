import React from 'react'
import Navbar from '../header/Navbar';
import { Container, Box } from '@mui/material';
import VideoInfo from '../video/VideoInfo';

function Home() {

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Box sx={{ flexGrow: 1, padding: 1, display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap' }}>
                    <VideoInfo filter={null} />
                </Box>
                <Box sx={{ flexGrow: 1, padding: 1, display: { xs: 'flex', md: 'none' }, flexWrap: 'wrap' }}>
                    <VideoInfo filter={null} />
                </Box>
            </Container>

        </>

    );
}

export default Home;