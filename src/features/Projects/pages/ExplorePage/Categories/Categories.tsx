
import Slider from 'src/Components/Slider/Slider'
import { useNavigate } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/graphql';

const colors = [
    '#FDF2F8',
    '#F5F3FF',
    '#FEFCE8',
    '#F0FDF4',
    '#EFF6FF',
    '#FFFBEB',
    '#FEF2F2',
    '#FDF2F8',
    '#FFF7ED',
    '#F1F5F9'
]

export default function Categories() {

    const { data, loading } = useAllCategoriesQuery();
    const navigate = useNavigate();
    if (loading || !data)
        return <div className="flex gap-12">
            {Array(5).fill(0).map((_, idx) =>
                <div
                    key={idx}
                    className=' block p-16 rounded-16  bg-gray-100 active:scale-90 transition-transform'
                >
                    <span className="opacity-0">category</span>
                </div>
            )}
        </div>


    return (
        <Slider>
            {data?.allCategories.map((category, idx) =>
                <button
                    key={category.id}
                    onClick={() => navigate(`/apps/category/${category.id}`)}
                    className=' block p-16 rounded-16 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-transform'
                    style={{ backgroundColor: colors[idx % colors.length] }}
                >{category.icon} {category.title}</button>
            )}
        </Slider>
    )

}
