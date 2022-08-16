import { useState, useContext } from 'react'
import { AppBar, Container, Box, Toolbar, Typography, Menu, MenuItem, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import SearchVideo from './SearchVideo.js'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { deepOrange } from '@mui/material/colors'
import SelectCategory from './SelectCategory.js'

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
    const [anchorElConfig, setAnchorElConfig] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const openConfig = Boolean(anchorElConfig)
    const openUser = Boolean(anchorElUser)

    const handleConfigMenuClick = (event) => {
        setAnchorElConfig(event.currentTarget)
    }

    const handleConfigClose = () => {
        setAnchorElConfig(null)
    }

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleUserClose = () => {
        setAnchorElUser(null)
    }

    const ConfigMenu = () => {
        return (
            <>

                <Menu anchorEl={anchorElConfig} open={openConfig} onClose={handleConfigClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    {app.email &&
                        <div>
                            <Link to='/config/user' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleConfigClose} onClose={handleConfigClose}>User</MenuItem>
                            </Link>
                            <Link to='/config/topic' style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={handleConfigClose} onClose={handleConfigClose}>Topic</MenuItem>
                            </Link>
                        </div>
                    }
                </Menu>
            </>
        )
    }

    const UserMenu = () => {
        return (
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
        )
    }


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar variant='dense' disableGutters >
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
                        <DisplayLogo />
                    </Box>
                    <Box sx={{ flexGrow: 1, margin: 1, display: 'flex' }}>
                        <SelectCategory />
                    </Box>
                    <Box sx={{ flexGrow: 2, margin: 1, display: { xs: 'none', md: 'flex' } }}>
                        <SearchVideo />
                    </Box>
                    {app.email &&
                        <MenuIcon onClick={handleConfigMenuClick} sx={{ m: 2 }} />
                    }
                    <ConfigMenu />
                    {app.email
                        ? (<Avatar onClick={handleUserClick} sx={{ bgcolor: deepOrange[500] }}>{app.email.substring(0, 1)}</Avatar>)
                        : (<Avatar onClick={handleUserClick} sx={{}} />)
                    }
                    <UserMenu />
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
