import Navigation from '../components/shared/Navigation';
import ScoreList from '../components/shared/ScoreList';

export default function Scores() {
    const showPagination = true;
    return (
        <>
            <h1>All Scores</h1>
            <ScoreList showPagination={showPagination} />
            <Navigation />
        </>
    )
}