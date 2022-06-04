import { useState } from "react";
import { Helmet } from "react-helmet";
import BountyForm from "./Components/BountyForm/BountyForm";
import QuestionForm from "./Components/QuestionForm/QuestionForm";
import StoryForm from "./Components/StoryForm/StoryForm";
import PostTypeList from "./PostTypeList";

interface Props {

}

export default function CreatePostPage() {

    const [postType, setPostType] = useState<'story' | 'bounty' | 'question'>('story');

    return (<>
        <Helmet>
            <title>Create Post</title>
        </Helmet>
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
                        Create a Story
                    </h2>
                    <StoryForm />
                </>}
                {postType === 'bounty' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Create a Bounty
                    </h2>
                    <BountyForm />
                </>}
                {postType === 'question' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Create a Question
                    </h2>
                    <QuestionForm />
                </>}
            </div>
        </div>
    </>
    )
}
