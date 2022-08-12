import { useState, useContext } from 'react'
import { AppBar, Container, Box, Toolbar, Typography, Menu, MenuItem, Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import SearchVideo from './SearchVideo.js'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { deepOrange } from '@mui/material/colors'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate } from 'react-router-dom'


const DisplayLogo = () => {
    return (
        <Link to='/home' style={{ textDecoration: 'none', display: 'flex', color: 'white', marginRight: 1, }}>
            <LocalLibraryIcon fontSize="large" sx={{ mr: '8px', }} />
            <Typography variant='h6' sx={{ marginRight: 1 }}>Learning</Typography>
        </Link>
    );
}


function Navbar() {
    const { app } = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const open = Boolean(anchorEl)
    const openUser = Boolean(anchorElUser)
    const navigate = useNavigate()

    // const [user, setUser] = useState(null)

    const handleSetupMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleSetupMenuClose = () => {
        setAnchorEl(null)
    }

    const handleUserClose = () => {
        setAnchorElUser(null)
    }

    const handleVideoClick = () => {
        navigate('/setup/video/0', { replace: true })
    }

    const SetupMenu = () => {
        return (
            <>
                <MenuIcon onClick={handleSetupMenuClick} />
                <Menu anchorEl={anchorEl} open={open} onClose={handleSetupMenuClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Link to='/setup/video' style={{ textDecoration: 'none' }}>
                        <MenuItem onClick={handleSetupMenuClose} onClose={handleSetupMenuClose}>Setup Video</MenuItem>
                    </Link>
                    <Link to='/setup/tab' style={{ textDecoration: 'none' }}>
                        <MenuItem onClick={handleSetupMenuClose} onClose={handleSetupMenuClose}>Setup Tab</MenuItem>
                    </Link>
                </Menu>
            </>
        )
    }


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar variant='dense' disableGutters >
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'flex' }, }}>
                        <SetupMenu />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                        <SetupMenu />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 2, margin: 1, display: { xs: 'none', md: 'flex' } }}>
                        <SearchVideo />
                    </Box>
                    <IconButton size='large' onClick={handleVideoClick}>
                        <AddCircleOutlineIcon fontSize='large' sx={{ color: 'white' }} />
                    </IconButton>
                    {app.email ?
                        (<Avatar onClick={handleUserClick} sx={{ bgcolor: deepOrange[500] }}>{app.email.substring(0, 1)}</Avatar>) :
                        (<Avatar onClick={handleUserClick} sx={{}} />)
                    }
                    <Menu anchorEl={anchorElUser} open={openUser} onClose={handleUserClose} >
                        {!app.email &&
                            <Link to='/auth/signup' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Signup</MenuItem>
                            </Link>
                        }
                        {app.email ?
                            (<Link to='/auth/logout' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Logout</MenuItem>
                            </Link>) :
                            (
                                <Link to='/auth/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleUserClose} onClose={handleUserClose}>Login</MenuItem>
                                </Link>
                            )
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

export default Navbar
