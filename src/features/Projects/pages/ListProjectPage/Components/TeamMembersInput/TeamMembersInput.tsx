import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { ComponentProps } from 'react'
import { NestedValue } from 'react-hook-form'
import { FaChevronDown, FaRegTrashAlt, } from 'react-icons/fa';
import UsersInput from 'src/Components/Inputs/UsersInput/UsersInput'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { Team_Member_Role } from 'src/graphql';
import { IListProjectForm } from '../FormContainer/FormContainer';

type Value = IListProjectForm['members'] extends NestedValue<infer U> ? U : never;

type Props = {
    value: Value,
    onChange?: (new_value: Value) => void
}

export default function TeamMembersInput({ value, onChange = () => { } }: Props) {

    const addMember: ComponentProps<typeof UsersInput>['onSelect'] = (user) => {
        if (value.some(u => u.id === user.id))
            return;
        onChange([
            ...value,
            {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                jobTitle: user.jobTitle,
                role: Team_Member_Role.Maker,
            }])
    }

    const setMemberRole = (id: number, role: Team_Member_Role) => {
        onChange(value.map(u => {
            if (u.id !== id) return u;
            return {
                ...u,
                role,
            }
        }))
    }

    const removeMemeber = (id: number) => {
        onChange(value.filter(u => u.id !== id));
    }

    return (
        <>
            <UsersInput onSelect={addMember} />
            {value.length > 0 &&
                <div className='flex flex-col mt-24'>
                    {value.map(user => {
                        return <div
                            key={user.id}
                            className="border-b py-16 last-of-type:border-b-0 flex flex-wrap gap-16 items-center">

                            <Avatar width={40} src={user.avatar} />
                            <div className='grow'>
                                <p className="font-medium self-center">
                                    {user.name}
                                </p>
                                <p className="text-body5 text-gray-500">
                                    {user.jobTitle}
                                </p>
                            </div>
                            <div className="ml-auto flex gap-16">
                                <Menu
                                    offsetY={12}
                                    align='end'
                                    menuButton={<MenuButton className='border border-gray-200 p-8 rounded-8 text-gray-500'>{user.role} <FaChevronDown className='ml-4 text-gray-400' /></MenuButton>} transition>
                                    {Object.values(Team_Member_Role).map(role =>
                                        <MenuItem
                                            onClick={() => setMemberRole(user.id, role)}
                                            key={role}>{role}</MenuItem>
                                    )}
                                </Menu>
                                <button onClick={() => removeMemeber(user.id)} className=''>
                                    <FaRegTrashAlt className='text-red-400' />
                                </button>
                            </div>
                        </div>
                    })}
                </div>}
        </>
    )
}
