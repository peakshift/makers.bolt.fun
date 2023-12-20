import Header from "./Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import OverviewPage from "../OverviewPage/OverviewPage";
import Navigation from "./Navigation/Navigation";
import WorkshopsPage from "../WorkshopsPage/WorkshopsPage";
import MakersPage from "../MakersPage/MakersPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import { MeTournamentQuery } from "src/graphql";
import TournamentDetailsContext from "./TournamentDetailsContext";
import IdeasPage from "../IdeasPage/IdeasPage";
import TournamentFeedPage from "../TournamentFeedPage/TournamentFeedPage";
import SchedulePage from "../SchedulePage/SchedulePage";
import JudgingRoundsPage from "../JudgingRoundsPage/JudgingRoundsPage";

export type MeTournament = MeTournamentQuery["me"];

export default function TournamentDetailsPage() {
  return (
    <div
      style={
        {
          "--maxPageWidth": "910px",
        } as any
      }
    >
      <TournamentDetailsContext>
        <Header />
        <Navigation />

        <section className="w-full">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="workshops" element={<WorkshopsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="feed" element={<TournamentFeedPage />} />
            <Route path="makers" element={<MakersPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="ideas" element={<IdeasPage />} />
            <Route path="judging-rounds" element={<JudgingRoundsPage />} />
          </Routes>
        </section>
      </TournamentDetailsContext>
    </div>
  );
}
