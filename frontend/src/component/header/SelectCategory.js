import { useState, useContext } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { grey } from '@mui/material/colors'
import { AppContext } from '../../App'

function SelectCategory() {
    const { app, setApp } = useContext(AppContext)
    const [category, setCategory] = useState(app.category)
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        setCategory(event.target.value)
        setApp({ ...app, category: event.target.value, subCategory: 'ALL' })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div>
            <FormControl variant="outlined" sx={{ minWidth: 110, }} >
                <Select
                    sx={{ color: grey[50], }}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={category}
                    onChange={handleChange}
                >
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="News">News</MenuItem>
                </Select>
            </FormControl>
        </div >
    );
}

export default SelectCategory