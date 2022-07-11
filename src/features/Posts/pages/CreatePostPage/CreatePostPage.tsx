import { useState } from "react";
import { Helmet } from "react-helmet";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import BountyForm from "./Components/BountyForm/BountyForm";
import QuestionForm from "./Components/QuestionForm/QuestionForm";
import StoryForm from "./Components/StoryForm/StoryForm";
import PostTypeList from "./PostTypeList";

interface Props {

}

export default function CreatePostPage() {

    const { type } = useParams()

    const [postType, setPostType] = useState<'story' | 'bounty' | 'question'>((type as any) ?? 'story');
    const navigate = useNavigate();

    return (<>
        <Helmet>
            {postType === 'story' && <title>Create Story</title>}
            {postType === 'bounty' && <title>Create Bounty</title>}
            {postType === 'question' && <title>Create Question</title>}
        </Helmet>
        <div
            className="page-container grid gap-24 grid-cols-1 lg:grid-cols-[1fr_min(100%,910px)_1fr]"
        // style={{ gridTemplateColumns: "326px 1fr" }}
        >
            <div className="">
                {/* <PostTypeList selectionChanged={setPostType} /> */}
                <button className={`
                w-48 aspect-square bg-white rounded-12 border-2 border-gray-200 justify-around items-center text-gray-900 hover:bg-gray-50 active:bg-gray-100
                `}
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft className={"text-body3"} />
                </button>
            </div>
            <div style={{
                width: "min(100%,910px)"
            }}>
                {postType === 'story' && <>
                    {/* <h2 className="text-h2 font-bolder text-gray-800 mb-32">
                        Write a Story
                    </h2> */}
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
