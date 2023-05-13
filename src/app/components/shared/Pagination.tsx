'use client';
import { useState } from 'react';

export default function Pagination() {
    const [rowsPerPage, setRowsPerPage] = useState("10");
    return (
        <>
            <label>
                Rows per page:
                <select
                    value={rowsPerPage}
                    onChange={
                        e => {
                            console.log('called onChange()');
                            // TO FIX
                            setRowsPerPage(e.target.value);
                            console.log(rowsPerPage);
                        }
                    }
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </label>
        </>
    );
}