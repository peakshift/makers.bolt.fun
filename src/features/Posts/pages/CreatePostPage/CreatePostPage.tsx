import { useState } from "react";
import { Helmet } from "react-helmet";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CreateStoryPage from "./CreateStoryPage/CreateStoryPage";

interface Props {
  initType: "story" | "bounty" | "question";
}

export default function CreatePostPage(props: Props) {
  const [postType] = useState<"story" | "bounty" | "question">(props.initType);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        {postType === "story" && <title>Create Story</title>}
        {postType === "bounty" && <title>Create Bounty</title>}
        {postType === "question" && <title>Create Question</title>}
      </Helmet>
      <div className="page-container">
        <div
          className="grid gap-24 grid-cols-1 lg:grid-cols-[1fr_4fr]"
          // style={{ gridTemplateColumns: "326px 1fr" }}
        >
          <div className="">
            {/* <PostTypeList selectionChanged={setPostType} /> */}
            <button
              className={`
                w-48 aspect-square bg-white rounded-12 border-2 border-gray-200 justify-around items-center text-gray-900 hover:bg-gray-50 active:bg-gray-100
                `}
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className={"text-body3"} />
            </button>
          </div>
          <div>
            {postType === "story" && (
              <>
                <CreateStoryPage />
              </>
            )}
            {/* {postType === 'bounty' && <>
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
                    </>} */}
          </div>
        </div>
      </div>
    </>
  );
}
