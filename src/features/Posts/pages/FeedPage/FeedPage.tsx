
import { useUpdateEffect } from '@react-hookz/web'
import { useState } from 'react'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularTopicsFilter from './PopularTopicsFilter/PopularTopicsFilter'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.scss'
import { Helmet } from "react-helmet";
import Button from 'src/Components/Button/Button'
import { FaDiscord } from 'react-icons/fa'


export default function FeedPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>(null)
    const [topicFilter, setTopicFilter] = useState<number | null>(null)


    const feedQuery = useFeedQuery({
        variables: {
            take: 10,
            skip: 0,
            sortBy: sortByFilter,
            topic: topicFilter
        },
    })
    const { fetchMore, isFetchingMore, variablesChanged } = useInfiniteQuery(feedQuery, 'getFeed')
    useUpdateEffect(variablesChanged, [sortByFilter, topicFilter]);

    const { navHeight, isLoggedIn } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight,
        isLoggedIn: Boolean(state.user.me),
    }));


    return (
        <>
            <Helmet>
                <title>{`Bolt.Fun Stories`}</title>
                <meta property="og:title" content={`Bolt.Fun Stories`} />
            </Helmet>
            <div
                className={`page-container pt-16 w-full ${styles.grid}`}
            >
                <h1 id='title' className="text-h2 font-bolder">Stories ✍🏼</h1>
                <div id="sort-by">
                    <SortBy
                        filterChanged={setSortByFilter}
                    />
                </div>
                <div id="content">
                    <PostsList
                        isLoading={feedQuery.loading}
                        items={feedQuery.data?.getFeed}
                        isFetching={isFetchingMore}
                        onReachedBottom={fetchMore}
                    />
                </div>
                <aside id='categories' className='no-scrollbar'>
                    <div className="sticky md:overflow-y-scroll"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        }}>
                        {isLoggedIn &&
                            <Button
                                href='/blog/create-post'
                                color='primary'
                                fullWidth
                            >
                                Create a story
                            </Button>}
                        <div className="my-24"></div>
                        <div className="my-24"></div>
                        <PopularTopicsFilter
                            filterChanged={setTopicFilter}
                        />

                    </div>
                </aside>
                <aside id='side' className='no-scrollbar'>
                    <div className="sticky flex flex-col gap-24"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                            overflowY: "scroll",
                        }}>
                        <TrendingCard />
                        <div className='min-h-[300px] text-white flex flex-col justify-end p-24 rounded-12 relative overflow-hidden'
                            style={{
                                backgroundImage: "url(/assets/images/stw2.jfif)"
                            }}
                        >
                            <div className="absolute bg-black inset-0 opacity-10"></div>
                            <div className="relative flex flex-col gap-24">
                                <div className="flex flex-col gap-8">
                                    <p className="text-body1 font-bolder">Shock the Web 2 ⚡️</p>
                                    <p className="text-body3 font-medium">16th - 18th June, 2022</p>
                                </div>
                                <Button
                                    color='white'
                                    fullWidth
                                    href='https://discord.gg/HFqtxavb7x'
                                    newTab
                                >
                                    <FaDiscord className='scale-125 mr-8' /> <span className="align-middle">Join in Discord</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}
