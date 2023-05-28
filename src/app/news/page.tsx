'use client';
import { useEffect, useState } from 'react';
import Navigation from '../components/shared/Navigation';

interface news {
    id: number,
    source: 'string',
    title: 'string',
    url: 'string',
}

export default function News() {
    const [results, setResults] = useState<news[]>([]);
    const [receivedResults, setReceivedResults] = useState<boolean>(false);

    async function fetchNews() {
        const URL = 'https://nba-latest-news.p.rapidapi.com/articles?source=nba';
        const OPTIONS = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0c008c7080msh10a514646ed797cp1182abjsn21ea7e48e462',
                'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(URL, OPTIONS);
            const results = await response.json();
            console.log(results);
            setResults(results);
            setReceivedResults(true);
        } catch (error) {
            console.error(error);
            setReceivedResults(false);
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <>
            <h1>Latest news from NBA</h1>
            <ul>
                {
                    results && results.map((r, index) => (
                        <li key={index}>
                            <h2>{r.title}</h2>
                            <a href={r.url}>Read more</a>
                            <span className='text--shadow'> (Source {r.source.toUpperCase()})</span>
                        </li>
                    ))
                }
            </ul>
            <Navigation />
        </>
    )
}