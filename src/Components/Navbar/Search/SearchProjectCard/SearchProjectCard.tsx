
import SearchProjectCardSkeleton from './SearchProjectCard.Skeleton'
import { ProjectSearchItem } from '../Search';

type Props =
    {
        loading: true
    }
    |
    {
        loading?: false
        project: ProjectSearchItem
        onClick: (projectId: number) => void;
    }

export default function SearchProjectCard(props: Props) {

    if (props.loading)
        return <SearchProjectCardSkeleton />


    return (
        <div
            className='p-12 rounded-12 hover:bg-gray-100 flex items-start gap-16 cursor-pointer'
            onClick={() => props.onClick(props.project.id)}
        >
            <img src={props.project.thumbnail_image!} alt={props.project.title} draggable="false" className="flex-shrink-0 w-40 h-40 bg-gray-200 border-0 rounded-10 object-cover"></img>
            <div className="min-w-0">
                <p className="text-body4 text-black w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">{props.project.title}</p>
                <p className="text-body6 text-gray-600 font-light mt-4">{props.project.category.title}</p>
            </div>

        </div>
    )
}
