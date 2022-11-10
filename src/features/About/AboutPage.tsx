import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import MadeBy from './components/MadeBy'
import Missions from './components/Missions'

export default function AboutPage() {
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

