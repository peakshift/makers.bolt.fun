import Button from 'src/Components/Button/Button';
import { useGetTournamentsToRegisterQuery } from 'src/graphql';
import { random } from 'src/utils/helperFunctions';

interface Props {
    value: number[];
    onChange?: (v: number[]) => void;
}

export default function TournamentsInput(props: Props) {

    const query = useGetTournamentsToRegisterQuery();


    const handleClick = (clickedValue: number) => {
        if (props.value.includes(clickedValue))
            props.onChange?.(props.value.filter(v => v !== clickedValue));
        else
            props.onChange?.([...props.value, clickedValue])
    }


    return (
        <div className="flex flex-wrap gap-8">
            {query.loading ?
                Array(4).fill(0).map((_, idx) =>
                    <div
                        key={idx}
                        className="bg-gray-100 border border-gray-200 p-8 rounded-10">
                        <span className='invisible'>{"loading category skeleton".slice(random(6, 12))}</span>
                    </div>)
                :
                ((query.data?.getTournamentToRegister && query.data?.getTournamentToRegister.length < 0) ?
                    query.data?.getTournamentToRegister.map(item =>
                        <Button
                            key={item.id}
                            color='none'
                            size='sm'
                            className={`
                        border text-gray-800
                        ${props.value.includes(item.id) ?
                                    'title-primary-600 bg-primary-100 border-primary-200'
                                    :
                                    "bg-gray-100 border-gray-200"
                                }
                        `}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.title}
                        </Button>)
                    :
                    <p className='text-gray-400 font-medium'>
                        There is no running tournaments currently.
                    </p>)
            }
        </div>
    )
}


