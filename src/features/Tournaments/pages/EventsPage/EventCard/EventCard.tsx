import { IoLocationOutline } from 'react-icons/io5'
import Button from "src/Components/Button/Button"
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { trimText } from "src/utils/helperFunctions";
import { Override } from "src/utils/interfaces";
import { Tag, Tournament, TournamentEventTypeEnum } from "src/graphql";
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { useAppDispatch, } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";


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

    const dispatch = useAppDispatch()

    const openEventModal = () => {
        dispatch(openModal({
            Modal: "EventModal",
            isPageModal: true,
            props: {
                event
            }
        }))
    }

    return (
        <div
            role='button'
            className="rounded-16 bg-white overflow-hidden border-2 flex flex-col group"
            onClick={openEventModal}
        >
            <img className="w-full h-[160px] object-cover" src={event.image} alt="" />
            <div className="p-16 grow flex flex-col">
                <div className="flex flex-col gap-8">
                    <h3 className="text-body2 font-bold text-gray-900 group-hover:underline">
                        {event.title}
                    </h3>
                    <p className="text-body4 font-medium text-gray-900">
                        {event.date}
                    </p>
                    <p className="text-body4 font-medium text-gray-600">
                        <IoLocationOutline className="mr-4" /> <span className="align-middle">{event.location}</span>
                    </p>
                    <p className="text-body4 text-gray-600 line-clamp-2">
                        {trimText(event.description, 90)}
                    </p>
                    <span className={`mt-8 text-body5 self-start px-8 py-4 rounded-20 ${mapTypeToBadge[event.type].color}`}>
                        {mapTypeToBadge[event.type].text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export const mapTypeToBadge: UnionToObjectKeys<Props['event'], 'type', { text: string, color: string }> = {
    [TournamentEventTypeEnum.TwitterSpace]: {
        text: "🐦 Twitter space",
        color: "bg-blue-50 text-blue-500"
    },
    [TournamentEventTypeEnum.Workshop]: {
        text: "🛠️ Workshop",
        color: "bg-green-50 text-green-500"
    },
    [TournamentEventTypeEnum.IrlMeetup]: {
        text: "🤝  IRL meetup",
        color: "bg-red-50 text-red-500"
    },
}
