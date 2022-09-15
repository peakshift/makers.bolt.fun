import Card from 'src/Components/Card/Card'
import { User } from 'src/graphql';
import { Link } from 'react-router-dom'



interface Props {
    tournaments: Pick<User['tournaments'][number],
        | 'id'
        | 'title'
        | 'thumbnail_image'
        | 'start_date'
        | 'end_date'
    >[]
    isOwner?: boolean;
}

export default function TournamentsCard({ tournaments, isOwner }: Props) {

    return (
        <Card>
            <p className="text-body2 font-bold">🏆  Tournaments </p>
            <div className="mt-16">
                {tournaments.length === 0 && <>
                    <p className="text-gray-700 text-body4">No tournaments entered.</p>
                </>}
                <ul className=' flex flex-wrap gap-x-8 gap-y-20'>
                    {
                        tournaments.map((tournament) => {
                            const status = getDateStatus(tournament.start_date, tournament.end_date)
                            return <li key={tournament.id}>
                                <Link to={'/tournaments/' + tournament.id} className="flex gap-16 items-center">
                                    <img src={tournament.thumbnail_image} className='w-48 border-2 border-gray-100 aspect-square rounded-16 object-cover' alt="" />
                                    <div>
                                        <p className="text-gray-900 font-medium">{tournament.title}</p>
                                        <p className={`
                                    text-body5 font-medium
                                    ${status === 'live' && 'text-green-500'}
                                    ${status === 'upcoming' && 'text-violet-500'}
                                    ${status === 'finished' && 'text-warning-500'}  
                                    `}>&#8226; {status === 'live' && "Running"}
                                            {status === 'upcoming' && "Upcoming"}
                                            {status === 'finished' && "Completed"}  </p>
                                    </div>
                                </Link>
                            </li>
                        })}
                </ul>
            </div>
        </Card>
    )
}


function getDateStatus(start: string, end: string) {

    const start_date = new Date(start);
    const now_date = new Date();
    const end_date = new Date(end);

    if (now_date < start_date) return 'upcoming'
    if (now_date >= start_date && now_date <= end_date) return 'live'
    return 'finished'
}