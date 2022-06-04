import dayjs from "dayjs";
import Button from "src/Components/Button/Button";
import { Author } from "src/features/Posts/types";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { trimText } from "src/utils/helperFunctions";

interface Props {
    author: Pick<Author,
        | 'id'
        | 'name'
        | 'avatar'
        | 'join_date'>
}

export default function AuthorCard({ author }: Props) {
    return (
        <div className="bg-white p-16 border rounded-8">
            <div className='flex gap-8'>
                <Avatar width={48} src={author.avatar} />
                <div className="overflow-hidden">
                    <p className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}>{trimText(author.name, 333)}</p>
                    <p className={`text-body6 text-gray-600`}>Joined on {dayjs(author.join_date).format('MMMM DD, YYYY')}</p>
                </div>
            </div>
            <Button fullWidth color="primary" className="mt-16">
                Follow
            </Button>
        </div>
    )
}
