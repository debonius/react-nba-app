'use client';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from '../components/shared/Button';
import { players } from '../api/types/player';
import team from '../api/types/teams';
import PlayersList from '../players/PlayersList';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TeamsList from '../components/shared/TeamsList';

export default function SearchPlayerForm() {
    const [page, setPage] = useState<number>(1);
    const [tot_pages, setTot_pages] = useState<number | null>(null);
    const [changedPage, setChangedPage] = useState<boolean>(false);
    const [playerInput, setPlayerInput] = useState<string>('');
    const [teamInput, setTeamInput] = useState<string>('');
    const [foundPlayers, setFoundPlayers] = useState<players>([]);
    const [foundTeams, setFoundTeams] = useState<team[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    let btnText: string = 'Search';

    const url = `https://free-nba.p.rapidapi.com/players?page=${page}&per_page=25&search=${playerInput}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c008c7080msh10a514646ed797cp1182abjsn21ea7e48e462',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    const handleGoToPrevPage = () => {
        setPage(page - 1);
        setChangedPage(true);
        handleSearchButton();
    }

    const handleGoToNextPage = () => {
        setPage(page + 1);
        setChangedPage(true);
        handleSearchButton();
    }

    function Pagination() {
        return (
            <div className='pagination'>
                {page > 1 &&
                    <ArrowBackIosIcon
                        onClick={handleGoToPrevPage}
                        color='primary'
                        className='pagination__btn-change-page button'
                    />
                }
                <span>Page {page} {tot_pages && `of ${tot_pages}`}</span>
                {page <= tot_pages &&
                    <ArrowForwardIosIcon
                        className='pagination__btn-change-page button'
                        onClick={handleGoToNextPage}
                        color='primary'
                    />}
            </div>
        )
    }

    function handleChangePlayerInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayerInput(e.target.value);
    }

    function handleChangeTeamInput(e: React.ChangeEvent<HTMLInputElement>) {
        setTeamInput(e.target.value);
    }

    async function handleSearchButton() {
        if (playerInput !== '' && teamInput === '') {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log('result: ', result);
                setTot_pages(result.meta.total_pages);
                setFoundPlayers(result.data.sort((prev, next) => {
                    const A = prev.last_name.toUpperCase();
                    const B = next.last_name.toUpperCase();
                    return A < B ? -1 : A > B ? +1 : 0;
                }));
                result.data.length === 0 ? setNoResults(true) : setNoResults(false);
            } catch (error) {
                console.error(error);
            }
        }
        else if (teamInput !== '' && playerInput === '') {
            try {
                const url = `https://free-nba.p.rapidapi.com/teams?page=${page}`;
                const response = await fetch(url, options);
                const result = await response.json();
                console.log('teamInput: ', teamInput);
                setTot_pages(result.meta.total_pages);
                setFoundTeams(result.data.filter(
                    team => {
                        if (team.full_name.toUpperCase().includes(teamInput.toUpperCase())) return team.full_name;
                    })
                );
                result.data.length === 0 ? setNoResults(true) : setNoResults(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function FoundPlayersResults() {
        return (
            <>
                {!noResults && foundPlayers !== undefined &&
                    <TeamsList teams={foundTeams} />
                }
                {noResults === true &&
                    <p>No teams found</p>
                }
            </>
        )
    }

    function FoundTeamsResults() {
        return (
            <>
                <PlayersList playersList={foundPlayers} />
                {noResults === true &&
                    <p>No players found</p>
                }
            </>
        )
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                className='search'
            >
                {teamInput === '' &&
                    <TextField
                        id="search-name"
                        label="Search player"
                        type="search"
                        variant="standard"
                        value={playerInput}
                        onChange={handleChangePlayerInput}
                    />
                }
                {playerInput === '' &&
                    <TextField
                        id="search-team"
                        label="Search team"
                        type="search"
                        variant="standard"
                        value={teamInput}
                        onChange={handleChangeTeamInput}
                    />
                }
                <BasicButton
                    btnText={btnText}
                    handleSearchButton={handleSearchButton}
                />
            </Box>
            {foundPlayers.length > 0 || foundTeams.length > 0 && <Pagination />}
            {foundPlayers.length > 0 &&
                <FoundPlayersResults />
            }

            {foundTeams.length > 0 && <FoundTeamsResults />}
        </>
    );
}