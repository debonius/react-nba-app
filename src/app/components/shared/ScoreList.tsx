'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Pagination from './Pagination'
import Game from '../../api/types/games';
import Meta from '../../api/types/meta';

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
    const [meta, setMeta] = useState<Meta>();
    const [scores, setScores] = useState<Games>([]);
    const [receivedScore, setReceivedScore] = useState<Boolean>(false);
    // const [perPage, setPerPage] = useState<Number>(10);
    // const [totalPages, setTotalPages] = useState<Number>(0);
    // const [totalCount, setTotalCount] = useState<Number>(0);
    // const [currentPage, setCurrentPage] = useState<Number>(1);

    function fetchScores() {
        fetch(`https://free-nba.p.rapidapi.com/games`, OPTIONS)
            .then(response => response.json())
            .then(obj => {
                // setMeta({ ...obj.meta });
                setMeta(obj.meta);
                console.warn('meta: ', obj.meta);
                console.warn('meta: ', meta);
                // setPerPage(obj.meta.per_page);
                // setTotalPages(obj.meta.total_pages);
                // setTotalCount(obj.meta.total_count);
            })
            .finally(() => {
                console.log(meta?.total_pages);
                console.log(meta?.per_page);
                const URL = `https://free-nba.p.rapidapi.com/games?page=${meta?.total_pages}&per_page=${25}`;
                fetch(URL, OPTIONS)
                    .then(response => response.json())
                    .then(obj => {
                        setScores(obj.data.sort((a: Game, b: Game) => {
                            return new Date(b.date).getTime() - new Date(a.date).getTime();
                        }));
                        setReceivedScore(true);
                    });
            });
    }

    // const fetchScores = () => {
    //     const URL = `https://free-nba.p.rapidapi.com/games?page=${meta?.total_pages}&per_page=${meta?.per_page}`;
    //     fetch(URL, OPTIONS)
    //         .then(response => response.json())
    //         .then(obj => {
    //             setScores(obj.data.sort((a: Game, b: Game) => {
    //                 return new Date(b.date).getTime() - new Date(a.date).getTime();
    //             }));
    //             setReceivedScore(true);
    //         });

    // };

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
            {meta &&
                <Pagination
                    meta={meta}
                    fetchScores={fetchScores}
                // setPerPage={setPerPage}
                // perPage={perPage}
                // setCurrentPage={setCurrentPage}
                // currentPage={currentPage}
                // totalPages={totalPages}
                />
            }
        </div >
    )
}