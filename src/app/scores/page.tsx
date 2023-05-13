import Navigation from '../components/shared/Navigation';
import ScoreList from '../components/shared/ScoreList';
import Pagination from '../components/shared/Pagination';

export default function Scores() {
    return (
        <>
            <h1>All Scores</h1>
            {/* <Pagination /> */}
            <ScoreList />
            <Navigation />
        </>
    )
}