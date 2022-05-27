
import { useReducer, useState } from 'react'
import Button from 'src/Components/Button/Button'
import { useGetHackathonsQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import HackathonsList from '../../Components/HackathonsList/HackathonsList'
import SortByFilter from '../../Components/SortByFilter/SortByFilter'
import TopicsFilter from '../../Components/TopicsFilter/TopicsFilter'
import styles from './styles.module.scss'


export default function HackathonsPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>(null)
    const [topicsFilter, setTopicsFilter] = useState<number | null>(null)

    const hackathonsQuery = useGetHackathonsQuery({
        variables: {
            sortBy: sortByFilter,
            topic: Number(topicsFilter)
        },
    })
    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <div
            className={`page-container  pt-16 w-full ${styles.grid}`}
        >
            <aside className='no-scrollbar'>
                <div className="sticky flex flex-col gap-24 md:overflow-y-scroll"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                    }}>
                    <SortByFilter
                        filterChanged={setSortByFilter}
                    />
                    {/* <TopicsFilter
                        filterChanged={setTopicsFilter}
                    /> */}
                    <Button
                        href='https://airtable.com/some-registration-form'
                        newTab
                        color='primary'
                        fullWidth
                    >
                        List Your Hackathon
                    </Button>
                </div>
            </aside>
            <div className="self-start">
                <HackathonsList
                    isLoading={hackathonsQuery.loading}
                    items={hackathonsQuery.data?.getAllHackathons} />
            </div>
        </div>
    )
}
