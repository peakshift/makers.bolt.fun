import { getAllCategories } from "../../../api"
import { useQuery } from 'react-query'

export default function Categories() {

    const { data, isLoading } = useQuery("categories", getAllCategories);

    const handleClick = (categoryId: string) => {

    }

    if (isLoading)
        return null;

    return (
        <div className="flex gap-12 flex-wrap">
            {data?.map(category => <span key={category.id} className="chip hover:cursor-pointer hover:bg-gray-200" onClick={() => handleClick(category.id)}>{category.title}</span>)}
        </div>
    )
}
