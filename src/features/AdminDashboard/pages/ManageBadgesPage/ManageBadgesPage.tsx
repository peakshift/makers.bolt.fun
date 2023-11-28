import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "src/Components/Button/Button";
import OgTags from "src/Components/OgTags/OgTags";
import BadgeCard from "src/features/Profiles/pages/ProfilePage/BadgesCard/BadgeCard";
import { useGetAllBadgesQuery } from "src/graphql";

export default function ManageBadgesPage() {
  const allBadgesQuery = useGetAllBadgesQuery();

  const navigate = useNavigate();

  return (
    <>
      <OgTags title={"Manage Badges"} description={""} />
      <div className={`page-container`}>
        <h1 className="text-h1 font-bolder mb-24">Manage Badges 🎖️</h1>
        <div className="flex justify-end mb-24">
          <Button href="create" color="primary" size="sm">
            Create New Badge
          </Button>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-24">
          {allBadgesQuery.data?.getAllBadges.map((badge) => (
            <li key={badge.id}>
              <BadgeCard
                badge={badge}
                username={"John Doe"}
                onClick={() => {
                  navigate(`${badge.slug}`);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
