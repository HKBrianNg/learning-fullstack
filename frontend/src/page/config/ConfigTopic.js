import { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box } from '@mui/material'
import Navbar from '../../component/header/Navbar'
import { AppContext, TopicContext } from '../../App'


const columns = [
    { field: 'id', headerName: 'ID', width: 60, align: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'category', headerName: 'Category', width: 100, },
    { field: 'subCategory', headerName: 'Sub Category', width: 120 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'summary', headerName: 'Summary', width: 250 },
    { field: 'contentUrl', headerName: 'Content URL', width: 150 },
    { field: 'content', headerName: 'Content', width: 100 },
    { field: 'updateAt', headerName: 'Update At', width: 80 }
];


function ConfigTopic() {
    const { app } = useContext(AppContext)
    const { topicData } = useContext(TopicContext)

    const rows = topicData.filter((item) => item.category === app.category).sort((a, b) => { return a.id - b.id })


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
                        checkboxSelection={true}
                        disableMultipleSelection={true}
                        disableSelectionOnClick={true}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
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

export default ConfigTopic