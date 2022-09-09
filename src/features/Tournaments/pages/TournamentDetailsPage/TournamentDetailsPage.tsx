
import Header from './Header/Header'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import OverviewPage from '../OverviewPage/OverviewPage'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation/Navigation'
import EventsPage from '../EventsPage/EventsPage'
import MakersPage from '../MakersPage/MakersPage'
import ProjectsPage from '../ProjectsPage/ProjectsPage'
import { GetTournamentByIdQuery } from 'src/graphql'
import TournamentDetailsContext from './TournamentDetailsContext'



export type MeTournament = GetTournamentByIdQuery['me']

export default function TournamentDetailsPage() {


  return (
    <div style={{
      "--maxPageWidth": "910px"
    } as any}>

      <TournamentDetailsContext>
        <Header />
        <Navigation />

        <div className="content-container !mt-24">
          <Routes >
            <Route index element={<Navigate to='overview' />} />
            <Route path='overview' element={<OverviewPage />} />
            <Route path='events' element={<EventsPage />} />
            <Route path='makers' element={<MakersPage />} />
            <Route path='projects' element={<ProjectsPage />} />
          </Routes>
        </div>
      </TournamentDetailsContext>
    </div>
  )
}
