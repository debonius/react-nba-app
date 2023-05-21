import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function FullPagination({ pageOptions, lastPage, handleGoToFirstPage, handleGoToLastPage, handleGoToPrevPage, handleGoToNextPage }) {
    return (
        <div className='pagination'>
            <div>
                {pageOptions.page <= lastPage &&
                    <>
                        <FirstPageIcon
                            onClick={handleGoToFirstPage}
                            className='pagination__btn-change-page'
                        />
                        <ArrowBackIosIcon
                            onClick={handleGoToPrevPage}
                            color='primary'
                            className='pagination__btn-change-page'
                        />
                    </>
                }
                {pageOptions.page >= 1 &&
                    <>
                        <span>Page {pageOptions.page}</span>
                        <ArrowForwardIosIcon
                            className='pagination__btn-change-page'
                            onClick={handleGoToNextPage}
                            color='primary'
                        />
                        <LastPageIcon
                            onClick={handleGoToLastPage}
                            className='pagination__btn-change-page'
                        />
                    </>
                }
            </div>
        </div>
    )
}