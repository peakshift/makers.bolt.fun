import React from 'react'
import { useGetTournamentByIdQuery } from 'src/graphql'
import LoadingPage from 'src/Components/LoadingPage/LoadingPage'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import Header from './Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import OverviewPage from '../OverviewPage/OverviewPage'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation/Navigation'

export default function TournamentDetailsPage() {

  const query = useGetTournamentByIdQuery({
    variables: {
      id: 12,
    }
  })

  if (query.loading)
    return <LoadingPage />

  if (!query.data?.getTournamentById)
    return <NotFoundPage />

  return (
    <div style={{
      "--maxPageWidth": "910px"
    } as any}>
      <Helmet>
        <title>{query.data.getTournamentById.title} Tournament</title>
      </Helmet>
      <Header data={query.data?.getTournamentById} />
      <Navigation data={query.data?.getTournamentById} />

      <div className="content-container !mt-24">
        <Routes >
          <Route index element={<Navigate to='overview' />} />
          <Route path='overview' element={<OverviewPage data={query.data?.getTournamentById} />} />
        </Routes>
      </div>
    </div>
  )
}
