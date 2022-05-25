import { BiCoinStack } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { IoMedalOutline, IoRocketOutline } from "react-icons/io5";
import StatCard from "../StatCard/StatCard";


export default function DonationStats() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-16">
            <StatCard
                color="#8B5CF6"
                label={<><BiCoinStack className='scale-125 mr-8' /> <span className="align-middle">Donations</span></>}
                value='$2.6k'
            />
            <StatCard
                color="#F59E0B"
                label={<><IoRocketOutline className='scale-125 mr-8' /> <span className="align-middle">Tournaments</span></>}
                value='1'
            />
            <StatCard
                color="#22C55E"
                label={<><IoMedalOutline className='scale-125 mr-8' /> <span className="align-middle">Prizes</span></>}
                value='$2.5k'
            />
            <StatCard
                color="#3B82F6"
                label={<><FiGrid className='scale-125 mr-8' /> <span className="align-middle">Applications</span></>}
                value='36'
            />
        </div>
    )
}
