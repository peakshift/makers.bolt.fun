import { useNavigate } from "react-router-dom";
import BackButton from "src/Components/BackButton/BackButton";
import Button from "src/Components/Button/Button";
import OgTags from "src/Components/OgTags/OgTags";
import BadgeCard from "src/features/Profiles/pages/ProfilePage/BadgesCard/BadgeCard";
import { useManageBadgesQuery } from "src/graphql";
import { createRoute } from "src/utils/routing";
import PendingNostrBadgesRequestsList from "./PendingNostrBadgesRequests/PendingNostrBadgesRequestsList";

export default function ManageBadgesPage() {
  const query = useManageBadgesQuery();

  const navigate = useNavigate();

  return (
    <>
      <OgTags title={"Manage Badges"} description={""} />
      <div className={`page-container`}>
        <section>
          <div className="flex flex-wrap items-center gap-16 mb-24">
            <BackButton defaultBackRoute="/admin" />
            <h1 className="text-h1 font-bolder">Manage Badges 🎖️</h1>
            <Button
              href={createRoute({
                type: "admin-badges",
                page: "create",
              })}
              color="primary"
              size="sm"
              className="ml-auto"
            >
              Create New Badge
            </Button>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-24">
            {query.data?.getAllBadges.map((badge) => (
              <li key={badge.id}>
                <BadgeCard
                  badge={badge}
                  username={"John Doe"}
                  onClick={() => {
                    navigate(
                      createRoute({
                        type: "admin-badges",
                        page: "details",
                        idOrSlug: badge.id,
                      })
                    );
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-48">
          <h1 className="text-h1 font-bolder mb-24">
            Pending Nostr Badge Requests
          </h1>
          <PendingNostrBadgesRequestsList
            pendingRequests={query.data?.getPendingNostrBadgeRequests}
          />
        </section>
      </div>
    </>
  );
}
