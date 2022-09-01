import { IoLocationOutline } from 'react-icons/io5'
import Button from "src/Components/Button/Button"
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { trimText } from "src/utils/helperFunctions";
import { Override } from "src/utils/interfaces";
import { Tag, Tournament } from "src/graphql";
dayjs.extend(advancedFormat)


interface Props {
    event: Pick<Tournament['events'][number],
        | 'id'
        | 'title'
        | 'image'
        | 'date'
        | 'location'
        | 'description'
        | 'website'
        | 'type'
    >
}

export default function EventCard({ event }: Props) {
    return (
        <div className="rounded-16 bg-white overflow-hidden border-2 flex flex-col">
            <img className="w-full h-[160px] object-cover" src={event.image} alt="" />
            <div className="p-16 grow flex flex-col">
                <div className="flex flex-col gap-8">
                    <h3 className="text-body2 font-bold text-gray-900">
                        {event.title}
                    </h3>
                    <p className="text-body4 font-medium text-gray-900">
                        {event.date}
                    </p>
                    <p className="text-body4 font-medium text-gray-600">
                        <IoLocationOutline className="mr-8" /> {event.location}
                    </p>
                    <p className="text-body4 text-gray-600 line-clamp-2">
                        {trimText(event.description, 90)}
                    </p>
                </div>
            </div>
        </div>
    )
}
