'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import game from '../../api/types/games';
import pageOptions from '../../api/types/pageOptions';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
    }
};

export default function ScoreList() {
    type games = game[];
    const [scores, setScores] = useState<games>([]);
    const [receivedScore, setReceivedScore] = useState<boolean>(false);
    const [lastPage, setLastPage] = useState<number>(6930);

    const [pageOptions, setPageOptions] = useState<pageOptions>({
        page_size: 10,
        page: 1,
        tot_pages: null
    })

    function subtractTen() {
        setPageOptions({
            ...pageOptions,
            page_size: pageOptions.page_size - 10,
        });
        fetchScores(pageOptions.page_size, pageOptions.page)
        console.log(pageOptions.page_size);
    }

    function addTen() {
        setPageOptions({
            ...pageOptions,
            page_size: pageOptions.page_size + 10,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page_size', pageOptions.page_size);
    }

    const handleGoToPrevPage = () => {
        setPageOptions({
            ...pageOptions,
            page: pageOptions.page - 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToNextPage = () => {
        setPageOptions({
            ...pageOptions,
            page: pageOptions.page + 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToFirstPage = () => {
        setPageOptions({
            ...pageOptions,
            page: 1,
        });
        fetchScores(pageOptions.page_size, pageOptions.page);
        console.log('page', pageOptions.page);
    }

    const handleGoToLastPage = () => {
        setPageOptions({
            ...pageOptions,
            page: lastPage,
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
                setScores(obj.data);
                // setScores(obj.data.sort((a: game, b: game) => {
                //     return new Date(b.date).getTime() - new Date(a.date).getTime();
                // }));
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
        <div className='latest-scores'>
            <div className='pagination'>
                <p>Show: {pageOptions.page_size}</p>
                <ButtonGroup
                    aria-label="outlined button group"
                    variant="outlined"
                    className='buttons'
                >
                    {pageOptions.page_size > 10 && <Button onClick={subtractTen}>-10</Button>}
                    <Button onClick={addTen}>+10</Button>
                </ButtonGroup>
                <div>
                    {pageOptions.page > 1 &&
                        <>
                            <FirstPageIcon
                                onClick={handleGoToFirstPage}
                                className='pagination__btn-change-page'
                            />
                            <ArrowBackIosIcon
                                onClick={handleGoToPrevPage}
                                color='primary'
                                className='pagination__btn-change-page'
                            />
                        </>
                    }
                    {pageOptions.page > 0 &&
                        <>
                            <span>Page {pageOptions.page}</span>
                            <ArrowForwardIosIcon
                                className='pagination__btn-change-page'
                                onClick={handleGoToNextPage}
                                color='primary'
                            />
                            <LastPageIcon
                                onClick={handleGoToLastPage}
                                className='pagination__btn-change-page'
                            />
                        </>
                    }
                </div>
            </div>
            <ul>
                {receivedScore && scores.map(score => (
                    <li key={score.id} className='latest-scores__row'>
                        <Image
                            src={'/img/teams/' + score.home_team.abbreviation + '.svg'}
                            alt={score.home_team.full_name + ' logo'}
                            width={32}
                            height={32}
                        />
                        <span>{score.home_team.abbreviation} </span>
                        <span className='latest-scores__score'>{score.home_team_score}</span>
                        <span className='latest-scores__vs'>VS</span>
                        <span className='latest-scores__score'>{score.visitor_team_score} </span>
                        <Image
                            src={'/img/teams/' + score.visitor_team.abbreviation + '.svg'}
                            alt={score.visitor_team.full_name + ' logo'}
                            width={32}
                            height={32}
                        />
                        <span>{score.visitor_team.abbreviation}</span>
                        <span className='latest-scores__date'>
                            {MONTHS[new Date(score.date).getMonth()]} {new Date(score.date).getDate()}, {new Date(score.date).getFullYear()}
                        </span>
                    </li>
                ))}
            </ul>
        </div >
    )
}