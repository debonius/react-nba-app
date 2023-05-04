import Team from './teams';

export default interface Game {
    id: number;
    date: string;
    home_team: Team;
    home_team_score: number;
    period: number;
    postseason: false
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
}