// import Image from 'next/image'
// import styles from './page.module.css'
import Navigation from '../app/components/shared/Navigation'

const URL = 'https://free-nba.p.rapidapi.com/games?page=0&per_page=25';
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7b95667d0emsh8d9d96107126432p1809fdjsn526f18e74399',
  }
};

const getScores = function () {
  console.log('called getScores()');
  fetch(URL, OPTIONS)
    .then(response => response.json())
    .then(data => console.info(data))
}

getScores();

function WelcomeMessage() {
  return (
    <p className='welcome-message'>Check last NBA scores, stay update about teams and players.
    </p>
  )
}

function LatestScores() {
  return (
    <h1>Latest scores</h1>
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
