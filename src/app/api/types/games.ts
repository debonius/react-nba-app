import team from './teams';

export default interface game {
    id: number;
    date: string;
    home_team: team;
    home_team_score: number;
    period: number;
    postseason: false
    season: number;
    status: string;
    time: string;
    visitor_team: team;
    visitor_team_score: number;
}