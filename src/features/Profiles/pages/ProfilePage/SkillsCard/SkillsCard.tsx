import Card from 'src/Components/Card/Card'
import Button from 'src/Components/Button/Button'
import { User } from 'src/graphql';



interface Props {
    skills: User['skills'][number][]
    isOwner: boolean;
}

export default function SkillsCard({ skills, isOwner }: Props) {
    return (
        <Card>
            <p className="text-body2 font-bold">🌈  Skills</p>
            <div className="mt-16">
                {skills.length === 0 && <>
                    <p className="text-gray-700 text-body4">No skills added</p>
                    {isOwner && <Button color='primary' className='mt-16' size='sm' href='/edit-profile/roles-skills'>Add skills</Button>}
                </>}
                <ul className=' flex flex-wrap gap-8'>
                    {skills.map((skill) => <li key={skill.id} className="text-body5 border border-gray-200 px-12 py-4 bg-gray-100 rounded-48 font-medium">{skill.title}</li>)}
                </ul>
            </div>
        </Card>
    )
}
