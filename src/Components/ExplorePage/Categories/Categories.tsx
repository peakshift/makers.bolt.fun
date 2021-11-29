import { useAllCategoriesQuery } from 'src/generated/graphql'

export default function Categories() {

    const { data, loading } = useAllCategoriesQuery();

    const handleClick = (categoryId: number) => {

    }


    if (loading)
        return null;

    return (
        <div className="flex gap-12 flex-wrap">
            {data?.allCategories.map(category => <span key={category.id} className="chip hover:cursor-pointer hover:bg-gray-200" onClick={() => handleClick(category.id)}>{category.title}</span>)}
        </div>
    )
}
