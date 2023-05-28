import Navigation from '../components/shared/Navigation';
import ScoreList from '../components/shared/ScoreList';

export default function Scores() {
    const showPagination = true;
    const initialPageSize = 25;
    return (
        <>
            <h1>All Scores</h1>
            <ScoreList showPagination={showPagination} initialPageSize={initialPageSize} />
            <Navigation />
        </>
    )
}