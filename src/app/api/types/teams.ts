export default interface team {
    id: number;
    abbreviation: string;
    city: string;
    division: string;
    full_name: string;
}

export type teams = team[];