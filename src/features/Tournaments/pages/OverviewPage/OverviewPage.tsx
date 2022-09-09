import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Card from 'src/Components/Card/Card'
import { Tournament } from 'src/graphql'
import { useTournament } from '../TournamentDetailsPage/TournamentDetailsContext'
import FAQsSection from './FAQsSection/FAQsSection'
import JudgesSection from './JudgesSection/JudgesSection'
import PrizesSection from './PrizesSection/PrizesSection'
import RegisterCard from './RegisterCard/RegisterCard'



export default function OverviewPage() {

    const { tournamentDetails, makers, myParticipationInfo } = useTournament()

    return (
        <Card onlyMd className='flex flex-col gap-42'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
                <div className='md:col-span-2'>
                    <div
                        className={`text-gray-600 mt-16 prose `}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(tournamentDetails.description)) }}
                    >
                    </div>
                </div>
                <RegisterCard makers_count={tournamentDetails.makers_count} start_date={tournamentDetails.start_date} avatars={makers.map(m => m.user.avatar)} isRegistered={!!myParticipationInfo} />
            </div>
            <PrizesSection prizes={tournamentDetails.prizes} />
            <JudgesSection judges={tournamentDetails.judges} />
            <FAQsSection faqs={tournamentDetails.faqs} />
        </Card>
    )
}
