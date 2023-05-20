import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchPlayerForm() {
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
        </Box>
    );
}