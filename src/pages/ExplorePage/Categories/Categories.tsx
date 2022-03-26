import { useQuery } from '@apollo/client';
import Badge from 'src/Components/Badge/Badge'
import Slider from 'src/Components/Slider/Slider'
import { useNavigate } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/graphql';


export default function Categories() {

    const { data, loading } = useAllCategoriesQuery();
    const navigate = useNavigate();

    if (loading || !data)
        return <div className="flex gap-12">
            {Array(5).fill(0).map((_, idx) =>
                <Badge key={idx} isLoading></Badge>
            )}
        </div>


    return (
        <Slider>
            {data?.allCategories.map(category =>
                <Badge key={category.id} onClick={() => navigate(`/category/${category.id}`)}>{category.title}</Badge>
            )}
        </Slider>
    )

}
