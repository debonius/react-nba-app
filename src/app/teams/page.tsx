'use client';
import { useEffect } from 'react';

function Heading() {
    return (
        <h1>All teams</h1>
    )
}

export default function Teams() {

    async function fetchTeams() {
        const url = 'https://free-nba.p.rapidapi.com/teams?page=0';
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

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTeams()
    }, [])


    return (
        <>
            <Heading />
        </>
    )
}