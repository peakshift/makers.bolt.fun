import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import Card from 'src/Components/Card/Card'
import { GenericMakerRole, MakerRole, RoleLevelEnum } from 'src/graphql'
import { IRolesSkillsForm } from '../RolesSkillsTab'

type Value = Pick<MakerRole, 'id' | 'level'>

interface Props {
    allRoles: Pick<GenericMakerRole, 'id' | 'title' | 'icon'>[];
    value: Value[],
    onChange: (newValue: Value[]) => void
}

export default function UpdateRolesCard(props: Props) {

    const add = (idx: number) => {
        props.onChange([...props.value.slice(-2), { ...props.allRoles[idx], level: RoleLevelEnum.Beginner }])
    }

    const remove = (idx: number) => {
        props.onChange(props.value.filter(v => v.id !== props.allRoles[idx].id))
    }

    const setLevel = (roleId: number, level: RoleLevelEnum) => {
        props.onChange(props.value.map(v => {
            if (v.id !== roleId) return v;
            return {
                ...v,
                level
            }
        }))
    }


    return (
        <Card>
            <p className="text-body2 font-bold">🎛️  Roles</p>
            <p className="text-body4 text-gray-600 mt-8"> Select your top 3 roles, and let other makers know what your level is.</p>
            <ul className=' flex flex-wrap gap-8 mt-24'>
                {props.allRoles.map((role, idx) => {
                    const isActive = props.value.some(v => v.id === role.id);

                    return <button
                        key={role.id}
                        className={`
                    px-12 py-8 border rounded-10 text-body5 font-medium
                    active:scale-95 transition-transform
                    ${!isActive ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                    `}
                        onClick={() => isActive ? remove(idx) : add(idx)}
                    >{role.icon} {role.title}
                    </button>
                })}
            </ul>

            {props.value.length > 0 && <div className="pt-24 mt-24 border-t border-gray-200">
                <ul className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center gap-16">
                    {props.value.map(role => {
                        const { title, icon } = props.allRoles.find(r => r.id === role.id)!;

                        return <React.Fragment key={role.id}>
                            <p className="shrink-0 text-body4 whitespace-nowrap">{icon} {title}</p>
                            <div className="flex flex-wrap gap-8 grow text-body5 mb-8 last-of-type:mb-0">
                                {[RoleLevelEnum.Beginner, RoleLevelEnum.Hobbyist, RoleLevelEnum.Intermediate, RoleLevelEnum.Advanced, RoleLevelEnum.Pro].map(r =>
                                    <button className={` 
                                px-12 py-4 bg-gray-100 border rounded-8 flex-1
                                active:scale-95 transition-transform
                                ${r !== role.level ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                `}
                                        onClick={() => setLevel(role.id, r)}
                                    >{r}</button>
                                )}</div>
                        </React.Fragment >
                    })}
                </ul>
            </div>}
        </Card>
    )
}
