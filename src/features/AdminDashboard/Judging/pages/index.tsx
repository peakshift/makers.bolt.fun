import React from "react";
import { Route, Routes } from "react-router-dom";
import JudgingRoundDetailsPage from "./JudgingRoundDetailsPage/JudgingRoundDetailsPage";
import JudgingRoundsPage from "./JudgingRoundsPage/JudgingRoundsPage";
import UpdateJudgingRoundPage from "./UpdateJudgingRoundPage/UpdateJudgingRoundPage";

export default function JudgingPages() {
  return (
    <div>
      <Routes>
        <Route index element={<JudgingRoundsPage />} />
        <Route path=":roundId" element={<JudgingRoundDetailsPage />} />
        <Route path=":roundId/update" element={<UpdateJudgingRoundPage />} />
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
