import { Outlet } from "react-router-dom";
import TournamentDetailsContext from "./TournamentDetailsContext";

export default function ManageTournamentLayout() {
  return (
    <TournamentDetailsContext>
      <div className="page-container">
        <Outlet />
      </div>
    </TournamentDetailsContext>
  );
}
