// import Image from 'next/image'
// import styles from './page.module.css'
import Navigation from '../app/components/shared/Navigation'

const url = 'https://free-nba.p.rapidapi.com/games?page=0&per_page=25';
const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '7b95667d0emsh8d9d96107126432p1809fdjsn526f18e74399',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  }
};

function getScores() {
  console.log('called getScores()');
  try {
    const response = fetch(url, options);
    // const result = response.text();
    console.warn(response);
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
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
