import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Button from "src/Components/Button/Button";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { ViewBadgeCard } from "src/features/Profiles/pages/ProfilePage/ViewBadgeModal/ViewBadgeModal";
import { useGetBadgeDetailsQuery } from "src/graphql";
import { RelayPoolProvider } from "src/lib/nostr";
import { openModal } from "src/redux/features/modals.slice";
import { trimText } from "src/utils/helperFunctions";
import { withProviders } from "src/utils/hoc";
import { useAppDispatch, useNavigateBack } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";

function BadgeDetailsPage() {
  const navigateBack = useNavigateBack(
    createRoute({ type: "admin-badges", page: "list" })
  );
  const dispatch = useAppDispatch();

  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  if (!idOrSlug) throw new Error("idOrSlug is required");

  const badgeDetailsQuery = useGetBadgeDetailsQuery({
    variables: {
      idOrSlug: idOrSlug!,
    },
    skip: !idOrSlug,
  });

  if (badgeDetailsQuery.loading) return <LoadingPage />;

  if (badgeDetailsQuery.error) {
    throw badgeDetailsQuery.error;
  }

  if (!badgeDetailsQuery.data?.getBadgeById) return <div>Badge not found</div>;

  return (
    <div className="page-container">
      <button
        className={`
       w-max p-8 rounded flex justify-center items-center gap-8 text-gray-500 hover:bg-gray-50 active:bg-gray-100
        `}
        onClick={navigateBack}
      >
        <FiArrowLeft /> Back
      </button>
      <div className="flex flex-col gap-24">
        <div className="max-w-[420px] rounded-xl overflow-hidden mx-auto w-full">
          {" "}
          <ViewBadgeCard
            badge={badgeDetailsQuery.data.getBadgeById}
            username={"John Doe"}
          />
        </div>
        <div className="mx-auto">
          <Button
            href={createRoute({
              type: "admin-badges",
              page: "update",
              idOrSlug: badgeDetailsQuery.data.getBadgeById.id,
            })}
            color="gray"
          >
            {" "}
            Edit Badge Data <FiEdit2 className="ml-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-8">
          <h2 className="text-h2 font-bold">Makers who owns this badge:</h2>
          <Button
            color="primary"
            size="sm"
            className="ml-auto"
            onClick={() =>
              dispatch(
                openModal({
                  Modal: "IssueBadgeToMakerModal",
                  props: { badgeId: badgeDetailsQuery.data?.getBadgeById.id! },
                })
              )
            }
          >
            Issue Badge to Makers
          </Button>
        </div>
        <div className="flex flex-col">
          {badgeDetailsQuery.data.getBadgeById?.awardedTo.map((maker) => (
            <Link
              to={createRoute({
                type: "profile",
                id: maker.id,
                username: maker.name,
              })}
              className="flex items-center gap-8 py-8"
            >
              <Avatar width={48} src={maker.avatar} />
              <div className="overflow-hidden">
                <p
                  className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                  {maker.name}
                </p>
                <p className="text-gray-600">{maker.jobTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withProviders(RelayPoolProvider)(BadgeDetailsPage);
