import Avatar from "src/features/Profiles/Components/Avatar/Avatar"
import { User } from "src/graphql"
import { trimText } from "src/utils/helperFunctions"
import { FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'

interface Props {
    user: Pick<User,
        | 'name'
        | 'email'
        | 'jobTitle'
        | 'avatar'
        | 'website'
        | 'github'
        | 'twitter'
        | 'linkedin'
        | 'location'
        | 'bio'
    >
}

export default function AboutCard({ user }: Props) {
    return (
        <div className="rounded-16 bg-white border-2 border-gray-200">
            <div className="bg-gray-600 relative h-[160px] rounded-t-16">
                <div className="absolute left-24 bottom-0 translate-y-1/2">
                    <Avatar src={user.avatar} width={120} />
                </div>
            </div>
            <div className="h-64"></div>
            <div className="p-24 pt-0 flex flex-col gap-16">
                <h1 className="text-h2 font-bolder">
                    {trimText(user.name, 20)}
                </h1>

                <div className="flex flex-wrap gap-16">
                    {user.website && <a
                        href={user.website}
                        className="text-body4 text-primary-700 font-medium"
                        target='_blank'
                        rel="noreferrer">
                        <FiGlobe className="scale-125 mr-8" /> <span className="align-middle">Website</span>
                    </a>}
                    {user.twitter && <a
                        href={`https://twitter.com/@${user.twitter}`}
                        className="text-body4 text-primary-700 font-medium"
                        target='_blank'
                        rel="noreferrer">
                        <FiTwitter className="scale-125 mr-8" /> <span className="align-middle">{user.twitter}</span>
                    </a>}
                    {user.github && <a
                        href={`https://github.com/${user.github}`}
                        className="text-body4 text-primary-700 font-medium"
                        target='_blank'
                        rel="noreferrer">
                        <FiGithub className="scale-125 mr-8" /> <span className="align-middle">{user.github}</span>
                    </a>}
                    {user.linkedin && <a
                        href={user.linkedin}
                        className="text-body4 text-primary-700 font-medium"
                        target='_blank'
                        rel="noreferrer">
                        <FiLinkedin className="scale-125 mr-8" /> <span className="align-middle">LinkedIn</span>
                    </a>}
                </div>
                {user.jobTitle && <p className="text-body4 font-medium">
                    {user.jobTitle}
                </p>}
                {user.bio && <p className="text-body5 font-medium">
                    {user.bio}
                </p>}
            </div>
        </div>
    )
}
