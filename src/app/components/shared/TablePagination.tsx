import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
// import Meta from '../../api/types/meta';

// export default function Pagination({ meta, setPerPage, perPage }) {
export default function Pagination({ meta, setPerPage, perPage, getScores }) {
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPerPage(parseInt(event.target.value, 10));
        setRowsPerPage(perPage);
        getScores(perPage);
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