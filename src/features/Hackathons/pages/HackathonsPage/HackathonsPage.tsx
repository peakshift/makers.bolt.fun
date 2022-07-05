
import { useState } from 'react'
import Button from 'src/Components/Button/Button'
import { useGetHackathonsQuery } from 'src/graphql'
import { useAppSelector } from 'src/utils/hooks'
import HackathonsList from '../../Components/HackathonsList/HackathonsList'
import SortByFilter from '../../Components/SortByFilter/SortByFilter'
import styles from './styles.module.scss'
import { Helmet } from 'react-helmet'
import { Fulgur } from 'src/Components/Ads/Fulgur'


export default function HackathonsPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>(null)
    const [tagFilter, setTagFilter] = useState<number | null>(null)

    const hackathonsQuery = useGetHackathonsQuery({
        variables: {
            sortBy: sortByFilter,
            tag: Number(tagFilter)
        },
    })
    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <>
            <Helmet>
                <title>{'Hackathons'}</title>
                <meta property="og:title" content={'Hackathons'} />
            </Helmet>
            <div
                className={`page-container  pt-16 w-full ${styles.grid}`}
            >
                <aside className='no-scrollbar'>
                    <div className="sticky flex flex-col gap-24 md:overflow-y-scroll"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        }}>
                        <h1 id='title' className="text-body1 lg:text-h2 font-bolder">Hackathons 🏆</h1>
                        <SortByFilter
                            filterChanged={setSortByFilter}
                        />
                        {/* <TopicsFilter
                        filterChanged={setTopicsFilter}
                    /> */}
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
                </aside>
                <main className="self-start">
                    <HackathonsList
                        currentFilter={sortByFilter}
                        isLoading={hackathonsQuery.loading}
                        items={hackathonsQuery.data?.getAllHackathons} />
                </main>
            </div></>
    )
}
