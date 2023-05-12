'use client';
import { useState } from 'react';
import Navigation from '../components/shared/Navigation';
import ScoreList from '../components/shared/ScoreList';
import Pagination from '../components/shared/Pagination';

export default function Scores() {
    const [rowsPerPage, setRowsPerPage] = useState("10");
    console.log(rowsPerPage);
    return (
        <>
            <h1>All Scores</h1>
            <Pagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
            <ScoreList />
            <Navigation />
        </>
    )
}