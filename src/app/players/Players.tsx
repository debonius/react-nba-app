import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import player from '../api/types/player';
import { useEffect } from 'react';

type players = player[];

function createData(
    name: string,
    position: string,
    team: string,
    division: string,
) {
    return { name, position, team, division };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 4.3),
//     createData('Eclair', 262, 16.0, 6.0),
//     createData('Cupcake', 305, 3.7, 4.3),
//     createData('Gingerbread', 356, 16.0, 3.9),
// ];

export default function PlayersList(players: players) {

    useEffect(() => {
        console.log('players: ', players);
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Position</TableCell>
                        <TableCell align="right">Team</TableCell>
                        <TableCell align="right">Division</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map(player => (
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