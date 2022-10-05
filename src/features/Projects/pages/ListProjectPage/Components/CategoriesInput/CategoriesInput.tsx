import React from 'react'
import Button from 'src/Components/Button/Button';
import { useAllCategoriesQuery } from 'src/graphql'
import { random } from 'src/utils/helperFunctions';

interface Props {
    value?: number;
    onChange?: (v: number) => void;
}

export default function CategoriesInput(props: Props) {

    const categoriesQuery = useAllCategoriesQuery();


    return (
        <div className="flex flex-wrap gap-8">
            {categoriesQuery.loading ?
                Array(10).fill(0).map((_, idx) =>
                    <div
                        key={idx}
                        className="bg-gray-100 border border-gray-200 p-8 rounded-10">
                        <span className='invisible'>{"loading category skeleton".slice(random(6, 12))}</span>
                    </div>)
                :
                categoriesQuery.data?.allCategories.map(category =>
                    <Button
                        key={category.id}
                        color='none'
                        size='sm'
                        className={`
                        border border-gray-200
                        ${props.value === category.id ?
                                'text-primary-600 bg-primary-100'
                                :
                                "bg-gray-100"
                            }
                        `}
                        onClick={() => props.onChange?.(category.id)}
                    >
                        {category.icon} {category.title}
                    </Button>)
            }
        </div>
    )
}
