import React from "react";
import { Route, Routes } from "react-router-dom";
import JudgingRoundDetailsPage from "./JudgingRoundDetailsPage/JudgingRoundDetailsPage";
import JudgingRoundsPage from "./JudgingRoundsPage/JudgingRoundsPage";

export default function JudgingPage() {
  return (
    <div>
      <Routes>
        <Route index element={<JudgingRoundsPage />} />
        <Route path=":id" element={<JudgingRoundDetailsPage />} />
        {/* <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<OverviewPage />} />
      <Route path="workshops" element={<WorkshopsPage />} />
      <Route path="schedule" element={<SchedulePage />} />
      <Route path="feed" element={<TournamentFeedPage />} />
      <Route path="makers" element={<MakersPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="ideas" element={<IdeasPage />} />
      <Route path="judging" element={<JudgingRoundsPage />} /> */}
      </Routes>
    </div>
  );
}
