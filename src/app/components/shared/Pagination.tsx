import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({ meta, setPerPage, perPage, getScores, setCurrentPage, currentPage }) {
    const [page, setPage] = React.useState(currentPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(perPage);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        setCurrentPage(newPage)
        console.log('currentPage: ', currentPage);
        console.log('table page: ', page);
        console.log('table newPage: ', newPage);
        // getScores();
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        // setPerPage(parseInt(event.target.value, 10));
        // setRowsPerPage(perPage);
        setPage(0);
        // getScores();
    };

    return (
        <TablePagination
            component="div"
            count={meta.total_pages}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}