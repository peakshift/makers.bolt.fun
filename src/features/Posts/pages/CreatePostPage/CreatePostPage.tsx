import { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import BountyForm from "./Components/BountyForm/BountyForm";
import QuestionForm from "./Components/QuestionForm/QuestionForm";
import StoryForm from "./Components/StoryForm/StoryForm";
import PostTypeList from "./PostTypeList";

interface Props {

}

export default function CreatePostPage() {

    const { type } = useParams()

    const [postType, setPostType] = useState<'story' | 'bounty' | 'question'>((type as any) ?? 'story');

    return (<>
        <Helmet>
            <title>Create Post</title>
        </Helmet>
        <div
            className="page-container grid gap-32 md:grid-cols-[326px_1fr]"
        // style={{ gridTemplateColumns: "326px 1fr" }}
        >
            <div>
                <PostTypeList selectionChanged={setPostType} />
            </div>
            <div>
                {postType === 'story' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Write a Story
                    </h2>
                    <StoryForm />
                </>}
                {postType === 'bounty' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Write a Bounty
                    </h2>
                    <BountyForm />
                </>}
                {postType === 'question' && <>
                    <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Write a Question
                    </h2>
                    <QuestionForm />
                </>}
            </div>
        </div>
    </>
    )
}
