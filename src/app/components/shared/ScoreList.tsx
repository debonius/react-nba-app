'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import game from '../../api/types/games';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
    }
};

function Pagination({ meta, rowsPerPage, setRowsPerPage, fetchScoresList }) {
    const [page, setPage] = useState<number>(2);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        setRowsPerPage(event.target.value);
        setPage(0);
        fetchScoresList(event.target.value);
        console.log('1) event.target.value: ', event.target.value);
        console.log('2) rowsPerPage: ', rowsPerPage);
        // console.log('3) perPage: ', perPage);
    };

    // function handleChangeRowsPerPage(event) {
    //     setRowsPerPage(event.target.value);
    //     setPage(0);
    //     fetchScoresList(event.target.value);
    //     console.log('1) event.target.value: ', event.target.value);
    //     console.log('2) rowsPerPage: ', rowsPerPage);
    // };

    return (
        <TablePagination
            component="div"
            count={meta?.total_count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}

export default function ScoreList() {
    type games = game[];
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [count, setCount] = useState<number>(0);
    const [meta, setMeta] = useState<object>({});
    const [totalPages, setTotalPages] = useState<number>(0);
    const [scores, setScores] = useState<games>([]);
    const [receivedScore, setReceivedScore] = useState<boolean>(false);

    function fetchScoresMeta() {
        console.warn('called fetchScoresMeta()');
        fetch(`https://free-nba.p.rapidapi.com/games`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                setMeta(obj.meta);
                setCount(obj.meta.total_count);
                setTotalPages(obj.meta.total_pages);
                console.info('count: ', count);
                console.info('totalPages: ', totalPages);
                console.info('page: ', page);
                console.info('rowsPerPage: ', rowsPerPage);
            });
    }

    function fetchScoresList(newRowsPerPage: number) {
        console.warn('called fetchScoresList()');
        console.warn('with pag: ', page);
        console.warn('with rowsPerPage: ', rowsPerPage);
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
        fetchScoresList(rowsPerPage);
    }

    useEffect(() => {
        fetchScores();
    }, []);

    return (
        <div className='latest-scores'>
            {count > 0 &&
                <Pagination
                    meta={meta}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    fetchScoresList={fetchScoresList}
                />
            }
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