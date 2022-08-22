import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import Card from 'src/Components/Card/Card'
import { GenericMakerRole, MakerRole, MakerSkill, RoleLevelEnum } from 'src/graphql'
import { IRolesSkillsForm } from '../RolesSkillsTab'

type Value = Pick<MakerSkill, 'id'>

interface Props {
    allSkills: Pick<MakerSkill, 'id' | 'title'>[];
    value: Value[],
    onChange: (newValue: Value[]) => void
}

export default function UpdateSkillsCard(props: Props) {

    const add = (idx: number) => {
        props.onChange([...props.value.slice(-2), { ...props.allSkills[idx] }])
    }

    const remove = (idx: number) => {
        props.onChange(props.value.filter(v => v.id !== props.allSkills[idx].id))
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
            <p className="text-body2 font-bold">🌈  Skills</p>
            <p className="text-body4 text-gray-600 mt-8">Add some of your skills and let other makers know what you’re good at.</p>
            {/* <ul className=' flex flex-wrap gap-8 mt-24'>
                {props.allSkills.map((role, idx) => {
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
            </ul> */}

        </Card>
    )
}
