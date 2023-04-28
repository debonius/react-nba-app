// import Image from 'next/image'
// import styles from './page.module.css'
// Components
import Navigation from '../components/shared/Navigation';

function WelcomeMessage() {
  return (
    <p>Check last NBA scores, stay update about teams and players.
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
