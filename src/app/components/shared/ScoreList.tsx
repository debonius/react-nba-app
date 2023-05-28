'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import game from '../../api/types/games';
import pageOptions from '../../api/types/pageOptions';
import * as React from 'react';
import FullPagination from './FullPagination';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
    }
};

export default function ScoreList({ showPagination, initialPageSize }) {
    type games = game[];
    const [scores, setScores] = useState<games>([]);
    const [receivedScore, setReceivedScore] = useState<boolean>(false);
    const [lastPage, setLastPage] = useState<number>(6930);

    const [pageOptions, setPageOptions] = useState<pageOptions>({
        page_size: initialPageSize,
        page: lastPage,
        tot_pages: null
    })

    const handleGoToFirstPage = () => {
        setPageOptions({
            ...pageOptions,
            page: lastPage,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToPrevPage = () => {
        setPageOptions({
            ...pageOptions,
            page: pageOptions.page + 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToNextPage = () => {
        setPageOptions({
            ...pageOptions,
            page: pageOptions.page - 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToLastPage = () => {
        setPageOptions({
            ...pageOptions,
            page: 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    function fetchScores(pageSize: number, page: number) {
        console.log('called fetchScoresList()');
        console.log('with page: ', page);
        console.log('with pageSize: ', pageSize);
        fetch(`https://free-nba.p.rapidapi.com/games?page=${page}&per_page=${pageSize}`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                setScores(obj.data.sort((a: game, b: game) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }));
                console.log('meta.total_pages: ', obj.meta.total_pages);
                setLastPage(obj.meta.total_pages);
            }).finally(() => {
                setReceivedScore(true);
            });
    }

    useEffect(() => {
        fetchScores(pageOptions.page_size, pageOptions.page);
    }, [pageOptions]);

    return (
        <div className='list'>
            {showPagination === true && <FullPagination
                pageOptions={pageOptions}
                lastPage={lastPage}
                handleGoToFirstPage={handleGoToFirstPage}
                handleGoToLastPage={handleGoToLastPage}
                handleGoToPrevPage={handleGoToPrevPage}
                handleGoToNextPage={handleGoToNextPage}
            />}
            <ul>
                {receivedScore && scores.map(score => (
                    <li key={score.id} className='list__row'>
                        <Image
                            src={'/img/teams/' + score.home_team.abbreviation + '.svg'}
                            alt={score.home_team.full_name + ' logo'}
                            width={32}
                            height={32}
                        />
                        <span>{score.home_team.abbreviation} </span>
                        <span className='list__score'>{score.home_team_score}</span>
                        <span className='list__vs'>VS</span>
                        <span className='list__score'>{score.visitor_team_score} </span>
                        <Image
                            src={'/img/teams/' + score.visitor_team.abbreviation + '.svg'}
                            alt={score.visitor_team.full_name + ' logo'}
                            width={32}
                            height={32}
                        />
                        <span>{score.visitor_team.abbreviation}</span>
                        <span className='text--shadow'>
                            {MONTHS[new Date(score.date).getMonth()]} {new Date(score.date).getDate()}, {new Date(score.date).getFullYear()}
                        </span>
                    </li>
                ))}
            </ul>
        </div >
    )
}