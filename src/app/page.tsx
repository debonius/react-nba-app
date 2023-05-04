'use client';
// import Image from 'next/image'
// import styles from './page.module.css'
import { useState, useEffect } from 'react';
import Navigation from '../app/components/shared/Navigation'
import Pagination from '../app/components/shared/Pagination'
import Game from './api/types/games';
import Meta from './api/types/meta';

const URL = 'https://free-nba.p.rapidapi.com/games?page=693&per_page=10';
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
  }
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

function WelcomeMessage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p className='welcome-message'>Check latest NBA scores and stats, teams and players.
      </p>
    </>
  )
}

function LatestScores() {
  type Games = Game[];
  const [scores, setScores] = useState<Games>([]);
  const [meta, setMeta] = useState<Meta>();
  const [fetchSuccess, setFetchSuccess] = useState<Boolean>(false);

  const getScores = () => {
    fetch(URL, OPTIONS)
      .then(response => response.json())
      .then(obj => {
        setScores(obj.data);
        setMeta(obj.meta);
        setFetchSuccess(true);
        console.info(obj);
        console.info('meta:', meta);
      });
  }


  useEffect(() => getScores(), []);

  return (
    <div className='latest-scores'>
      <h1>Latest scores</h1>
      <ul>
        {fetchSuccess && scores.map(score => (
          <li key={score.id}>
            <div>
              {score.home_team.abbreviation} {score.home_team_score} vs {score.visitor_team_score} {score.visitor_team.abbreviation}
            </div>
            <span>
              {MONTHS[new Date(score.date).getMonth()]} {new Date(score.date).getDate()}, {new Date(score.date).getFullYear()}
            </span>
          </li>
        ))}
      </ul>
      {meta &&
        <Pagination current_page={meta.current_page} />
      }

    </div >
  )
}

export default function Home() {
  return (
    <>
      <WelcomeMessage />
      <LatestScores />
      <Navigation />
    </>
  )
}
