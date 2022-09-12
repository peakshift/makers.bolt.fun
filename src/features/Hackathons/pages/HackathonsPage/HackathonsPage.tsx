
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
                <div className={`pt-16 w-full`}>
                    <Link to={createRoute({ type: "tournament", id: 1, tab: 'overview' })}>
                        <div className="rounded-16 min-h-[200px] md:min-h-[240px] relative overflow-hidden p-16 md:p-24 flex flex-col items-start justify-end">
                            <img
                                className="w-full h-full object-cover object-top absolute top-0 left-0 z-[-2]"
                                src='https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public'
                                alt=""
                            />
                            <div className="w-full h-full object-cover bg-black bg-opacity-60 absolute top-0 left-0 z-[-1]"></div>
                            <div className="max-w-[90%]">
                                <p className="text-body1 font-bolder text-white">Legends of Lightning ⚡️ Tournament</p>
                                <p className="text-body3 font-medium text-white mt-8">1st Oct - 31st Nov, 2022</p>
                            </div>
                            <p className="text-body4 font-medium text-white mt-8">
                                <IoLocationOutline className="mr-8" /> Online
                            </p>
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
