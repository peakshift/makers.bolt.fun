
import { ComponentProps } from 'react'
import { NestedValue } from 'react-hook-form'
import UsersInput from 'src/Components/Inputs/UsersInput/UsersInput'
import { ProjectPermissionEnum, Team_Member_Role } from 'src/graphql';
import { IListProjectForm } from '../FormContainer/FormContainer';
import { useUpdateProjectContext } from '../FormContainer/updateProjectContext';
import MemberRow from './MemberRow';

export type Value = IListProjectForm['members'] extends NestedValue<infer U> ? U : never;

type Props = {
    value: Value,
    onChange?: (new_value: Value) => void
}

export default function TeamMembersInput({ value, onChange = () => { } }: Props) {


    const { permissions } = useUpdateProjectContext()

    const canAddNew = permissions.includes(ProjectPermissionEnum.UpdateAdmins)
    const canUpdateMembers = permissions.includes(ProjectPermissionEnum.UpdateMembers)
    const canUpdateAdmins = permissions.includes(ProjectPermissionEnum.UpdateAdmins)

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

    const removeMember = (id: number) => {
        onChange(value.filter(u => u.id !== id));
    }

    return (
        <>
            {canAddNew && <UsersInput onSelect={addMember} />}
            {value.length > 0 &&
                <div className='flex flex-col mt-24'>
                    {value.map(member => {

                        let canEdit = false;

                        if (member.role === Team_Member_Role.Admin) canEdit = canUpdateAdmins;
                        if (member.role === Team_Member_Role.Maker) canEdit = canUpdateMembers;

                        return <MemberRow
                            key={member.id}
                            user={member}
                            canUpdateRole={canEdit}
                            canDelete={canEdit}
                            onRemove={() => removeMember(member.id)}
                            onUpdateRole={role => setMemberRole(member.id, role)}
                        />
                    })}
                </div>}
        </>
    )
}
