
import { useReachedBottom } from "src/utils/hooks/useReachedBottom"
import { ListComponentProps } from "src/utils/interfaces"
import HackathonCard, { HackathonCardType } from "../HackathonCard/HackathonCard"
import HackathonCardSkeleton from "../HackathonCard/HackathonCard.Skeleton"


type Props = ListComponentProps<HackathonCardType> & {
    currentFilter: null | string;
}

export default function HackathonsList(props: Props) {

    const { ref } = useReachedBottom<HTMLDivElement>(props.onReachedBottom)

    if (props.isLoading)
        return <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,326px),1fr))] gap-24">
            {<>
                <HackathonCardSkeleton />
                <HackathonCardSkeleton />
                <HackathonCardSkeleton />
            </>
            }
        </div>

    if (props.items?.length === 0)
        return <div className="px-32 text-body3 text-gray-600 py-48 text-center relative">
            <span className="bg-white px-16">No {props.currentFilter ? props.currentFilter : ""} Hackathons Currently...</span>
            {/* <div className="bg-gray-400  w-full h-[2px] absolute top-1/2 left-0 -translate-y-1/2 z-[-1]"></div> */}
        </div>

    return (
        <div ref={ref} className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,326px),1fr))] gap-24">
            {
                props.items?.map(hackathon => <HackathonCard key={hackathon.id} hackathon={hackathon} />)
            }
            {props.isFetching && <HackathonCardSkeleton />}
        </div>
    )
}
