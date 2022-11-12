import { useEffect } from 'react'
import Header from './components/Header'
import MadeBy from './components/MadeBy'
import Missions from './components/Missions'
import { setTheme } from 'src/redux/features/ui.slice'
import { useAppDispatch } from 'src/utils/hooks'
import OgTags from 'src/Components/OgTags/OgTags'

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
            <OgTags
                title="Lightning Landscape | About"
                description="Shining a spotlight on the entire lightning ecosystem. We’re gathering the lightning ecosystem under one platform to bring exposure and discoverability to help researchers, journalists, investors, and builders to find everything lightning."
            />
            <div className="page-container bg-gray-900 min-h-screen overflow-hidden relative isolate" style={{ "--maxPageWidth": "1200px" } as any}>
                <Header />
                <Missions />
                <MadeBy />
            </div>
        </>
    )
}

