import React from 'react'
import Button from 'src/Components/Button/Button';
import { useGetAllCapabilitiesQuery } from 'src/graphql';
import { random } from 'src/utils/helperFunctions';

interface Props {
    value: number[];
    onChange?: (v: number[]) => void;
}

export default function CapabilitiesInput(props: Props) {


    const categoriesQuery = useGetAllCapabilitiesQuery();


    const handleClick = (clickedValue: number) => {
        if (props.value.includes(clickedValue))
            props.onChange?.(props.value.filter(v => v !== clickedValue));
        else
            props.onChange?.([...props.value, clickedValue])
    }


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
                categoriesQuery.data?.getAllCapabilities.map(item =>
                    <Button
                        key={item.id}
                        color='none'
                        size='sm'
                        className={`
                        border border-gray-200
                        ${props.value.includes(item.id) ?
                                'text-primary-600 bg-primary-100'
                                :
                                "bg-gray-100"
                            }
                        `}
                        onClick={() => handleClick(item.id)}
                    >
                        {item.icon} {item.title}
                    </Button>)
            }
        </div>
    )
} 