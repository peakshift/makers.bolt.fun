import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { useNavCategoriesQuery } from 'src/graphql'
import { numberFormatter } from 'src/utils/helperFunctions'

interface Props {
    // categories: Pick<ProjectCategory, 'id' | 'title' | 'icon' | 'votes_sum'>[]
    classes?: Partial<{ list: string, item: string }>
    onClick?: (categoryId: number) => void
}


export default function CategoriesList({ classes = {}, onClick }: Props) {

    const { data, loading } = useNavCategoriesQuery()


    if (loading)
        return <ul className={classes.list}>
            {Array(5).fill(0).map((_, idx) =>
                <li key={idx} className={`flex p-16 text-body4 font-semibold items-center hover:bg-gray-100 rounded-8 ${classes.item}`} >
                    <span className="text-body3 mr-8"><Skeleton width='1.5ch' /></span> <Skeleton width='10ch' /> <span className="ml-auto text-body5 font-normal text-gray-400"><Skeleton width='2ch' /></span>
                </li>
            )}
        </ul>

    return (
        <ul className={classes.list}>
            {data?.allCategories.map(category =>
                <Link
                    onClick={() => onClick?.(category.id)}
                    key={category.id}
                    to={`/category/${category.id}`}>
                    <li className={`flex p-16 text-body4 font-semibold items-center hover:bg-gray-100 rounded-8 ${classes.item}`} >
                        <span className="text-body3 mr-8">{category.icon}</span> {category.title} <span className="ml-auto text-body5 font-normal text-gray-400">{numberFormatter(category.votes_sum)}</span>
                    </li>
                </Link>)}
        </ul>
    )
}
