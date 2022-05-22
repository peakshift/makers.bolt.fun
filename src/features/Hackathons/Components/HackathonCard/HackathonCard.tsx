import { Hackathon } from "src/features/Hackathons/types"
import { IoLocationOutline } from 'react-icons/io5'
import Button from "src/Components/Button/Button"
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { trimText } from "src/utils/helperFunctions";
dayjs.extend(advancedFormat)

export type HackathonCardType = Hackathon;

interface Props {
    hackathon: HackathonCardType
}

export default function HackathonCard({ hackathon }: Props) {
    return (
        <div className="rounded-16 bg-white overflow-hidden">
            <img className="w-full h-[120px] object-cover" src={hackathon.cover_image} alt="" />
            <div className="p-16">
                <div className="flex flex-col gap-8">
                    <h3 className="text-body1 font-bold text-gray-900">
                        {hackathon.title}
                    </h3>
                    <p className="text-body3 font-medium text-gray-900">
                        {`${dayjs(hackathon.start_date).format('Do')} - ${dayjs(hackathon.end_date).format('Do MMMM, YYYY')}`}
                    </p>
                    <p className="text-body4 font-medium text-gray-600">
                        <IoLocationOutline className="mr-8" /> {hackathon.location}
                    </p>
                    <p className="text-body4 text-gray-600">
                        {trimText(hackathon.description, 110)}
                    </p>
                </div>
                <div className="mt-16 flex flex-wrap gap-8">
                    {hackathon.topics.map(topic => <div key={topic.id} className="p-8 bg-gray-50 rounded-8 text-body5">{topic.icon} {topic.title}</div>)}
                </div>
                <Button href={hackathon.website} newTab color="gray" fullWidth className="mt-16">
                    Learn more
                </Button>
            </div>
        </div>
    )
}
