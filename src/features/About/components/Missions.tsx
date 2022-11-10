
import { FiEye, FiFolder, FiRadio, FiZap } from 'react-icons/fi'

export default function Missions() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24">
            {missions.map((mission, idx) => <div key={idx} className='bg-gray-800 text-white p-16 rounded-16'>
                <span className='w-40 aspect-square bg-violet-500 flex justify-center items-center rounded-full'><mission.icon /></span>
                <p className='mt-16 text-body2 font-bolder'>{mission.title}</p>
                <p className='mt-12 font-medium text-gray-300'>{mission.content}</p>
            </div>)}
        </div>
    )
}

const missions = [
    {
        icon: FiZap,
        title: "Stimulating growth",
        content: "Allowing investors to identify and fill market gaps, triggering innovation."
    },
    {
        icon: FiFolder,
        title: "Organising resource data",
        content: "Creating a better discovery UX through smart search functionality."
    },
    {
        icon: FiRadio,
        title: "Providing exposure",
        content: "Giving maximum exposure to lightning projects in the space."
    },
    {
        icon: FiEye,
        title: "Increasing accessibility",
        content: "Making it easy for anyone to transparently find lightning projects."
    },
]
