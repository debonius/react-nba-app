import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({ btnText, handleSearchButton }) {

    return (
        <Button variant="contained" onClick={handleSearchButton}>{btnText}</Button>
    );
}