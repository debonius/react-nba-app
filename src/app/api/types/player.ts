export default interface player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team: {
        division: string;
        full_name: string;
    }
}

export type players = player[];