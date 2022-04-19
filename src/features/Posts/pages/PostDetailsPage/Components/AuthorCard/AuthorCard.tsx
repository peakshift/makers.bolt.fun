import dayjs from "dayjs";
import Button from "src/Components/Button/Button";
import { Author } from "src/features/Posts/types";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";

interface Props {
    author: Author
}

export default function AuthorCard({ author }: Props) {
    return (
        <div className="bg-white p-16 border rounded-8">
            <div className='flex gap-8'>
                <Avatar width={48} src={author.image} />
                <div>
                    <p className={`'text-body4' text-black font-medium`}>{author.name}</p>
                    <p className={`text-body6 text-gray-600`}>Joined on {dayjs(author.join_date).format('MMMM DD, YYYY')}</p>
                </div>
            </div>
            <Button fullWidth color="primary" className="mt-16">
                Follow
            </Button>
        </div>
    )
}
