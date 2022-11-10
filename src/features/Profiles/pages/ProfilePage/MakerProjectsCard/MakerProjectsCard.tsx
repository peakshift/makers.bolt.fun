
import { Link } from 'react-router-dom'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { ProfileQuery, User, useSimilarProjectsQuery } from 'src/graphql'
import { createRoute } from 'src/utils/routing'

interface Props {
    projects: NonNullable<ProfileQuery['profile']>['projects']
    isOwner?: boolean;
}

export default function MakerProjectsCard({ projects, isOwner }: Props) {


    return (
        <Card>
            <h3 className="text-body2 font-bolder">🚀 Projects ({projects.length})</h3>
            {projects.length === 0 && <>
                <p className="text-gray-700 text-body4">😐 No projects listed</p>
                {isOwner && <Button color='primary' className='mt-16' size='sm' href={createRoute({ type: "edit-project" })}>List your first project</Button>}
            </>}
            <ul className='flex flex-col'>
                {projects.map(project => {
                    return <Link key={project.id} to={createRoute({ type: "project", tag: project.hashtag })} className="md:border-b py-16 last-of-type:border-b-0 last-of-type:pb-0">
                        <li className="flex items-center gap-12">
                            <img className='w-48 aspect-square rounded-12 border border-gray-100' alt='' src={project.thumbnail_image!} />
                            <div className='overflow-hidden'>
                                <p className="text-body4 text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{project.title}</p>
                                <p className="text-body5 text-gray-500">{project.category.icon} {project.category.title}</p>
                            </div>
                        </li>
                    </Link>
                })}
            </ul>
        </Card>
    )
}
