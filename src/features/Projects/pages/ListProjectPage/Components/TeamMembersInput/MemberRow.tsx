import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { ComponentProps } from 'react'
import { NestedValue } from 'react-hook-form'
import { FaChevronDown, FaRegTrashAlt, } from 'react-icons/fa';
import UsersInput from 'src/Components/Inputs/UsersInput/UsersInput'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { Team_Member_Role } from 'src/graphql';
import { Value } from './TeamMembersInput'

interface Props {
    user: Value[number]
    onRemove: () => void;
    onUpdateRole: (role: Team_Member_Role) => void
    disabled?: boolean;
    canUpdateRole?: boolean;
    canDelete?: boolean;

}

export default function MemberRow({ user, onRemove, onUpdateRole, disabled, canUpdateRole, canDelete }: Props) {
    return (
        <div
            key={user.id}
            className="border-b py-16 last-of-type:border-b-0 flex gap-16 items-center">

            <Avatar width={40} src={user.avatar} />
            <div className='grow overflow-hidden'>
                <p className="font-medium self-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.name}
                </p>
                <p className="text-body5 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.jobTitle}
                </p>
            </div>

            <div className="ml-auto flex gap-12 md:gap-16 shrink-0">
                {canUpdateRole ? <Menu
                    offsetY={12}
                    align='end'
                    menuButton={<MenuButton className='border text-body6 border-gray-200 p-8 rounded-8 text-gray-500'>{user.role} <FaChevronDown className='ml-4 text-gray-400' /></MenuButton>} transition>
                    {[Team_Member_Role.Admin, Team_Member_Role.Maker].map(role =>
                        <MenuItem
                            className={'text-body6'}
                            onClick={() => onUpdateRole(role)}
                            key={role}>{role}</MenuItem>
                    )}
                </Menu>
                    :
                    <span className="text-gray-500">{user.role}</span>
                }
                {canDelete && <button onClick={() => onRemove()} className=''>
                    <FaRegTrashAlt className='text-red-400' />
                </button>}
            </div>
        </div>
    )
}
