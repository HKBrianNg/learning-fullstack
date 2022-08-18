import { useState, useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Tooltip, IconButton, Stack, Typography } from '@mui/material'
import Navbar from '../../component/header/Navbar'
import { AppContext, TopicContext } from '../../App'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SetupTopic from './SetupTopic';
import CircularProgress from '@mui/material/CircularProgress'
import { SysMsg } from '../../constant'
import { getTopicsAPI, deleteTopicAPI } from '../../api/topic'


function TopicList() {
    const { app } = useContext(AppContext)
    const { topicData, setTopicData } = useContext(TopicContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedId, setSelectedId] = useState('0')
    const [dirtyFlag, setDirtyFlag] = useState(false)


    const getTopics = async () => {
        setIsLoading(true)
        setErrorMessage('')
        const { okStatus, data } = await getTopicsAPI()
        if (okStatus) {
            if (data.length > 0) {
                setTopicData(data)
            } else {
                setErrorMessage(SysMsg[0])
            }
        }
        else {
            setErrorMessage(data)
        }
        setIsLoading(false)
    }

    const deleteTopic = async (id) => {
        const { okStatus, data } = await deleteTopicAPI(id)
        setIsLoading(true)
        setErrorMessage('')
        if (okStatus) {
            const newTopicData = topicData.filter((item) => (item._id !== id))
            setTopicData(newTopicData)
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
        deleteTopic(id)
    }

    useEffect(() => {
        // console.log("TopicList useffect")
        if (dirtyFlag) {
            setDirtyFlag(false)
            getTopics()
        }

    }, [dirtyFlag])

    const data = topicData.filter((item) => item.category === app.category).sort((a, b) => { return a.id - b.id })


    const columns = [
        { field: '_id', headerName: '_ID', width: 220, align: 'center', headerClassName: 'super-app-theme--header', hide: false },
        // { field: 'id', headerName: 'ID', width: 60, align: 'center' },
        // { field: 'category', headerName: 'Category', width: 100, },
        { field: 'subCategory', headerName: 'Sub Category', width: 120 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'summary', headerName: 'Summary', width: 300 },
        {
            field: "edit", headerName: "", sortable: false, width: 50, disableClickEventBubbling: true,
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
            field: "delete", headerName: "", sortable: false, width: 50, disableClickEventBubbling: true,
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


    // console.log("last clicked id", selectedId)

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
                            // onSelectionModelChange={(ids) => {
                            //     const selectedIDs = new Set(ids)
                            //     const selectedRows = data.filter((row) => selectedIDs.has(row.id))
                            //     setSelectedRows(selectedRows)
                            // }}
                            checkboxSelection={false}
                            disableMultipleSelection={true}
                            disableSelectionOnClick={true}
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        // sx={{
                        //     boxShadow: 2,
                        //     border: 1,
                        //     borderColor: 'primary.light',
                        //     '& .MuiDataGrid-cell:hover': {
                        //         color: 'primary.main',
                        //     },
                        // }}
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

export default TopicList