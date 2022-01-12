import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES_QUERY, ALL_CATEGORIES_QUERY_RES } from './query';
import Badge from 'src/Components/Badge/Badge'

export default function Categories() {

    const { data, loading } = useQuery<ALL_CATEGORIES_QUERY_RES>(ALL_CATEGORIES_QUERY);

    const handleClick = (categoryId: string) => {

    }

    if (loading || !data)
        return <div className="flex gap-12 flex-wrap">
            {Array(5).fill(0).map((_, idx) =>
                <Badge key={idx} isLoading></Badge>
            )}
        </div>

    return (
        <div className="flex gap-12 flex-wrap">
            {data?.allCategories.map(category =>
                <Badge key={category.id} onClick={() => handleClick(category.id)}>{category.title}</Badge>
            )}
        </div>
    )
}
