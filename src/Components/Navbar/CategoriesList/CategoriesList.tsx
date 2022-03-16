import React from 'react'
import { Link } from 'react-router-dom'
import { MOCK_DATA } from 'src/mocks/data'
import { ProjectCategory } from 'src/utils/interfaces'

interface Props {
    // categories: Pick<ProjectCategory, 'id' | 'title' | 'icon' | 'votes_sum'>[]
    classes?: Partial<{ list: string, item: string }>
    onClick?: (categoryId: number) => void
}

const categories = MOCK_DATA['categories']

export default function CategoriesList({ classes = {}, onClick }: Props) {
    return (
        <ul className={classes.list}>
            {categories.map(category =>
                <Link
                    onClick={() => onClick?.(category.id)}
                    key={category.id}
                    to={`/category/${category.id}`}>
                    <li className={`flex p-16 text-body4 font-semibold items-center hover:bg-gray-100 rounded-8 ${classes.item}`} >
                        <span className="text-body3 mr-8">{category.icon}</span> {category.title} <span className="ml-auto text-body5 font-normal text-gray-400">{category.votes_sum}</span>
                    </li>
                </Link>)}
        </ul>
    )
}
