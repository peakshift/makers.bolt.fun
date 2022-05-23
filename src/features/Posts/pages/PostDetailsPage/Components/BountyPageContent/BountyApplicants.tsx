import { FiMeh } from 'react-icons/fi'
import Header from 'src/features/Posts/Components/PostCard/Header/Header'
import { Bounty } from 'src/features/Posts/types'

interface Props {
    applications: Bounty['applications']
}

export default function BountyApplicants({ applications }: Props) {
    return (
        <div className="border bg-white rounded-8 p-24 mt-16">
            <h4 className="text-body2 font-bolder">Applicants</h4>
            {applications.length > 0 && <ul className="flex flex-col gap-16 mt-16">
                {applications.map(application =>
                    <li key={application.id}>
                        <Header author={application.author} size='sm' date={application.date} />
                        <div className="bg-gray-100 mt-10 p-16 rounded-8">
                            <p className="text-body5 font-medium mb-8">Work Plan</p>
                            <p className="text-body5 text-gray-600">   {application.workplan}</p>
                        </div>
                    </li>
                )}

            </ul>}
            {applications.length === 0 && <div className='flex flex-col gap-16 mt-16'>
                <FiMeh className='text-body2' />
                <p className="text-body4 font-medium">
                    No applicants yet
                </p>
                <p className="text-body5">
                    The current bounty has  no current appliacants
                </p>
            </div>}
        </div>
    )
}
