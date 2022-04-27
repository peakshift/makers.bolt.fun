import { useState } from "react";
import StoryForm from "./Components/StoryForm/StoryForm";
import PostTypeList from "./PostTypeList";

interface Props {

}

export default function CreatePostPage() {

    const [postType, setPostType] = useState<'story' | 'bounty' | 'question'>('story');

    return (
        <div
            className="page-container grid gap-32"
            style={{ gridTemplateColumns: "326px 1fr" }}
        >
            <div>
                <PostTypeList selectionChanged={setPostType} />
            </div>
            <div>
                {postType === 'story' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Create Story
                    </h2>
                    <StoryForm />
                </>}
            </div>
        </div>
    )
}
