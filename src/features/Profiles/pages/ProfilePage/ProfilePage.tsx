import { useParams } from "react-router-dom"
import LoadingPage from "src/Components/LoadingPage/LoadingPage"
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage"
import { useProfileQuery } from "src/graphql"
import AboutCard from "./AboutCard/AboutCard"
import { Helmet } from 'react-helmet'
import { useAppSelector, useMediaQuery } from 'src/utils/hooks';
import styles from './styles.module.scss'
import StoriesCard from "./StoriesCard/StoriesCard"
import RolesCard from "./RolesCard/RolesCard"
import SkillsCard from "./SkillsCard/SkillsCard"
import TournamentsCard from "./TournamentsCard/TournamentsCard"
import { MEDIA_QUERIES } from "src/utils/theme"
import SimilarMakersCard from "./SimilarMakersCard/SimilarMakersCard"

export default function ProfilePage() {

    const { id } = useParams()
    const profileQuery = useProfileQuery({
        variables: {
            profileId: Number(id!),
        },
        skip: isNaN(Number(id)),
    })
    const { isOwner } = useAppSelector(state => ({
        isOwner: Boolean(state.user.me?.id && state.user.me?.id === profileQuery.data?.profile?.id),
    }))

    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium)


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
                {isMediumScreen ?
                    <>
                        <aside>

                            <RolesCard roles={profileQuery.data.profile.roles} isOwner={isOwner} />
                            <SkillsCard skills={profileQuery.data.profile.skills} isOwner={isOwner} />
                            <TournamentsCard tournaments={profileQuery.data.profile.tournaments} isOwner={isOwner} />
                        </aside>
                        <main>

                            <AboutCard user={profileQuery.data.profile} isOwner={isOwner} />
                            <StoriesCard stories={profileQuery.data.profile.stories} isOwner={isOwner} />
                        </main>
                        <aside>
                            <SimilarMakersCard makers={profileQuery.data.profile.similar_makers} />
                        </aside>
                    </>
                    :
                    <>
                        <main>
                            <AboutCard user={profileQuery.data.profile} isOwner={isOwner} />
                            <RolesCard roles={profileQuery.data.profile.roles} isOwner={isOwner} />
                            <SkillsCard skills={profileQuery.data.profile.skills} isOwner={isOwner} />
                            <StoriesCard stories={profileQuery.data.profile.stories} isOwner={isOwner} />
                        </main>
                    </>
                }
            </div>
        </>
    )
}
