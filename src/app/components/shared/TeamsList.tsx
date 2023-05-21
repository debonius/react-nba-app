import Image from 'next/image';

export default function TeamsList({ teams }) {
    return (
        <div className='list'>
            <ul>
                {teams && teams.map(team => (
                    <li key={team.id} className='list__row teams'>
                        <Image
                            src={`/img/teams/${team.abbreviation}.svg`}
                            alt={team.full_name + ' logo'}
                            width={32}
                            height={32}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/img/ball.svg";
                            }}
                        />
                        <span className='team-name'>{team.full_name}</span>
                        <span>({team.abbreviation})</span>
                        <span>- {team.division}</span>
                        <span className="text--shadow">{team.city}</span>
                    </li>
                ))}
            </ul>
        </div >
    )
}