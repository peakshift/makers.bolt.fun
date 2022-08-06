import Avatar from "src/features/Profiles/Components/Avatar/Avatar"
import { User } from "src/graphql"
import { trimText, withHttp } from "src/utils/helperFunctions"
import { FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'
import Button from "src/Components/Button/Button";
import { PAGES_ROUTES } from "src/utils/routing";

interface Props {
    isOwner?: boolean;
    user: Pick<User,
        | 'name'
        | 'email'
        | 'lightning_address'
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

export default function AboutCard({ user, isOwner }: Props) {

    const links = [
        {
            hasValue: user.website,
            text: user.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ""),
            icon: FiGlobe,
            url: user.website && withHttp(user.website)
        },
        {
            hasValue: user.twitter,
            text: user.twitter,
            icon: FiTwitter,
            url: `https://twitter.com/@${user.twitter}`
        },
        {
            hasValue: user.github,
            text: user.github,
            icon: FiGithub,
            url: `https://github.com/${user.github}`
        },
        {
            hasValue: user.linkedin,
            text: "LinkedIn",
            icon: FiLinkedin,
            url: user.linkedin && withHttp(user.linkedin),
        }
    ];


    return (
        <div className="rounded-16 bg-white border-2 border-gray-200">
            <div className="bg-gray-600 relative h-[160px] rounded-t-16">
                <div className="absolute left-24 bottom-0 translate-y-1/2">
                    <Avatar src={user.avatar} width={120} />
                </div>
            </div>
            <div className="h-64 flex justify-end items-center px-24">
                {(isOwner) && <Button size="sm" color="gray" href='/edit-profile'>Edit Profile</Button>}
            </div>
            <div className="p-24 pt-0">
                <div className="flex flex-col gap-16">
                    <h1 className="text-h2 font-bolder">
                        {trimText(user.name, 20)}
                    </h1>

                    {links.some(link => link.hasValue) && <div className="flex flex-wrap gap-16">
                        {links.filter(link => link.hasValue || isOwner).map((link, idx) => link.hasValue ?
                            <a
                                key={idx}
                                href={link.url!}
                                className="text-body4 text-primary-700 font-medium"
                                target='_blank'
                                rel="noreferrer">
                                <link.icon className="scale-125 mr-8" /> <span className="align-middle">{link.text}</span>
                            </a> :
                            <p
                                key={idx}
                                className="text-body4 text-primary-700 font-medium"
                            >
                                <link.icon className="scale-125 mr-8" /> <span className="align-middle">---</span>
                            </p>)}
                    </div>}

                    {(user.jobTitle || isOwner) && <p className="text-body4 font-medium">
                        {user.jobTitle ? user.jobTitle : "No job title added"}
                    </p>}

                    {(user.lightning_address || isOwner) && <p className="text-body5 font-medium">
                        {user.lightning_address ? `⚡${user.lightning_address}` : "⚡ No lightning address"}
                    </p>}

                    {(user.bio || isOwner) && <p className="text-body5 font-medium">
                        {user.bio ? user.bio : "No bio added"}
                    </p>}
                </div>
            </div>
        </div>
    )
}
