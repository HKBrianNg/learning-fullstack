import { useState, useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Tooltip, IconButton, Stack, Typography } from '@mui/material'
import Navbar from '../../component/header/Navbar'
import { AppContext, UserContext } from '../../App'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SetupTopic from './SetupTopic';
import CircularProgress from '@mui/material/CircularProgress'
import { SysMsg } from '../../constant'
import { getUsersAPI, deleteUserAPI } from '../../api/user'


function UserList() {
    const { app } = useContext(AppContext)
    const { userData, setUserData } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedId, setSelectedId] = useState('0')
    const [dirtyFlag, setDirtyFlag] = useState(true)


    const getUsers = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getUsersAPI()
        if (okStatus) {
            if (data.length > 0) {
                setUserData(data)
            } else {
                setErrorMessage(SysMsg[0])
            }
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const deleteUser = async (id) => {
        const { okStatus, data } = await deleteUserAPI(id)
        setIsLoading(true)
        setErrorMessage('')
        if (okStatus) {
            const newUserData = userData.filter((item) => (item._id !== id))
            setUserData(newUserData)
            setErrorMessage('')
        } else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const handlleEditClick = (id) => {
        setSelectedId(id)
    }

    const handleDeleteClick = (id) => {
        deleteUser(id)
    }

    useEffect(() => {
        console.log("UserList useffect")
        if (dirtyFlag) {
            setDirtyFlag(false)
            getUsers()
        }

    }, [])

    // const data = userData.sort((a, b) => { return a.name - b.name })
    const data = userData

    const columns = [
        { field: '_id', headerName: '_ID', width: 220, align: 'center', headerClassName: 'super-app-theme--header', hide: false },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        // { field: 'password', headerName: 'Password', width: 300 },
        {
            field: "edit", headerName: "Edit", sortable: false, width: 50, disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <>
                        {(app.email) &&
                            <Tooltip title="Edit Video">
                                <IconButton onClick={() => handlleEditClick(params.row._id)}><EditIcon /></IconButton>
                            </Tooltip>
                        }
                    </>
                )
            }
        },
        {
            field: "delete", headerName: "Delete", sortable: false, width: 50, disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <>
                        {(app.email) &&
                            <Tooltip title="Delete Video">
                                <IconButton onClick={() => handleDeleteClick(params.row._id)}><DeleteIcon /></IconButton>
                            </Tooltip>
                        }
                    </>
                )
            }
        }
    ];


    console.log("last clicked id & userData:", selectedId, userData)

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                {isLoading && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>}
                {errorMessage && <Typography variant="h6" component="h6" align='left' color='red' m={1} >{errorMessage}</Typography>}
                <Stack display='flex' direction={{ xs: 'column', md: 'row' }} sx={{ m: 1 }} >
                    <Box sx={{
                        flex: 2,
                        height: 450, width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: 'rgba(255, 7, 0, 0.55)',
                        },
                    }}>
                        <DataGrid
                            density='compact'
                            checkboxSelection={false}
                            disableMultipleSelection={true}
                            disableSelectionOnClick={true}
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}

                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <SetupTopic selectedId={selectedId} setSelectedId={setSelectedId} setDirtyFlag={setDirtyFlag} />
                    </Box>
                </Stack>
            </Container>

        </>
    );
}

export default UserList