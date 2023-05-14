import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationScores({ page, setPage, rowsPerPage, setRowsPerPage, count, fetchScoresList }) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        // fetchScoresList();
    };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     console.info('called handleChangeRowsPerPage(), new value: ' + rowsPerPage);
    // };
    const handleChangeRowsPerPage = (e: any) => {
        // setRowsPerPage(e.target.value, fetchScoresList());

        setTimeout(() => {
            console.log('e.target.value: ', e.target.value);
            setRowsPerPage(e.target.value);
            console.log('rowsPerPage: ', rowsPerPage);

        }, 500);

    }

    return (
        <>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
            />
            <p>{rowsPerPage}</p>
        </>
    );
}