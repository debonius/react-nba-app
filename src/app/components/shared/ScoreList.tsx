'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
// import TablePaginationScores from './TablePagination';
import BasicPagination from './Pagination';
import game from '../../api/types/games';

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
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [count, setCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [scores, setScores] = useState<games>([]);
    const [receivedScore, setReceivedScore] = useState<boolean>(false);

    function fetchScoresMeta() {
        console.warn('called fetchScoresMeta()');
        fetch(`https://free-nba.p.rapidapi.com/games`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                setCount(obj.meta.total_count);
                setTotalPages(obj.meta.total_pages);
                console.info('count: ', count);
                console.info('totalPages: ', totalPages);
                console.info('page: ', page);
                console.info('rowsPerPage: ', rowsPerPage);
            });
    }

    function fetchScoresList() {
        console.warn('called fetchScoresList()');
        fetch(`https://free-nba.p.rapidapi.com/games?page=${page}&per_page=${rowsPerPage}`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                // setScores(obj.data.sort((a: game, b: game) => {
                //     return new Date(b.date).getTime() - new Date(a.date).getTime();
                // }));
                setScores(obj.data);
                setReceivedScore(true);
            });
    }

    function fetchScores() {
        fetchScoresMeta();
        fetchScoresList()
    }

    useEffect(() => {
        fetchScores();
    }, []);

    return (
        <div className='latest-scores'>
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
            <BasicPagination />
            {/* {count > 0 &&
                <TablePaginationScores
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                />
            } */}
        </div >
    )
}