import React from 'react'
import LandscapeImg from '../assets/landscape.svg'

export default function Header() {
    return (
        <>
            <img src={LandscapeImg} className='max-w-full absolute top-0 right-0 translate-x-1/2 -z-10' alt="" />
            <div className='text-white max-w-[75ch] my-64 md:my-[120px]'>
                <h1 className='font-extrabold text-h1 lg:text-[56px] lg:leading-[67px]'>Shining a spotlight on the entire lightning ecosystem</h1>
                <p className='font-semibold text-body1 mt-24 max-w-[90%]'>We’re gathering the lightning ecosystem under one platform to bring exposure and discoverability to help researchers, journalists, investors, and builders to find everything lightning.</p>
            </div>
        </>
    )
}
