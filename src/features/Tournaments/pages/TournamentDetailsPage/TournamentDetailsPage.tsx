import React from 'react'
import { useGetTournamentByIdQuery } from 'src/graphql'
import LoadingPage from 'src/Components/LoadingPage/LoadingPage'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import Header from './Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import OverviewPage from '../OverviewPage/OverviewPage'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation/Navigation'
import EventsPage from '../EventsPage/EventsPage'
import { tournamentData } from './data'

const data = tournamentData

export default function TournamentDetailsPage() {

  // const query = useGetTournamentByIdQuery({
  //   variables: {
  //     id: 12,
  //   },

  // })

  // if (query.loading)
  //   return <LoadingPage />

  // if (!query.data?.getTournamentById)
  //   return <NotFoundPage />

  return (
    <div style={{
      "--maxPageWidth": "910px"
    } as any}>
      <Helmet>
        <title>{data.title} Tournament</title>
      </Helmet>
      <Header data={data} />
      <Navigation data={data} />

      <div className="content-container !mt-24">
        <Routes >
          <Route index element={<Navigate to='overview' />} />
          <Route path='overview' element={<OverviewPage data={data} />} />
          <Route path='events' element={<EventsPage data={data} />} />
        </Routes>
      </div>
    </div>
  )
}
