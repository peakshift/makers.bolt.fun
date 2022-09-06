import { Tournament, useMeTournamentQuery, User } from 'src/graphql'
import MakerCard from './MakerCard/MakerCard';
import MakerCardSkeleton from './MakerCard/MakerCard.Skeleton';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';

interface Props {
    data: Pick<Tournament,
        | 'id'>
}


export default function MakersPage({ data: { id } }: Props) {

    const query = useMeTournamentQuery();

    return (
        <div className='pb-42'>
            <div className="flex flex-col gap-16 lg:gap-24">
                {query.loading ?
                    <MakerCardSkeleton />
                    :
                    query.data?.me ?
                        <MakerCard isMe maker={query.data.me as User} />
                        : null
                }
                <ParticipantsSection tournamentId={id} />
            </div>

        </div>
    )
}
