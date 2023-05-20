'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/shared/Navigation';
import team from '../api/types/teams';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const page = 1;

function Heading() {
    return (
        <h1>All teams</h1>
    )
}

function Pagination({ handleGoToNextPage, handleGoToPrevPage }) {
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

type teams = team[];

export default function Teams() {
    const [teams, setTeams] = useState<teams>([]);

    function handleGoToPrevPage() {
        fetchTeams(1);
    }

    function handleGoToNextPage() {
        fetchTeams(2);
    }

    async function fetchTeams(page: number) {
        const url = `https://free-nba.p.rapidapi.com/teams?page=${page}`;
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
            console.log(result);
            setTeams(result.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTeams(page)
    }, [])


    return (
        <>
            <Heading />
            <Navigation />
            <Pagination
                handleGoToPrevPage={handleGoToPrevPage}
                handleGoToNextPage={handleGoToNextPage}
            />
            <div className='list'>
                <ul>
                    {teams && teams.map(team => (
                        <li key={team.id} className='list__row teams'>
                            <Image
                                src={`/img/teams/${team.abbreviation}.svg`}
                                alt={team.full_name + ' logo'}
                                width={32}
                                height={32}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/img/ball.svg";
                                }}
                            />
                            <span className='team-name'>{team.full_name}</span>
                            <span>({team.abbreviation})</span>
                            <span>- {team.division}</span>
                            <span className="text--shadow">{team.city}</span>
                        </li>
                    ))}
                </ul>
            </div >
        </>
    )
}