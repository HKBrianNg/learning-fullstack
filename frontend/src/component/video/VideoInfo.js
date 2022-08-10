import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { videoData } from '../../data/videoData';
import { useNavigate } from 'react-router-dom';


function VideoInfo({ filter }) {
    let navigate = useNavigate();

    let data = videoData;
    if (filter) {
        data = videoData.filter((item) => (item.subCategory === filter.subCategory && item.category === filter.category));
    }

    const openVideo = (id) => {
        navigate(`/home/video/${id}`, { replace: true });
    }

    return (
        <>
            {data.map((item) => (

                <Card key={item.id} sx={{ maxWidth: 250, padding: 2 }}>
                    <CardMedia
                        component="img"
                        // height="200"
                        // width="350"
                        image={item.thumbnailUrl}
                        alt={item.title}
                        onClick={() => openVideo(item.videoId)}
                    />
                    <CardHeader sx={{ color: deepOrange[600], }}
                        avatar={<Avatar sx={{ bgcolor: deepOrange[600], width: 56, height: 56 }}>Save</Avatar>}
                        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                        title={item.title}
                        subheader={item.publishedAt}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                    {/* <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions> */}
                </Card>
            ))}
        </>
    );
}



export default VideoInfo;