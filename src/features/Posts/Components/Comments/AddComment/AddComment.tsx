import { FormEvent } from "react";
import Button from "src/Components/Button/Button";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useAutoResizableTextArea } from "src/utils/hooks";



export default function AddComment() {

    const textAreaRef = useAutoResizableTextArea();

    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        alert('submitted')
    }

    return (
        <form onSubmit={submitComment} className="border border-gray-200 rounded-10 p-24">
            <div className="flex gap-16 items-start pb-24 border-b border-gray-200 focus-within:border-primary-500">
                <Avatar width={48} src='https://i.pravatar.cc/150?img=1' />
                <textarea
                    rows={2}
                    className="w-full border-0 text-gray-500 font-medium focus:!ring-0 resize-none"
                    placeholder='Leave a comment...'
                    ref={textAreaRef}
                />
            </div>
            <div className="flex mt-24">
                <Button type='submit' color="primary" className="ml-auto">Submit</Button>
            </div>
        </form>
    )
}
