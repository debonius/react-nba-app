import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({ meta, setPerPage, perPage, getScores, setcurrentPage }) {
    const [page, setPage] = React.useState(meta.total_pages);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        setcurrentPage(newPage)
        // console.log('newPage: ', newPage);
        getScores();
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPerPage(parseInt(event.target.value, 10));
        setRowsPerPage(perPage);
        getScores();
        setPage(0);
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