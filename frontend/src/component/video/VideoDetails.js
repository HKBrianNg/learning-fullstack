import React from 'react'
import Navbar from '../header/Navbar';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player";
import { Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './VideoDetails.css';

const youtubeUrl = "https://www.youtube.com/watch?v=";

function VideoDetails() {
    const { id } = useParams();
    const videoUrl = `${youtubeUrl}${id}`;

    return (
        <>
            <Navbar />
            <Link to='/'>
                <ArrowBackIcon fontSize='large' />
            </Link>
            <Container maxWidth="lg">
                <div className='playerWrapper'>
                    <ReactPlayer className='react-player' controls={true} url={videoUrl} height="75%" width="100%" />
                </div>
            </Container>
        </>
    )
}

export default VideoDetails;