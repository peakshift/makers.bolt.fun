
import Button from 'src/Components/Button/Button';
import { useGetAllRolesQuery } from 'src/graphql';
import { random } from 'src/utils/helperFunctions';

interface Props {
    value: number[];
    onChange?: (v: number[]) => void;
}

export default function RecruitRolesInput(props: Props) {

    const query = useGetAllRolesQuery();

    const handleClick = (clickedValue: number) => {
        if (props.value.includes(clickedValue))
            props.onChange?.(props.value.filter(v => v !== clickedValue));
        else
            props.onChange?.([...props.value, clickedValue])
    }


    return (
        <div className="flex flex-wrap gap-8">
            {query.loading ?
                Array(10).fill(0).map((_, idx) =>
                    <div
                        key={idx}
                        className="bg-gray-100 border border-gray-200 p-8 rounded-10">
                        <span className='invisible'>{"loading category skeleton".slice(random(6, 12))}</span>
                    </div>)
                :
                query.data?.getAllMakersRoles.map(item =>
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

const data = [
    {
        text: 'Frontend Dev',
        icon: '💄️'
    },
    {
        text: 'Backend Dev',
        icon: '💻'
    },
    {
        text: 'UI/UX Designer',
        icon: '🌈️️'
    },
    {
        text: 'Comm. Manager',
        icon: '🎉️️'
    },
    {
        text: 'Founder',
        icon: '🦄️'
    },
    {
        text: 'Marketer',
        icon: '🚨️'
    },
    {
        text: 'Content Creator',
        icon: '🎥️'
    },
    {
        text: 'Researcher',
        icon: '🔬'
    },
    {
        text: 'Data engineer',
        icon: '💿️'
    },
    {
        text: 'Growth hacker',
        icon: '📉️'
    },
    {
        text: 'Technical Writer',
        icon: '✍️️'
    },
]
