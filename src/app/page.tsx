'strict mode';
'use client';
import Navigation from '../app/components/shared/Navigation';
import ScoreList from '../app/components/shared/ScoreList';
import styles from './page.module.css';
import Link from 'next/link';


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
  const showPagination = false;

  return (
    <>
      <WelcomeMessage />
      <h1>Latest results</h1>
      <ScoreList showPagination={showPagination} />
      <Navigation />
      <Link href="/scores" className='text-center'>
        All results
      </Link>
    </>
  )
}
