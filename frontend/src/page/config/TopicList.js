import { useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Tooltip, IconButton } from '@mui/material'
import Navbar from '../../component/header/Navbar'
import { AppContext, TopicContext } from '../../App'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'


function TopicList() {
    const { app } = useContext(AppContext)
    const { topicData } = useContext(TopicContext)
    const [selectedRows, setSelectedRows] = useState([]);

    const data = topicData.filter((item) => item.category === app.category).sort((a, b) => { return a.id - b.id })

    const handlleEditClick = (selectedId) => {
        console.log("edit is clicked", selectedId)
    }

    const handleDeleteClick = (selectedId) => {
        console.log("delete is clicked", selectedId)
    }

    const columns = [
        { field: '_id', headerName: '_ID', width: 220, align: 'center', headerClassName: 'super-app-theme--header' },
        { field: 'id', headerName: 'ID', width: 60, align: 'center' },
        { field: 'category', headerName: 'Category', width: 100, },
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



    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Box sx={{
                    height: 400, width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: 'rgba(255, 7, 0, 0.55)',
                    },
                }}>
                    <DataGrid
                        density='compact'
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids)
                            const selectedRows = data.filter((row) => selectedIDs.has(row.id))
                            setSelectedRows(selectedRows)
                        }}
                        checkboxSelection={true}
                        disableMultipleSelection={true}
                        disableSelectionOnClick={true}
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Box>
            </Container>

        </>
    );
}

export default TopicList