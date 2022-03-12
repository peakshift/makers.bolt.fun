import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

interface Props {
    title: string
    apps_count: number
    img: string
}

export default function HeaderImage({ title, apps_count, img }: Props) {
    return (
        <div className='h-[280px] rounded-20 overflow-hidden relative flex flex-col justify-center items-center gap-8'>
            <img src={img} alt={`${title} cover`} className='absolute inset-0 w-full h-full object-cover z-[-1]' />
            <div className='absolute inset-0 w-full h-full bg-black bg-opacity-50   z-[-1]' />
            <button className="w-[48px] h-[48px] bg-white absolute top-24 left-24 md:top-1/2 md:left-40 md:-translate-y-1/2 rounded-full hover:bg-gray-200 text-center" onClick={() => { }}><FiArrowLeft className=' inline-block text-body2 lg:text-body1' /></button>
            <h1
                className='text-white text-body1 md:text-[40px]'
            >{title}</h1>
            <p
                className='text-white text-body4'
            >{apps_count} apps</p>
        </div>
    )
}
