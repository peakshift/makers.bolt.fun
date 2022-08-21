
import { Link } from 'react-router-dom'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { User } from 'src/graphql'
import { createRoute } from 'src/utils/routing'

interface Props {
    makers: Pick<User,
        | "id"
        | "name"
        | "jobTitle"
        | 'avatar'
    >[]
}

export default function SimilarMakersCard({ makers }: Props) {


    return (
        <Card onlyMd>
            <h3 className="text-body2 font-bolder">Similar makers</h3>
            <ul className='flex flex-col'>
                {makers.map(maker => {
                    return <Link key={maker.id} to={createRoute({ type: "profile", id: maker.id, username: maker.name })} className="border-b py-16 last-of-type:border-b-0 last-of-type:pb-0">
                        <li className="flex items-start gap-8">
                            <Avatar width={40} src={maker.avatar} />
                            <div>
                                <p className="text-body4 text-gray-800 font-medium">{maker.name}</p>
                                <p className="text-body5 text-gray-500 font-medium">{maker.jobTitle}</p>
                            </div>
                        </li>
                    </Link>
                })}
            </ul>
        </Card>
    )
}
