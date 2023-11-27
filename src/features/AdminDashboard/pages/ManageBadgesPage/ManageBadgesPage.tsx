import OgTags from "src/Components/OgTags/OgTags";
import BadgeCard from "src/features/Profiles/pages/ProfilePage/BadgesCard/BadgeCard";
import { useGetAllBadgesQuery } from "src/graphql";

export default function ManageBadgesPage() {
  const allBadgesQuery = useGetAllBadgesQuery();

  return (
    <>
      <OgTags title={"Manage Badges"} description={""} />
      <div className={`page-container`}>
        <h1 className="text-h1 font-bolder mb-24">Manage Badges</h1>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-24">
          {allBadgesQuery.data?.getAllBadges.map((badge) => (
            <li key={badge.id}>
              <BadgeCard badge={badge} username={"John Doe"} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
