import Card from 'src/Components/Card/Card'
import { User } from 'src/graphql';



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

                            const isLive = ((new Date() < new Date(tournament.end_date)) && (new Date() > new Date(tournament.start_date)));

                            return <li key={tournament.id} className="flex gap-16 items-center">
                                <img src={tournament.thumbnail_image} className='w-48 border-2 border-gray-100 aspect-square rounded-16 object-cover' alt="" />
                                <div>
                                    <p className="text-gray-900 font-medium">{tournament.title}</p>
                                    <p className={`${isLive ? "text-green-500" : "text-warning-500"} text-body5 font-medium`}>&#8226; {isLive ? "Live" : "Completed"}</p>
                                </div>
                            </li>
                        })}
                </ul>
            </div>
        </Card>
    )
}
