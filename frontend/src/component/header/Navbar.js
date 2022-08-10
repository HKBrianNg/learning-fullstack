import React, { useState } from 'react';
import { AppBar, Container, Box, Toolbar, Typography, Button, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchVideo from './SearchVideo.js';
import { Link } from 'react-router-dom';


const DisplayLogo = () => {
    return (
        <Link to='/home' style={{ textDecoration: 'none', display: 'flex', color: 'white', marginRight: 1, }}>
            <LocalLibraryIcon fontSize="large" sx={{ mr: '8px', }} />
            <Typography variant='h6' sx={{ marginRight: 1 }}>Learning</Typography>
        </Link>
    );
}


function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);

    const [user, setUser] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElUser(null);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar variant='dense' disableGutters >
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'flex' }, }}>
                        <Link to='/about' style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'white' }}>About</Button>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                        <MenuIcon onClick={handleClick} />
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
                            <Link to='/about' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleClose} onClose={handleClose}>About</MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 2, margin: 1, display: { xs: 'none', md: 'flex' } }}>
                        <SearchVideo />
                    </Box>
                    <Avatar onClick={handleUserClick} sx={{}} src={user} />
                    <Menu anchorEl={anchorElUser} open={openUser} onClose={handleUserClose} >
                        <Link to='/auth/signup' style={{ textDecoration: 'none' }}>
                            <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Signup</MenuItem>
                        </Link>
                        {user ?
                            (<Link to='/auth/logout' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Logout</MenuItem>
                            </Link>) :
                            (<Link to='/auth/login' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Login</MenuItem>
                            </Link>)
                        }
                    </Menu>
                </Toolbar>
                <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, padding: 0, }}>
                    <Box sx={{ flexGrow: 1, margin: 1, alignItems: 'center' }}>
                        <SearchVideo />
                    </Box>
                </Toolbar>

            </Container>
        </AppBar>
    );
}

export default Navbar;
