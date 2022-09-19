
import { useState } from 'react'
import Button from 'src/Components/Button/Button'
import { useGetHackathonsQuery } from 'src/graphql'
import HackathonsList from '../../Components/HackathonsList/HackathonsList'
import SortByFilter from '../../Components/SortByFilter/SortByFilter'
import styles from './styles.module.scss'
import { Helmet } from 'react-helmet'
import { Fulgur } from 'src/Components/Ads/Fulgur'
import { IoLocationOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { createRoute } from 'src/utils/routing'
import { bannerData } from 'src/features/Projects/pages/ExplorePage/Header/Header'


export default function HackathonsPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>(null)
    const [tagFilter, setTagFilter] = useState<number | null>(null)

    const hackathonsQuery = useGetHackathonsQuery({
        variables: {
            sortBy: sortByFilter,
            tag: Number(tagFilter)
        },
    })

    return (
        <>
            <Helmet>
                <title>{'Hackathons'}</title>
                <meta property="og:title" content={'Hackathons'} />
            </Helmet>
            <div
                className={`page-container`}
            >
                <div className={`w-full`}>
                    <Link to={createRoute({ type: "tournament", id: 12 })}>
                        <div className="rounded-16 min-h-[280px] relative overflow-hidden p-16 md:p-24 flex flex-col items-start justify-end mb-24">
                            <img
                                className="w-full h-full object-cover object-center absolute top-0 left-0 z-[-2]"
                                src={bannerData.img}
                                alt=""
                            />
                            <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
                            <div className="max-w-[90%]">
                                {bannerData.title}
                            </div>
                        </div>
                    </Link>
                    <div className="flex gap-16 flex-wrap my-24 justify-between">
                        <h1 id='title' className="text-body1 lg:text-h2 font-bolder">Hackathons 🏆</h1>
                        <div className="self-center">
                            <SortByFilter
                                filterChanged={setSortByFilter}
                            /></div>
                    </div>
                    {/* <aside className='no-scrollbar'>
                        <div className="flex flex-col gap-24 md:overflow-y-scroll sticky-side-element">
                            <h1 id='title' className="text-body1 lg:text-h2 font-bolder">Hackathons 🏆</h1>
                            <SortByFilter
                                filterChanged={setSortByFilter}
                            /> 
                                <Button
                                href='https://airtable.com/shrgXKynON8YWeyyE'
                                newTab
                                color='primary'
                                fullWidth
                            >
                                List Your Hackathon
                            </Button>
                            <div className="hidden md:block">
                                <Fulgur />
                            </div>
                        </div>
                    </aside> */}
                    <main className="self-start">
                        <HackathonsList
                            currentFilter={sortByFilter}
                            isLoading={hackathonsQuery.loading}
                            items={hackathonsQuery.data?.getAllHackathons} />
                    </main>
                </div>
            </div></>
    )
}
