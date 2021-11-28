import { AllCategoriesData, ProjectCategory } from "../../../utils/interfaces";
import { useQuery, gql } from "@apollo/client";

const ALL_CATEGORIES = gql`
  query GetCategories {
    allCategories {
      id
      title
    }
  }
`;

export default function Categories() {

    const { loading, error, data } = useQuery<AllCategoriesData, ProjectCategory>(ALL_CATEGORIES);

    const handleClick = (categoryId: string) => {

    }

    if (loading)
        return null;
    console.log(data);
    return (
        <div className="flex gap-12 flex-wrap">
            {data && data.allCategories.map(category => <span key={category.id} className="chip hover:cursor-pointer hover:bg-gray-200" onClick={() => handleClick(category.id)}>{category.title}</span>)}
        </div>
    )
}
