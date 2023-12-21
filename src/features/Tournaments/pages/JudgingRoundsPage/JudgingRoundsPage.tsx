import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Button from "src/Components/Button/Button";
import { useMyUser } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";

export default function JudgingRoundsPage() {
  const { tournamentDetails } = useTournament();

  const isOrganizerForThisTournament =
    useMyUser().private_data.tournaments_organizing.some(
      (t) => t.id === tournamentDetails.id
    );

  const roundsSortedByCreationDate = [...tournamentDetails.judging_rounds];

  roundsSortedByCreationDate.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="pb-42 flex flex-col gap-36">
      <div className="flex flex-wrap items-center gap-16 mb-24">
        <h2 className="text-h2 font-bolder text-gray-900">Judging Rounds</h2>
        <Button
          color="primary"
          size="sm"
          href="create"
          className="self-center ml-auto"
        >
          Create New Round
        </Button>
      </div>
      {tournamentDetails.judging_rounds.length === 0 && (
        <p className="text-center py-24 text-gray-500 font-medium text-body3">
          No judging rounds created yet.
        </p>
      )}
      {roundsSortedByCreationDate.length > 0 && (
        <ul className="flex flex-col gap-16">
          {roundsSortedByCreationDate.map((round) => (
            <li key={round.id}>
              <Link
                to={
                  isOrganizerForThisTournament
                    ? createRoute({
                        type: "judging-rounds",
                        page: "details",
                        tournamentIdOrSlug: tournamentDetails.slug,
                        roundId: round.id,
                      })
                    : createRoute({
                        type: "judging-rounds",
                        page: "judge-page",
                        roundId: round.id,
                      })
                }
                className="p-24 bg-gray-100 hover:bg-gray-50 border-2 border-gray-200 rounded font-medium flex flex-col items-center text-center text-body3"
              >
                <p>{round.title}</p>
                <p className="text-body5 mt-16">
                  Round closes on:{" "}
                  <span className="font-bold">
                    {dayjs(round.end_date).format("MMM DD")}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
