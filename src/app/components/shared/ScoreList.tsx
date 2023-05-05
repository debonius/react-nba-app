'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Pagination from './Pagination'
import Game from '../../api/types/games';
import Meta from '../../api/types/meta';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export default function ScoreList() {
    type Games = Game[];
    const [scores, setScores] = useState<Games>([]);
    const [meta, setMeta] = useState<Meta>();
    const [perPage, setPerPage] = useState<Number>(100);
    const [currentPage, setCurrentPage] = useState<Number>(1);
    const [fetchSuccess, setFetchSuccess] = useState<Boolean>(false);

    const getScores = () => {
        const URL = `https://free-nba.p.rapidapi.com/games?page=${currentPage}&per_page=${perPage}`;
        const OPTIONS = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
            }
        };
        fetch(URL, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                // setScores(obj.data.sort((a: Game, b: Game) => {
                //   return new Date(b.date).getTime() - new Date(a.date).getTime();
                // }));
                setScores(obj.data);
                setMeta(obj.meta);
                setFetchSuccess(true);
                // console.warn('meta: ', meta);
                // console.warn('perPage: ', perPage);
                // console.warn('currentPage: ', currentPage);
            });
    };


    useEffect(() => getScores(), []);

    return (
        <div className='latest-scores'>
            <ul>
                {fetchSuccess && scores.map(score => (
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
            {meta &&
                <Pagination
                    meta={meta}
                    setPerPage={setPerPage}
                    perPage={perPage}
                    getScores={getScores}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            }
        </div >
    )
}