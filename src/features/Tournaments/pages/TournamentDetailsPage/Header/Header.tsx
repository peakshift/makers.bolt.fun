import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { Tournament } from 'src/graphql'
import Navigation from '../Navigation/Navigation'
dayjs.extend(advancedFormat)

interface Props {
    data: Pick<Tournament,
        | 'cover_image'
        | 'thumbnail_image'
        | 'title'
        | 'start_date'
        | 'end_date'
        | 'location'>
}

export default function Header({ data }: Props) {
    return (
        <div className="w-full p-16 md:p-24 flex flex-col min-h-[240px] md:min-h-[280px] relative">
            <img src={data.cover_image} className='absolute inset-0 h-full w-full object-cover object-top' alt="" />
            <div className='absolute inset-0 h-full w-full bg-black bg-opacity-50 ' />
            <div className="content-container text-white flex flex-col md:flex-row gap-16 md:gap-32 relative" style={{ marginTop: 'auto' }}>
                <img src={data.thumbnail_image} className={'w-64 md:w-[128px] aspect-square rounded-16 md:rounded-24 border-2 border-gray-100'} alt="" />
                <div className='flex flex-col gap-4'>
                    <p className="text-body6">TOURNAMENT 🏆</p>
                    <p className="text-body1 md:text-h2 font-bold">{data.title}</p>
                    <p className="text-body3"> {`${dayjs(data.start_date).format('Do')} - ${dayjs(data.end_date).format('Do MMMM, YYYY')}`}</p>

                    <p className='text-body5'><IoLocationOutline className="mr-8" /> {data.location}</p>
                </div>
            </div>
        </div>
    )
}
