'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Pagination from './Pagination'
import Game from '../../api/types/games';
// import Meta from '../../api/types/meta';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
    }
};

export default function ScoreList() {
    type Games = Game[];
    const [totalResults, setTotalResults] = useState<number>();
    const [totalPages, setTotalPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [scores, setScores] = useState<Games>([]);
    const [receivedScore, setReceivedScore] = useState<boolean>(false);
    const URL = `https://free-nba.p.rapidapi.com/games?page=${currentPage}&per_page=${perPage}`;

    async function fetchScoresMeta() {
        await fetch(`https://free-nba.p.rapidapi.com/games`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                setTotalResults(obj.meta.total_count);
                setTotalPages(obj.meta.total_pages);
                setCurrentPage(obj.meta.total_pages);
                setPerPage(obj.meta.per_page);
                console.info('totalResults: ', totalResults);
                console.info('totalPages: ', totalPages);
                console.info('currentPage: ', currentPage);
                console.info('perPage: ', perPage);
            });
    }
    function fetchScores() {
        fetchScoresMeta();
        fetch(URL, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                setScores(obj.data.sort((a: Game, b: Game) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }));
                setReceivedScore(true);
            });
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
            {totalResults && totalResults > 0 &&
                <Pagination
                    totalResults={totalResults}
                    fetchScores={fetchScores}
                />
            }
        </div >
    )
}