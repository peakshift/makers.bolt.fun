

import React, { createContext, PropsWithChildren, useContext } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from 'src/Components/LoadingPage/LoadingPage'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import { GetTournamentByIdQuery, useGetTournamentByIdQuery } from 'src/graphql'

interface ITournamentDetails {
    makers: GetTournamentByIdQuery['getMakersInTournament']['makers']
    me: GetTournamentByIdQuery['me']
    tournamentDetails: GetTournamentByIdQuery['getTournamentById']
    myParticipationInfo: GetTournamentByIdQuery['tournamentParticipationInfo']
}

const Ctx = createContext<ITournamentDetails>(null!)


export default function TournamentDetailsContext({ children }: PropsWithChildren<{}>) {
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

    const { getMakersInTournament: makers, me, getTournamentById: tournamentDetails, tournamentParticipationInfo: myParticipationInfo } = tournaemntQuery.data

    return (
        <Ctx.Provider value={{ makers: makers.makers, me, tournamentDetails, myParticipationInfo }}>{children}</Ctx.Provider>
    )
}

export const useTournament = () => {
    return useContext(Ctx)
}