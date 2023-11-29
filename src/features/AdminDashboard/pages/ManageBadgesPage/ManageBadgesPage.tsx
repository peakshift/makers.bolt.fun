import { useNavigate } from "react-router-dom";
import Button from "src/Components/Button/Button";
import OgTags from "src/Components/OgTags/OgTags";
import BadgeCard from "src/features/Profiles/pages/ProfilePage/BadgesCard/BadgeCard";
import { useManageBadgesQuery } from "src/graphql";
import { createRoute } from "src/utils/routing";

export default function ManageBadgesPage() {
  const query = useManageBadgesQuery();

  const navigate = useNavigate();

  return (
    <>
      <OgTags title={"Manage Badges"} description={""} />
      <div className={`page-container`}>
        <div className="flex flex-wrap justify-between items-center gap-16 mb-24">
          <h1 className="text-h1 font-bolder">Manage Badges 🎖️</h1>
          <Button
            href={createRoute({
              type: "admin-badges",
              page: "create",
            })}
            color="primary"
            size="sm"
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
      </div>
    </>
  );
}
