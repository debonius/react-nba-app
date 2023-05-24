import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({ btnText, handleClick }) {

    return (
        <Button variant="contained" onClick={handleClick}>{btnText}</Button>
    );
}