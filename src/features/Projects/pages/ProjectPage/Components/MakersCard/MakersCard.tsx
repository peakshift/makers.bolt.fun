import { Link } from 'react-router-dom'
import Badge from 'src/Components/Badge/Badge'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { sortMembersByRole } from 'src/features/Projects/utils/helperFunctions'
import { ProjectDetailsQuery } from 'src/graphql'
import { createRoute } from 'src/utils/routing'


interface Props {
    members: ProjectDetailsQuery['getProject']['members']
    recruit_roles: ProjectDetailsQuery['getProject']['recruit_roles']

}


export default function MakersCard({ members, recruit_roles }: Props) {
    return (
        <Card onlyMd>
            <p className="text-body6 max-md:uppercase max-md:text-gray-400 md:text-body2 font-bold">👾 Makers</p>
            <div className="mt-16">
                <div className="flex flex-wrap gap-8">
                    {members.length === 0 && <p className="text-body4 text-gray-500">Not listed</p>}
                    {sortMembersByRole(members).map(m => <Link key={m.user.id} to={createRoute({ type: "profile", id: m.user.id, username: m.user.name })}>
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
            <p className="text-body6 uppercase font-medium text-gray-400 mt-24">Open roles</p>
            <div className="mt-8">
                {recruit_roles.length === 0 && <>
                    <p className="text-gray-700 text-body4">No open roles for now</p>
                </>}
                <div className="flex flex-wrap gap-8">
                    {recruit_roles.map(role => <Badge key={role.id} size='sm'>{role.icon} {role.title}</Badge>)}
                </div>
            </div>
        </Card>
    )
}
