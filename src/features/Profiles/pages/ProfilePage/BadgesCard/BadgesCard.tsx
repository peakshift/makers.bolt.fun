import Card from "src/Components/Card/Card";
import { User } from "src/graphql";
import BadgeCard from "./BadgeCard";

interface Props {
  isOwner?: boolean;
  badges: User["badges"];
  onlyMd?: boolean;
}

export default function BadgesCard({ badges, isOwner, onlyMd }: Props) {
  if (badges.length === 0 && !isOwner) return null;

  return (
    <Card onlyMd={onlyMd}>
      <p className="text-body2 font-bold mb-24">🏅 Achievements</p>
      {badges.length > 0 && (
        <ul
          className={
            isOwner
              ? "flex flex-col gap-16"
              : "grid grid-cols-1 md:grid-cols-2 gap-16"
          }
        >
          {badges.map((badge) => (
            <li key={badge.id}>
              <BadgeCard showProgress={isOwner} userBadge={badge} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
