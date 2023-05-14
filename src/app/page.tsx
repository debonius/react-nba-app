'strict mode';
'use client';
import Navigation from '../app/components/shared/Navigation'
import ScoreList from '../app/components/shared/ScoreList'
import styles from './page.module.css'

function WelcomeMessage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p className={styles.welcomeMessage}>Check latest NBA scores and stats, teams and players.
      </p>
    </>
  )
}

export default function Home() {
  return (
    <>
      <WelcomeMessage />
      <h1>Latest scores</h1>
      <ScoreList />
      <Navigation />
    </>
  )
}
