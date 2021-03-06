import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { Story } from "src/features/Posts/types"
import { marked } from 'marked';
import styles from '../PageContent/styles.module.scss'
import Badge from "src/Components/Badge/Badge";
import IconButton from "src/Components/IconButton/IconButton";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useAppSelector } from "src/utils/hooks";
import { useUpdateStory } from './useUpdateStory'
import { FaPen } from "react-icons/fa";


interface Props {
    story: Story
}

export default function StoryPageContent({ story }: Props) {

    const { curUser } = useAppSelector((state) => ({
        curUser: state.user.me,
    }));

    const { handleDelete, handleEdit } = useUpdateStory(story);


    return (
        <>
            <div id="content" className="bg-white p-32 border-2 border-gray-200 rounded-16 relative">


                {story.cover_image &&
                    <img src={story.cover_image}
                        className='w-full h-[120px] md:h-[240px] object-cover rounded-12 mb-16'
                        alt="" />}
                <div className="flex flex-col gap-24 relative">
                    {curUser?.id === story.author.id && <Menu
                        menuClassName='!p-8 !rounded-12'
                        menuButton={<IconButton className="absolute top-0 right-0 text-gray-400"><FaPen /></IconButton>}>
                        <MenuItem
                            onClick={handleEdit}
                            className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                        >
                            Edit story
                        </MenuItem>
                        <MenuItem
                            onClick={handleDelete}
                            className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                        >
                            Delete
                        </MenuItem>
                    </Menu>}
                    <h1 className="text-[42px] font-bolder">{story.title}</h1>
                    <Header size="lg" showTimeAgo={false} author={story.author} date={story.createdAt} />
                    {story.tags.length > 0 && <div className="flex gap-8">
                        {story.tags.map(tag => <Badge key={tag.id} size='sm'>
                            {tag.title}
                        </Badge>)}
                    </div>}
                    {/* <div className="flex gap-24">
                        <div className="text-black font-medium">
                            <RiFlashlightLine /> <span className="align-middle text-body5">{numberFormatter(story.votes_count)} votes</span>
                        </div>
                        <div className="text-black font-medium">
                            <BiComment /> <span className="align-middle text-body5">{story.comments_count} Comments</span>
                        </div>
                    </div> */}
                </div>

                <div className={`mt-42 ${styles.body}`} dangerouslySetInnerHTML={{ __html: marked.parse(story.body) }}>
                </div>
            </div>
            {/* <div id="comments" className="mt-10 comments_col">
                <CommentsSection comments={story.comments} />
            </div> */}
        </>
    )
}
