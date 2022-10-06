import Card from 'src/Components/Card/Card'
import { Project } from 'src/graphql'
import { FaDiscord, } from 'react-icons/fa';
import { FiGithub, FiGlobe, FiTwitter } from 'react-icons/fi';
import CopyToClipboard from 'react-copy-to-clipboard';
import { NotificationsService, } from 'src/services'

interface Props {
    links: Pick<Project, 'discord' | 'website' | 'github' | 'twitter' | 'slack' | 'telegram'>
}

export default function LinksCard({ links }: Props) {
    const linksList = [
        {
            value: links.discord,
            text: links.discord,
            icon: FaDiscord,
            colors: "bg-violet-100 text-violet-900",
        },
        {
            value: links.website,
            text: links.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ""),
            icon: FiGlobe,
            colors: "bg-gray-100 text-gray-900",
            url: links.website
        },
        {
            value: links.twitter,
            text: links.twitter,
            icon: FiTwitter,
            colors: "bg-blue-100 text-blue-500",
            url: links.twitter
        },
        {
            value: links.github,
            text: links.github,
            icon: FiGithub,
            colors: "bg-pink-100 text-pink-600",
            url: links.github
        },
    ];

    return (
        <Card onlyMd>
            <p className="text-body2 font-bold mb-16 hidden md:block">🔗  Links</p>
            <div className="">
                {linksList.length === 0 && <>
                    <p className="text-gray-700 text-body4">No links added</p>
                </>}
                <div className="flex flex-wrap gap-16">
                    {linksList.filter(link => !!link.value).map((link, idx) =>
                    (link.url ? <a
                        key={idx}
                        href={link.url!}
                        className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                        target='_blank'
                        rel="noreferrer">
                        <link.icon className="scale-125" />
                    </a>
                        :
                        <CopyToClipboard
                            text={link.value!}
                            onCopy={() => NotificationsService.info(" Copied to clipboard", { icon: "📋" })}
                        >
                            <button
                                key={idx}
                                onClick={() => { }}
                                className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                            >
                                <link.icon className="scale-125" />
                            </button>
                        </CopyToClipboard>
                    ))}
                </div>
            </div>
        </Card>
    )
}
