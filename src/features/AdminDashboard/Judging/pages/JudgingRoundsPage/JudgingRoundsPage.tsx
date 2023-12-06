import { useState } from "react";
import { Link } from "react-router-dom";
import { useTournament } from "src/features/AdminDashboard/Tournaments/pages/ManageTournamentPage/TournamentDetailsContext";

export default function JudgingRoundsPage() {
  const {
    tournamentDetails: { judging_rounds },
  } = useTournament();

  const roundsSortedByCreationDate = [...judging_rounds];

  roundsSortedByCreationDate.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="pb-42 flex flex-col gap-36">
      <h2 className="text-body1 font-bolder text-gray-900">
        Manage Judging Rounds
      </h2>
      {judging_rounds.length === 0 && (
        <p className="text-center py-24 text-gray-500 font-medium text-body3">
          No judging rounds created yet.
        </p>
      )}
      {roundsSortedByCreationDate.length > 0 && (
        <ul className="flex flex-col gap-16">
          {roundsSortedByCreationDate.map((round) => (
            <li key={round.id}>
              <Link
                to={round.id}
                className="p-24 bg-gray-100 hover:bg-gray-50 border-2 border-gray-200 rounded font-medium flex flex-col items-center text-center text-body3"
              >
                {round.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
