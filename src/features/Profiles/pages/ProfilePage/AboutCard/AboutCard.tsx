import Avatar from "src/features/Profiles/Components/Avatar/Avatar"
import { User } from "src/graphql"
import { trimText, withHttp } from "src/utils/helperFunctions"
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";

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
            hasValue: user.email,
            text: user.email,
            icon: FiMail,
            colors: "bg-violet-100 text-violet-900",
            url: user.email && `mailto:${user.email}`
        },
        {
            hasValue: user.website,
            text: user.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ""),
            icon: FiGlobe,
            colors: "bg-gray-100 text-gray-900",
            url: user.website && withHttp(user.website)
        },
        {
            hasValue: user.twitter,
            text: user.twitter,
            icon: FiTwitter,
            colors: "bg-blue-100 text-blue-500",
            url: `https://twitter.com/@${user.twitter}`
        },
        {
            hasValue: user.github,
            text: user.github,
            icon: FiGithub,
            colors: "bg-pink-100 text-pink-600",
            url: `https://github.com/${user.github}`
        },
        {
            hasValue: user.linkedin,
            text: "LinkedIn",
            icon: FiLinkedin,
            colors: "bg-sky-100 text-cyan-600",
            url: user.linkedin && withHttp(user.linkedin),
        }
    ];


    return (
        <Card defaultPadding={false}>

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
                    <div>
                        <h1 className="text-h2 font-bolder break-words">
                            {user.name}
                        </h1>

                        {<p className="text-body3 font-medium text-gray-600">
                            {user.jobTitle ? user.jobTitle : "No job title added"}
                        </p>}
                    </div>
                    {<div className="flex flex-wrap gap-16">
                        {links.filter(link => link.hasValue || isOwner).map((link, idx) => link.hasValue ?
                            <a
                                key={idx}
                                href={link.url!}
                                className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                                target='_blank'
                                rel="noreferrer">
                                <link.icon className="scale-125" />
                            </a>
                            :
                            (isOwner &&
                                <p
                                    key={idx}
                                    className={`text-body4 py-8 px-16 rounded-24 font-medium ${link.colors}`}
                                >
                                    <link.icon className="scale-125 mr-8" /> <span className="align-middle">---</span>
                                </p>))}
                    </div>}


                    {<p className="text-body5 font-medium">
                        {user.lightning_address ? `⚡${user.lightning_address}` : "⚡ No lightning address"}
                    </p>}

                    {<p className="text-body5 font-medium">
                        {user.bio ? user.bio : "No bio added"}
                    </p>}
                </div>
            </div>

        </Card>
    )
}
