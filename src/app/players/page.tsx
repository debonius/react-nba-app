'use client';
import Navigation from '../components/shared/Navigation';
import { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayersList from './Players';
import player from '../api/types/player';

type players = player[];

export default function Scores() {
    const [page, setPage] = useState<number>(0);
    const [players, setPlayers] = useState<players>([]);
    const [changedPage, setChangedPage] = useState<boolean>(false);

    const handleGoToPrevPage = () => {
        setPage(page - 1);
        setChangedPage(true);
    }

    const handleGoToNextPage = () => {
        setPage(page + 1);
        setChangedPage(true);
    }

    function Pagination() {
        return (
            <div className='pagination'>
                <ArrowBackIosIcon
                    onClick={handleGoToPrevPage}
                    color='primary'
                    className='pagination__btn-change-page button'
                />
                <ArrowForwardIosIcon
                    className='pagination__btn-change-page button'
                    onClick={handleGoToNextPage}
                    color='primary'
                />
            </div>
        )
    }

    async function fetchPlayers(page: number) {
        const url = `https://free-nba.p.rapidapi.com/players?page=${page}&per_page=25`;
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
            // console.log(result);
            setPlayers(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPlayers(page);
    }, [page, changedPage]);

    return (
        <>
            <h1>NBA Players list</h1>
            <Pagination />
            <PlayersList players={players} />
            <Navigation />
        </>
    )
}