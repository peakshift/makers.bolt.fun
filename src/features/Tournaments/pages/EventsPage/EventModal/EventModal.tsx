
import { MdClose, } from 'react-icons/md';
import { ModalCard } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useMediaQuery } from 'src/utils/hooks';
import { Tournament, } from 'src/graphql';
import { MEDIA_QUERIES } from 'src/utils/theme';
import { IoGlobe, IoLocationOutline } from 'react-icons/io5';
import { mapTypeToBadge } from '../EventCard/EventCard';


interface Props extends ModalCard {
    event: Pick<Tournament['events'][number],
        | "id"
        | "title"
        | "image"
        | "description"
        | "date"
        | "location"
        | "type"
        | "website">
}

export default function ProjectDetailsCard({ direction, event, ...props }: Props) {

    const closeModal = () => {
        props.onClose?.();
    }


    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)

    return (
        <div
            className={`modal-card max-w-[768px] ${(props.isPageModal && !isMdScreen) && '!rounded-0 w-full min-h-screen'}`}
        >
            <div className="relative h-[160px]">
                <img className="w-full h-full object-cover" src={event.image} alt="" />
                <button className="w-32 h-32  bg-gray-700 text-white absolute top-16 right-16 rounded-full flex flex-col justify-center items-center" onClick={closeModal}><MdClose className=' inline-block text-body2 lg:text-body1' /></button>
                <span className={`absolute top-16 left-16 text-body5 self-start px-8 py-4 rounded-20 bg-gray-700 text-white `}>
                    {mapTypeToBadge[event.type].text}
                </span>
            </div>
            <div className="p-16 md:p-24">
                <h1 className="text-body1 font-bold">{event.title}</h1>
                <p className="text-body4 font-medium text-gray-900 mt-8">
                    {event.date}
                </p>
                <div className="flex gap-16 mt-8">
                    <p className="text-body4 font-medium text-primary-600 shrink-0">
                        <IoLocationOutline className="mr-4" /> <span className="align-middle">{event.location}</span>
                    </p>
                    <p className="text-body4 font-medium text-primary-600 overflow-hidden whitespace-nowrap text-ellipsis">
                        <IoGlobe className="mr-4" />
                        <a href={event.website} target="_blank" rel="noreferrer" > <span className="align-middle ">{event.website}</span></a>
                    </p>
                </div>
                <p className="text-body4 text-gray-600 mt-24">
                    {event.description}
                </p>
            </div>
        </div>
    )
}
