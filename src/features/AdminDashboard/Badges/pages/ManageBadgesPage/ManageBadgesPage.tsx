import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "src/Components/Button/Button";
import OgTags from "src/Components/OgTags/OgTags";
import BadgeCard from "src/features/Profiles/pages/ProfilePage/BadgesCard/BadgeCard";
import { useManageBadgesQuery } from "src/graphql";
import { useNavigateBack } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";
import PendingNostrBadgesRequestsList from "./PendingNostrBadgesRequests/PendingNostrBadgesRequestsList";

export default function ManageBadgesPage() {
  const query = useManageBadgesQuery();
  const navigateBack = useNavigateBack("/admin");

  const navigate = useNavigate();

  return (
    <>
      <OgTags title={"Manage Badges"} description={""} />
      <div className={`page-container`}>
        <section>
          <div className="flex flex-wrap items-center gap-16 mb-24">
            <button
              className={`
           w-48 aspect-square rounded self-center flex flex-col justify-center items-center gap-8 text-gray-900 bg-white hover:bg-gray-50 active:bg-gray-100 border-2 border-gray-200
            `}
              onClick={navigateBack}
            >
              <FiArrowLeft />
            </button>
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
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-24">
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
