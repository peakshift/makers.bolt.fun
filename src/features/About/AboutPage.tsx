import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import MadeBy from './components/MadeBy'
import Missions from './components/Missions'
import { setTheme } from 'src/redux/features/ui.slice'
import { useAppDispatch } from 'src/utils/hooks'

export default function AboutPage() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTheme('dark'))
        return () => {
            dispatch(setTheme('light'))
        }
    }, [dispatch])


    return (
        <>
            <Helmet>
                <title>{`About Lightning Landscape`}</title>
                <meta property="og:title" content={`About Lightning Landscape`} />
            </Helmet>
            <div className="page-container bg-gray-900 min-h-screen overflow-hidden relative isolate" style={{ "--maxPageWidth": "1200px" } as any}>
                <Header />
                <Missions />
                <MadeBy />
            </div>
        </>
    )
}

