import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import React from 'react'
import { Helmet } from 'react-helmet'
import { IoLocationOutline } from 'react-icons/io5'
import { getSpanDate } from 'src/utils/helperFunctions'
import { useTournament } from '../TournamentDetailsContext'
dayjs.extend(advancedFormat)



export default function Header() {
    const { tournamentDetails } = useTournament()
    return (
        <>
            <Helmet>
                <title>{tournamentDetails.title} Tournament</title>
                <meta property="og:title" content={`${tournamentDetails.title} Tournament`} />
                <meta name="description" content={tournamentDetails.description} />
                <meta property="og:description" content={tournamentDetails.description} />
                <meta property="og:image" content={'https://i.ibb.co/3S35g6T/wide.jpg'} />
            </Helmet>
            <div className="w-full p-16 md:p-24 flex flex-col h-[280px] relative mb-[-1px]">
                <img src={tournamentDetails.cover_image} className='absolute inset-0 h-full w-full object-cover object-center' alt="" />
                <div className='absolute inset-0 h-full w-full bg-black bg-opacity-50 ' />
                <div className="content-container mt-auto">
                    <div className=" text-white flex flex-col md:flex-row gap-16 md:gap-32 relative" style={{ marginTop: 'auto' }}>
                        <img src={tournamentDetails.thumbnail_image} className={'w-64 md:w-[128px] aspect-square rounded-16 md:rounded-24 border-2 border-gray-100'} alt="" />
                        <div className='flex flex-col gap-4'>
                            <p className="text-body6">TOURNAMENT 🏆</p>
                            <p className="text-body1 md:text-h2 font-bold">{tournamentDetails.title}</p>
                            <p className="text-body3">{getSpanDate(tournamentDetails.start_date, tournamentDetails.end_date)}</p>

                            <p className='text-body5'><IoLocationOutline className="mr-8" /> {tournamentDetails.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
