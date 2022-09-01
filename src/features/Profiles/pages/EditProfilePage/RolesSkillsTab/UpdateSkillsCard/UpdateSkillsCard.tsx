import React, { useMemo } from 'react'
import { GrClose } from 'react-icons/gr'
import Card from 'src/Components/Card/Card'
import { MakerSkill } from 'src/graphql'
import SkillsInput from './SkillsInput'

type Value = Pick<MakerSkill, 'id'>

interface Props {
    allSkills: Pick<MakerSkill, 'id' | 'title'>[];
    value: Value[],
    onChange: (newValue: Value[]) => void
}

export default function UpdateSkillsCard(props: Props) {

    const add = (newValue: Value) => {
        props.onChange([...props.value, newValue])
    }

    const idToValue = useMemo(() => {
        const map = new Map<number, Props['allSkills'][number]>();
        for (let i = 0; i < props.allSkills.length; i++) {
            const element = props.allSkills[i];
            map.set(element.id, element);
        }
        return map;
    }, [props.allSkills])

    const remove = (id: number) => {
        props.onChange(props.value.filter(v => v.id !== id))
    }


    return (
        <Card>
            <p className="text-body2 font-bold">🌈  Skills</p>
            <p className="text-body4 text-gray-600 mt-8">Add some of your skills and let other makers know what you’re good at.</p>
            <div className="mt-16">
                <SkillsInput options={props.allSkills.filter(skill => !props.value.some(v => v.id === skill.id))} onSelect={add} />
            </div>
            {props.value.length > 0 && <ul className=' flex flex-wrap gap-x-8 gap-y-20 mt-16'>
                {props.value.map((skill) => <li key={skill.id} className="px-16 py-8 bg-gray-100 rounded-48 text-body5 font-medium">
                    {idToValue.get(skill.id)?.title} <button className='ml-8' onClick={() => remove(skill.id)}><GrClose /></button>
                </li>)}
            </ul>}

            <p className="text-body5 text-gray-400 pt-16 mt-32 border-t-2 border-gray-200">ℹ️ Can't find a specific skill/role that you think should be here? You can ask for it to be added <a href="https://github.com/peakshift/makers.bolt.fun/discussions/143" target='_blank' rel="noreferrer" className='font-bold underline'>here</a> </p>
        </Card>
    )
}
