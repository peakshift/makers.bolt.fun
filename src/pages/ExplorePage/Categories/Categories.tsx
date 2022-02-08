import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES_QUERY, ALL_CATEGORIES_QUERY_RES } from './query';
import Badge from 'src/Components/Badge/Badge'
import Slider from 'src/Components/Slider/Slider'


export default function Categories() {

    const { data, loading } = useQuery<ALL_CATEGORIES_QUERY_RES>(ALL_CATEGORIES_QUERY);



    if (loading || !data)
        return <div className="flex gap-12">
            {Array(5).fill(0).map((_, idx) =>
                <Badge key={idx} isLoading></Badge>
            )}
        </div>

    return (<div></div>)
    /*
    return (
        <Slider>
            {data?.allCategories.map(category =>
                <Badge key={category.id} onClick={() => document.getElementById(category.title.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'center' })} >{category.title}</Badge>
            )}
        </Slider>
    )
    */
}
