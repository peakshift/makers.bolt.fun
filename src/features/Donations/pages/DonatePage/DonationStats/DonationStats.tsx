import { BiCoinStack } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { IoMedalOutline, IoRocketOutline } from "react-icons/io5";
import { useDonationsStatsQuery } from "src/graphql";
import { generateList, numberFormatter } from "src/utils/helperFunctions";
import StatCard from "../StatCard/StatCard";
import StatCardSkeleton from "../StatCard/StatCard.Skeleton";


export default function DonationStats() {

    const donationsStatQuery = useDonationsStatsQuery();



    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">

            {donationsStatQuery.loading && generateList(<StatCardSkeleton />, 4)}

            {!donationsStatQuery.loading &&
                <>
                    <StatCard
                        color="#8B5CF6"
                        label={<><BiCoinStack className='w-full lg:w-auto scale-125 mr-8' /> <span className="align-middle">Donations</span></>}
                        value={<>{numberFormatter(Number(donationsStatQuery.data?.getDonationsStats.donations))} < span className="text-body4">Sats</span></>}
                    />
                    <StatCard
                        color="#F59E0B"
                        label={<><IoRocketOutline className='w-full lg:w-auto scale-125 mr-8' /> <span className="align-middle">Tournaments</span></>}
                        value={donationsStatQuery.data?.getDonationsStats.touranments}
                    />
                    <StatCard
                        color="#22C55E"
                        label={<><IoMedalOutline className='w-full lg:w-auto scale-125 mr-8' /> <span className="align-middle">Prizes</span></>}
                        value={donationsStatQuery.data?.getDonationsStats.prizes}
                    />
                    <StatCard
                        color="#3B82F6"
                        label={<><FiGrid className='w-full lg:w-auto scale-125 mr-8' /> <span className="align-middle">Applications</span></>}
                        value={donationsStatQuery.data?.getDonationsStats.applications}
                    />
                </>
            }
        </div>
    )
}
