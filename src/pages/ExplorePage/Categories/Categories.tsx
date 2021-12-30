import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES_QUERY, ALL_CATEGORIES_QUERY_RES } from './query';

export default function Categories() {

    const { data, loading } = useQuery<ALL_CATEGORIES_QUERY_RES>(ALL_CATEGORIES_QUERY);

    const handleClick = (categoryId: string) => {

    }

    if (loading)
        return null;

    return (
        <div className="flex gap-12 flex-wrap">
            {data?.allCategories.map(category => <span key={category.id} className="chip hover:cursor-pointer hover:bg-gray-200" onClick={() => handleClick(category.id)}>{category.title}</span>)}
        </div>
    )
}
