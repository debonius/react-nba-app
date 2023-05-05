'use client';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';

export default function Navigation() {
    return (
        <nav>
            <Link href="/">
                <HomeOutlinedIcon color="white" fontSize="large" />
                <span>Home</span>
            </Link>
            <Link href="search">
                <PolicyOutlinedIcon color="white" fontSize="large" />
                <span>Search</span>
            </Link>
            <Link href="scores">
                <ScoreboardOutlinedIcon color="white" fontSize="large" />
                <span>Scores</span>
            </Link>
            <Link href="teams">
                <SportsBasketballOutlinedIcon color="white" fontSize="large" />
                <span>Teams</span>
            </Link>
            <Link href="players">
                <GroupsOutlinedIcon color="white" fontSize="large" />
                <span>Players</span>
            </Link>
            <Link href="news">
                <NewspaperOutlinedIcon color="white" fontSize="large" />
                <span>News</span>
            </Link>
        </nav>
    )
}