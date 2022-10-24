import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import ASSETS from 'src/assets'
import { Category } from 'src/features/Projects/Components/Categories/Categories'
import { PAGES_ROUTES } from 'src/utils/routing'

type Props = {
    category: Category | null
}

export default function Header(props: Props) {


    let title = "Discover 1,592 lightning projects"

    if (props.category?.name) title = `${props.category.projectsCount} projects`;


    return (
        <div className='h-[280px] rounded-20 overflow-hidden relative flex flex-col justify-center items-center gap-8'>
            <img src="/assets/images/cover.png" alt="" className='absolute inset-0 opacity-20 w-full h-full object-cover z-[-1]' />
            {/* <div className='absolute inset-0 w-full h-full bg-gray-300 bg-opacity-50   z-[-1]' /> */}
            {/* <Link
                to={PAGES_ROUTES.projects.default}
                className="
              w-[48px] h-[48px] bg-white hover:bg-gray-200 
              absolute top-24 left-24 md:top-1/2 md:left-40 md:-translate-y-1/2
               rounded-full text-center flex justify-center items-center">
                <FiArrowLeft className=' inline-block text-body2 lg:text-body1' /></Link> */}
            <h1
                className='text-primary-500 text-h1 font-medium'
            >{title}</h1>
            {props.category?.name ?
                <p className="text-gray-600 font-medium text-body1">{props.category?.name}</p>
                :
                <p className="text-gray-600 font-medium text-body2">Explore a directory of lightning startups, projects, and companies</p>
            }
        </div>
    )
}
