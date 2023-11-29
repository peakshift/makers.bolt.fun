import { FiEdit2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Button from "src/Components/Button/Button";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { ViewBadgeCard } from "src/features/Profiles/pages/ProfilePage/ViewBadgeModal/ViewBadgeModal";
import { useGetBadgeDetailsQuery } from "src/graphql";
import { createRoute } from "src/utils/routing";

export default function BadgeDetailsPage() {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  if (!idOrSlug) throw new Error("idOrSlug is required");

  const badgeDetailsQuery = useGetBadgeDetailsQuery({
    variables: {
      idOrSlug: idOrSlug!,
    },
    skip: !idOrSlug,
  });

  if (badgeDetailsQuery.loading) return <LoadingPage />;

  return (
    <div className="page-container">
      <div className="flex flex-col gap-24">
        <div className="max-w-[420px] rounded-xl overflow-hidden mx-auto w-full">
          {" "}
          <ViewBadgeCard
            badge={badgeDetailsQuery.data?.getBadgeById!}
            username={"John Doe"}
          />
        </div>
        <div className="mx-auto">
          <Button
            href={createRoute({
              type: "admin-badges",
              page: "update",
              idOrSlug: badgeDetailsQuery.data?.getBadgeById.id,
            })}
            color="gray"
          >
            {" "}
            Edit Badge Data <FiEdit2 className="ml-4" />
          </Button>
        </div>
        <h2 className="text-h2 font-bold">Makers who owns this badge:</h2>
        <div className="flex flex-col gap-16">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={48} />
            ))}
        </div>
      </div>
    </div>
  );
}
