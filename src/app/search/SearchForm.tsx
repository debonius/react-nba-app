'use client';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from '../components/shared/Button';
import { players } from '../api/types/player';

export default function SearchPlayerForm() {
    const [playerInput, setPlayerInput] = useState<string>('');
    const [foundPlayers, setFoundPlayers] = useState<players>([]);
    let btnText: string = 'Search';

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayerInput(e.target.value);
    }

    async function handleSearchButton() {
        if (playerInput !== '' && playerInput.length > 0) {
            const url = `https://free-nba.p.rapidapi.com/players?page=1&per_page=25&search=${playerInput}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '0c008c7080msh10a514646ed797cp1182abjsn21ea7e48e462',
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log('result: ', result);
                setFoundPlayers(result.data.sort((prev, next) => {
                    const A = prev.last_name.toUpperCase();
                    const B = next.last_name.toUpperCase();
                    return A < B ? -1 : A > B ? +1 : 0;
                }));
            } catch (error) {
                console.error(error);
            }
        }
    }

    function Results() {
        return (
            <>
                <p>input value: {playerInput}</p>
                <ul>
                    {foundPlayers !== undefined &&
                        foundPlayers.map(player => (
                            <li key={player.id}>{player.first_name + ' ' + player.last_name}</li>
                        ))
                    }
                </ul>
            </>
        )
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='search'
            >
                <TextField
                    id="search-name"
                    label="Search player"
                    type="search"
                    variant="standard"
                    value={playerInput}
                    onChange={handleChangeInput}
                />
                <TextField
                    id="search-team"
                    label="Search team"
                    type="search"
                    variant="standard"
                />
                <BasicButton
                    btnText={btnText}
                    handleSearchButton={handleSearchButton}
                />
            </Box>
            <Results />
        </>
    );
}