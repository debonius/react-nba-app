'use client';
// import Image from 'next/image'
// import styles from './page.module.css'
import { useState, useEffect } from 'react';
import Navigation from '../app/components/shared/Navigation'
import Game from './api/types/games';

const URL = 'https://free-nba.p.rapidapi.com/games?page=693&per_page=1000';
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
  const [gotScores, setGotScores] = useState<Boolean>(false);

  const getScores = () => {
    fetch(URL, OPTIONS)
      .then(response => response.json())
      .then(obj => {
        setScores(obj.data.sort((a: Game, b: Game) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }));
        setGotScores(true);
        console.log(obj)
        console.log(obj.data)
      });
  }


  useEffect(() => getScores(), []);

  return (
    <div className='latest-scores'>
      <h1>Latest scores</h1>
      <ul>
        {gotScores && scores.map(score => (
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
