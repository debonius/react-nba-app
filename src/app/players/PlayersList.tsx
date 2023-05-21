import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

export default function PlayersList({ playersList }) {
    const headers = [
        { id: 1, value: 'Name' },
        { id: 2, value: 'Position' },
        { id: 3, value: 'Team' },
        { id: 4, value: 'Division' }
    ];

    // useEffect(() => {
    // }, [playersList]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableCell key={header.id}>{header.value}</TableCell>
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {playersList.map(player => (
                        <TableRow
                            key={player.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {player.first_name + ' ' + player.last_name}
                            </TableCell>
                            <TableCell align="right">{player.position}</TableCell>
                            <TableCell align="right">{player.team.full_name}</TableCell>
                            <TableCell align="right">{player.team.division}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}