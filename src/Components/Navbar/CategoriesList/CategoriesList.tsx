import {
    MenuItem,
} from '@szhsin/react-menu'
import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate } from 'react-router-dom'
import { useNavCategoriesQuery } from 'src/graphql'
import { numberFormatter } from 'src/utils/helperFunctions'

interface Props {
    // categories: Pick<ProjectCategory, 'id' | 'title' | 'icon' | 'votes_sum'>[]
    classes?: Partial<{ item: string }>
    onClick?: (categoryId: number) => void
}

;


export default function CategoriesList({ classes = {}, onClick }: Props) {

    const { data, loading } = useNavCategoriesQuery()
    const navigate = useNavigate()

    if (loading)
        return <>
            {Array(5).fill(0).map((_, idx) =>
                <li key={idx} className={`flex p-16 text-body4 font-semibold items-center hover:bg-gray-100 rounded-8 ${classes.item}`} >
                    <span className="text-body3 mr-8"><Skeleton width='1.5ch' /></span> <Skeleton width='10ch' /> <span className="ml-auto text-body5 font-normal text-gray-400"><Skeleton width='2ch' /></span>
                </li>
            )}
        </>

    return (
        <>
            {data?.allCategories.map(category =>
                <MenuItem
                    key={category.id}
                    className={`w-full !p-16 text-body4 font-semibold hover:bg-gray-100 !rounded-8 flex w-items-center ${classes.item}`}
                    href={`/products/category/${category.id}`}
                    onClick={(e) => {
                        e.syntheticEvent.preventDefault();
                        onClick?.(category.id)
                        navigate(`/products/category/${category.id}`)
                    }}
                >
                    <span className="text-body3 mr-8">{category.icon}</span> {category.title} <span className="ml-auto pl-8 text-body5 font-normal text-gray-400">{numberFormatter(category.votes_sum)}</span>
                </MenuItem>
            )}
        </>
    )
}
