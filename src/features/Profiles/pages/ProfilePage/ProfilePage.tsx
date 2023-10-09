import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { useProfileQuery } from "src/graphql";
import AboutCard from "./AboutCard/AboutCard";
import { Helmet } from "react-helmet";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import styles from "./styles.module.scss";
import StoriesCard from "./StoriesCard/StoriesCard";
import RolesCard from "./RolesCard/RolesCard";
import SkillsCard from "./SkillsCard/SkillsCard";
import TournamentsCard from "./TournamentsCard/TournamentsCard";
import { MEDIA_QUERIES } from "src/utils/theme";
import SimilarMakersCard from "./SimilarMakersCard/SimilarMakersCard";
import MakerProjectsCard from "./MakerProjectsCard/MakerProjectsCard";
import OgTags from "src/Components/OgTags/OgTags";
import { withProviders } from "src/utils/hoc";
import { RelayPoolProvider } from "src/lib/nostr";
import BadgesCard from "./BadgesCard/BadgesCard";

function ProfilePage() {
  const { id } = useParams();
  const profileQuery = useProfileQuery({
    variables: {
      profileId: Number(id!),
    },
    skip: isNaN(Number(id)),
  });
  const { isOwner } = useAppSelector((state) => ({
    isOwner: Boolean(
      state.user.me?.id && state.user.me?.id === profileQuery.data?.profile?.id
    ),
  }));

  const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMinMedium);

  if (profileQuery.loading) return <LoadingPage />;

  if (!profileQuery.data?.profile) return <NotFoundPage />;

  return (
    <>
      <OgTags
        title={profileQuery.data.profile.name}
        description={profileQuery.data.profile.jobTitle}
        image={profileQuery.data.profile.avatar}
        lightning_address={profileQuery.data.profile.lightning_address}
      />
      <div className={`page-container`}>
        <div className={` ${styles.grid}`}>
          {isMediumScreen ? (
            <>
              <aside>
                <RolesCard
                  roles={profileQuery.data.profile.roles}
                  isOwner={isOwner}
                />
                <SkillsCard
                  skills={profileQuery.data.profile.skills}
                  isOwner={isOwner}
                />
                <TournamentsCard
                  tournaments={profileQuery.data.profile.tournaments}
                  isOwner={isOwner}
                />
              </aside>
              <main className="min-w-0">
                <AboutCard user={profileQuery.data.profile} isOwner={isOwner} />
                <BadgesCard
                  badges={profileQuery.data.profile.badges}
                  isOwner={isOwner}
                />
                <StoriesCard
                  stories={profileQuery.data.profile.stories}
                  isOwner={isOwner}
                />
              </main>
              <aside className="min-w-0">
                <MakerProjectsCard
                  projects={profileQuery.data.profile.projects}
                  isOwner={isOwner}
                />
                <SimilarMakersCard
                  makers={profileQuery.data.profile.similar_makers}
                />
              </aside>
            </>
          ) : (
            <>
              <main>
                <AboutCard user={profileQuery.data.profile} isOwner={isOwner} />
                <RolesCard
                  roles={profileQuery.data.profile.roles}
                  isOwner={isOwner}
                />
                <SkillsCard
                  skills={profileQuery.data.profile.skills}
                  isOwner={isOwner}
                />
                <MakerProjectsCard
                  projects={profileQuery.data.profile.projects}
                  isOwner={isOwner}
                />
                <BadgesCard
                  badges={profileQuery.data.profile.badges}
                  isOwner={isOwner}
                />
                <StoriesCard
                  stories={profileQuery.data.profile.stories}
                  isOwner={isOwner}
                />
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(ProfilePage);
