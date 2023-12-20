import JudgingPages from "src/features/AdminDashboard/Judging/pages";
import TournamentDetailsContext from "./TournamentDetailsContext";

export default function ManageTournamentPage() {
  //   const loaderData = useLoaderData() as LoaderData;

  //   const tournament = loaderData.getTournamentById;
  return (
    <TournamentDetailsContext>
      <div className="page-container">
        <JudgingPages />
      </div>
    </TournamentDetailsContext>
  );
}
