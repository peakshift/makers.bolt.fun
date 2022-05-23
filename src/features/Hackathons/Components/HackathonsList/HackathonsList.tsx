
import { useReachedBottom } from "src/utils/hooks/useReachedBottom"
import { ListComponentProps } from "src/utils/interfaces"
import HackathonCard, { HackathonCardType } from "../HackathonCard/HackathonCard"
import HackathonCardSkeleton from "../HackathonCard/HackathonCard.Skeleton"


type Props = ListComponentProps<HackathonCardType>

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

    return (
        <div ref={ref} className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,326px),1fr))] gap-24">
            {
                props.items?.map(hackathon => <HackathonCard key={hackathon.id} hackathon={hackathon} />)
            }
            {props.isFetching && <HackathonCardSkeleton />}
        </div>
    )
}
