
import Header from './Header/Header'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import OverviewPage from '../OverviewPage/OverviewPage'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation/Navigation'
import EventsPage from '../EventsPage/EventsPage'
import MakersPage from '../MakersPage/MakersPage'
import ProjectsPage from '../ProjectsPage/ProjectsPage'
import { useGetTournamentByIdQuery, GetTournamentByIdQuery } from 'src/graphql'
import LoadingPage from 'src/Components/LoadingPage/LoadingPage'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'


export type MeTournament = GetTournamentByIdQuery['me']

export default function TournamentDetailsPage() {

  const { id } = useParams()

  const tournaemntQuery = useGetTournamentByIdQuery({
    variables: {
      id: Number(id)!,
    },
    skip: !id
  })

  if (tournaemntQuery.loading)
    return <LoadingPage />

  if (!tournaemntQuery.data?.getTournamentById)
    return <NotFoundPage />

  return (
    <div style={{
      "--maxPageWidth": "910px"
    } as any}>
      <Helmet>
        <title>{tournaemntQuery.data.getTournamentById.title} Tournament</title>
      </Helmet>
      <Header data={tournaemntQuery.data.getTournamentById} />
      <Navigation data={tournaemntQuery.data.getTournamentById} />

      <div className="content-container !mt-24">
        <Routes >
          <Route index element={<Navigate to='overview' />} />
          <Route path='overview' element={<OverviewPage data={tournaemntQuery.data.getTournamentById} avatars={tournaemntQuery.data.getMakersInTournament.makers.map(m => m.user.avatar)} isRegistered={!!tournaemntQuery.data.tournamentParticipationInfo} />} />
          <Route path='events' element={<EventsPage data={tournaemntQuery.data.getTournamentById} />} />
          <Route path='makers' element={<MakersPage data={tournaemntQuery.data.getTournamentById} />} />
          <Route path='projects' element={<ProjectsPage data={tournaemntQuery.data.getTournamentById} />} />
        </Routes>
      </div>
    </div>
  )
}
