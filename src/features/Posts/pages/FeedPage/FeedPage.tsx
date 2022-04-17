
import React from 'react'
import { MOCK_DATA } from 'src/mocks/data'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularCategories from './PopularCategories/PopularCategories'
import SortBy from './SortBy/SortBy'

export default function FeedPage() {
    return (
        <div
            className='page-container grid w-full gap-32'
            style={{
                gridTemplateColumns: "326px 1fr 326px"
            }}
        >
            <div>
                <SortBy />
                <hr className="my-24 bg-gray-100" />
                <PopularCategories />
            </div>
            <PostsList posts={MOCK_DATA['feed']} />
            <div>
                <TrendingCard />
            </div>
        </div>
    )
}
