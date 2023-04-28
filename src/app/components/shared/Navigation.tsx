import Link from 'next/link';

export default function Navigation() {
    return (
        <nav>Navigation works!
            <Link href="/">Home</Link>
            <Link href="search">Search</Link>
            <Link href="scores">Scores</Link>
            <Link href="teams">Teams</Link>
            <Link href="news">News</Link>
        </nav>
    )
}