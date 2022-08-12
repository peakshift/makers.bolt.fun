import { useParams } from "react-router-dom"
import LoadingPage from "src/Components/LoadingPage/LoadingPage"
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage"
import { useProfileQuery } from "src/graphql"
import AboutCard from "./AboutCard/AboutCard"
import { Helmet } from 'react-helmet'
import { useAppSelector } from 'src/utils/hooks';
import styles from './styles.module.scss'
import StoriesCard from "./StoriesCard/StoriesCard"
import CommentsSettingsCard from "./CommentsSettingsCard/CommentsSettingsCard"

export default function ProfilePage() {

    const { id } = useParams()
    const profileQuery = useProfileQuery({
        variables: {
            profileId: Number(id!),
        },
        skip: isNaN(Number(id)),
    })
    const isOwner = useAppSelector(state => Boolean(state.user.me?.id && state.user.me?.id === profileQuery.data?.profile?.id))


    if (profileQuery.loading)
        return <LoadingPage />

    if (!profileQuery.data?.profile)
        return <NotFoundPage />

    return (
        <>
            <Helmet>
                <title>{profileQuery.data.profile.name}</title>
                <meta property="og:title" content={profileQuery.data.profile.name} />

                {profileQuery.data?.profile?.lightning_address &&
                    <meta name="lightning" content={`lnurlp:${profileQuery.data.profile.lightning_address}`} />
                }
                <meta property="og:image" content={profileQuery.data.profile.avatar} />
            </Helmet>
            <div className={`page-container ${styles.grid}`}
            >
                <aside></aside>
                <main className="flex flex-col gap-24">
                    <AboutCard user={profileQuery.data.profile} isOwner={isOwner} />
                    <StoriesCard stories={profileQuery.data.profile.stories} isOwner={isOwner} />
                </main>
                <aside></aside>
            </div>
        </>
    )
}
