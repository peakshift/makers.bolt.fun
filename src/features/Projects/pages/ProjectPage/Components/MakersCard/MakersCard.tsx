import { Link } from 'react-router-dom'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { ProjectDetailsQuery } from 'src/graphql'
import { createRoute } from 'src/utils/routing'


interface Props {
    members: ProjectDetailsQuery['getProject']['members']
}


export default function MakersCard({ members }: Props) {
    return (
        <Card>
            <p className="text-body2 font-bold">👾 Makers</p>
            <div className="mt-16">
                <div className="flex flex-wrap gap-8">
                    {members.map(m => <Link key={m.user.id} to={createRoute({ type: "profile", id: m.user.id, username: m.user.name })}>
                        <Avatar
                            width={40}
                            src={m.user.avatar}
                            renderTooltip={() => <div className='bg-white px-12 py-8 border border-gray-200 rounded-12 flex flex-wrap gap-12 shadow-lg'>
                                <Avatar width={48} src={m.user.avatar} />
                                <div className='overflow-hidden'>
                                    <p className={`text-black font-medium overflow-hidden text-ellipsis`}>{m.user.name}</p>
                                    <p className={`text-body6 text-gray-600`}>{m.user.jobTitle}</p>
                                </div>
                            </div>}
                        />
                    </Link>)}
                </div>
            </div>
        </Card>
    )
}
