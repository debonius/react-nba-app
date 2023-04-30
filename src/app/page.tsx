'use client';
// import Image from 'next/image'
// import styles from './page.module.css'
import { useEffect } from 'react';
import Navigation from '../app/components/shared/Navigation'
import Game from './api/game';

let scores: Game[] = [];
const URL = 'https://free-nba.p.rapidapi.com/games?per_page=10';
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e97c778be5msh166dd90d82df4dep1025b4jsnd4d0e762bcc5',
  }
};

const getScores = function () {
  console.log('called getScores()');

  fetch(URL, OPTIONS)
    .then(response => response.json())
    .then(data => {
      // data.sort((a: any, b: any) => {
      //   return new Date(b.date).getTime() - new Date(a.date).getTime();
      // })
      scores = data.slice().sort((a: Game, b: Game) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      console.log(scores);
    });

  // gameScores.sort((a, b) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime();
  // });

  console.log(scores);
}

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

  return (
    <h1>Latest scores</h1>
  )
}

export default function Home() {

  useEffect(() => {
    getScores();
  }, [])

  return (
    <>
      <WelcomeMessage />
      <LatestScores />
      <Navigation />
    </>
  )
}
