import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from '../components/shared/Button';

export default function SearchPlayerForm() {
    btnText = 'Search';
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="standard-search-by-name"
                label="Search player"
                type="search"
                variant="standard"
            />
            <TextField
                id="standard-search-by-team"
                label="Search team"
                type="search"
                variant="standard"
            />
            <BasicButton btnText={btnText} />
        </Box>
    );
}