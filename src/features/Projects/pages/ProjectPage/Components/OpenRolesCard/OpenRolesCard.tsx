import Badge from 'src/Components/Badge/Badge'
import Card from 'src/Components/Card/Card'
import { ProjectDetailsQuery } from 'src/graphql'


interface Props {
    recruit_roles: ProjectDetailsQuery['getProject']['recruit_roles']
}


export default function OpenRolesCard({ recruit_roles }: Props) {
    return (
        <Card>
            <p className="text-body2 font-bold">👀  Open roles</p>
            <div className="mt-16">
                {recruit_roles.length === 0 && <>
                    <p className="text-gray-700 text-body4">No open roles for now</p>
                </>}
                <div className="flex flex-wrap gap-16">
                    {recruit_roles.map(role => <Badge key={role.id} size='sm'>{role.icon} {role.title}</Badge>)}
                </div>
            </div>
        </Card>
    )
}
