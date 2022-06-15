import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import ASSETS from 'src/assets'

type Props = {
    isLoading: boolean
    title: string
    apps_count?: number
    img: string
}

export default function HeaderImage(props: Props) {

    if (props.isLoading)
        return (
            <div className='h-[280px] rounded-20 overflow-hidden relative '>
                {/* <div className='absolute inset-0 w-full h-full bg-gray-100' /> */}
                <Skeleton height={'100%'} />
            </div>
        )


    const { title, img, apps_count } = props;

    const DEFAULT_IMG = ASSETS.Category_BG;



    return (
        <div className='h-[280px] rounded-20 overflow-hidden relative flex flex-col justify-center items-center gap-8'>
            <img src={img.startsWith('https://via.placeholder.com/') ? DEFAULT_IMG : img} alt={`${title} cover`} className='absolute inset-0 w-full h-full object-cover z-[-1]' />
            <div className='absolute inset-0 w-full h-full bg-black bg-opacity-50   z-[-1]' />
            <Link
                to='/'
                className="
              w-[48px] h-[48px] bg-white hover:bg-gray-200 
              absolute top-24 left-24 md:top-1/2 md:left-40 md:-translate-y-1/2
               rounded-full text-center flex justify-center items-center">
                <FiArrowLeft className=' inline-block text-body2 lg:text-body1' /></Link>
            <h1
                className='text-white text-[24px] md:text-[40px]  '
            >{title}</h1>
            {typeof apps_count === 'number' && <p
                className='text-white text-body4'
            >{apps_count} apps</p>}
        </div>
    )
}
