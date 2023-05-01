'use client';
// import Image from 'next/image'
// import styles from './page.module.css'
import { useState, useEffect } from 'react';
import Navigation from '../app/components/shared/Navigation'
import Game from './api/game';

const URL = 'https://free-nba.p.rapidapi.com/games?per_page=10';
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
  }
};

function WelcomeMessage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p className='welcome-message'>Check last NBA scores, stay update about teams and players.
      </p>
    </>
  )
}

function LatestScores() {
  const [scores, setScores] = useState<Game>();

  const getScores = () => {
    fetch(URL, OPTIONS)
      .then(response => response.json())
      .then(data => {
        setScores(data);
        // scores.sort((a: Game, b: Game) => {
        //   return new Date(b.date).getTime() - new Date(a.date).getTime();
        // });
        console.log(scores);
      });
  }

  useEffect(() => getScores(), [])

  return (
    <div className='latest-scores'>
      <h1>Latest scores</h1>
      <ul>
        {scores.map(score => (
          <li key={score.id}>{score.home_team} vs {score.visitor_team}</li>
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
