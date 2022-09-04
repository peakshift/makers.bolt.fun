import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Card from 'src/Components/Card/Card'
import { Tournament } from 'src/graphql'
import FAQsSection from './FAQsSection/FAQsSection'
import JudgesSection from './JudgesSection/JudgesSection'
import PrizesSection from './PrizesSection/PrizesSection'
import RegisterCard from './RegisterCard/RegisterCard'

interface Props {
    data: Pick<Tournament,
        | "description"
        | "prizes"
        | "judges"
        | "start_date"
        | 'makers_count'
        | 'faqs'
    >
}

export default function OverviewPage({ data }: Props) {
    return (
        <Card onlyMd className='flex flex-col gap-42'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
                <div className='md:col-span-2'>
                    <div
                        className={`text-gray-600 mt-16 prose `}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(data.description)) }}
                    >
                    </div>
                </div>
                <RegisterCard makers_count={data.makers_count} start_date={data.start_date} />
            </div>
            <PrizesSection prizes={data.prizes} />
            <JudgesSection judges={data.judges} />
            <FAQsSection faqs={data.faqs} />
        </Card>
    )
}