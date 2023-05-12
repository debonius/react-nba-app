export default function Pagination(rowsPerPage, setRowsPerPage) {
    return (
        <>
            <label>
                Rows per page:
                <select
                    value={rowsPerPage}
                    onChange={
                        e => {
                            console.log('onChange()');
                            // TO FIX
                            // setRowsPerPage(e.target.value);
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