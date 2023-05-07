import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({ meta, setPerPage, perPage, getScores, setCurrentPage, currentPage, totalPages }) {
    const [page, setPage] = React.useState(totalPages);
    const [rowsPerPage, setRowsPerPage] = React.useState(perPage);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        setCurrentPage(newPage)
        console.log('nba currentPage: ', currentPage);
        console.log('mui page: ', page);
        console.log('mui newPage: ', newPage);
        getScores();
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPerPage(rowsPerPage);
        // setPage(totalPages);
        getScores(perPage);
    };

    return (
        <TablePagination
            component="div"
            count={meta.total_count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}