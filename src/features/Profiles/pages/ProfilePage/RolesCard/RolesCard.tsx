import Card from 'src/Components/Card/Card'
import Button from 'src/Components/Button/Button'
import { RoleLevelEnum, User } from 'src/graphql';



interface Props {
    roles: User['roles'][number][]
    isOwner?: boolean;
}

export default function RolesCard({ roles, isOwner }: Props) {

    return (
        <Card>
            <p className="text-body2 font-bold">🎛️  Roles</p>
            <div className="mt-16">
                {roles.length === 0 && <>
                    <p className="text-gray-700 text-body4">No roles added</p>
                    {isOwner && <Button color='primary' className='mt-16' size='sm' href='/edit-profile/roles-skills'>Add roles</Button>}
                </>}
                <ul className=' flex flex-col gap-16'>
                    {
                        roles
                            .map(role => {

                                let levelInt = 0;
                                if (role.level === RoleLevelEnum.Hobbyist) levelInt = 1;
                                if (role.level === RoleLevelEnum.Intermediate) levelInt = 2;
                                if (role.level === RoleLevelEnum.Advanced) levelInt = 3;
                                if (role.level === RoleLevelEnum.Pro) levelInt = 4;
                                return {
                                    ...role,
                                    level: levelInt
                                }
                            })
                            .sort((a, b) => b.level - a.level)
                            .map((role) => <li
                                key={role.id}
                                className={`flex gap-16 items-center rounded-8 cursor-pointer font-bold p-4active:scale-95 transition-transform`}
                            >
                                <span className={`bg-gray-50 rounded-8 w-48 h-48 text-center py-8`}>{role.icon}</span>
                                <div className='grow'>
                                    <p className="font-medium text-gray-800">
                                        {role.title}
                                    </p>
                                    <div className="flex gap-4 mt-16">
                                        {Array(5).fill(0).map((_, idx) => {
                                            return <div key={idx} className={`flex-1 h-[2px] rounded-4 ${(idx) <= role.level ? "bg-primary-500" : "bg-gray-100"}`} />
                                        })}
                                    </div>
                                </div>
                            </li>)}
                </ul>
            </div>
        </Card>
    )
}
