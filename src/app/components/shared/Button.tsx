import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({ btnText }) {
    return (
        <Button variant="contained">{btnText}</Button>
    );
}