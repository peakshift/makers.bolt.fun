import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from "react-hook-form";
import Button from "src/Components/Button/Button";
import FilesInput from "src/Components/Inputs/FilesInput/FilesInput";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import ContentEditor from "../ContentEditor/ContentEditor";
import { useCreateStoryMutation } from 'src/graphql'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, } from 'src/utils/hooks';
import { stageStory } from 'src/redux/features/staging.slice'
import { NotificationsService } from "src/services/notifications.service";
import { createRoute } from 'src/utils/routing';
import PreviewPostCard from '../PreviewPostCard/PreviewPostCard'
import { StorageService } from 'src/services';
import { useThrottledCallback } from '@react-hookz/web';
import { CreateStoryType, IStoryFormInputs } from '../../CreateStoryPage/CreateStoryPage';
import { LayoutGroup, motion } from 'framer-motion';

interface Props {
    isUpdating?: boolean;
    isPublished?: boolean;
    onSuccess?: (isDraft: boolean) => void,
    onValidationError?: () => void
}

const storageService = new StorageService<CreateStoryType>('story-edit');

export default function StoryForm(props: Props) {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleSubmit, control, register, trigger, getValues, watch, reset } = useFormContext<IStoryFormInputs>();


    const [editMode, setEditMode] = useState(true)
    const [loading, setLoading] = useState(false);
    const titleInputRef = useRef<HTMLTextAreaElement | null>(null)


    const presistPost = useThrottledCallback((value) => storageService.set(value), [], 1000)
    useEffect(() => {
        const subscription = watch(({ id, is_published, ...values }) => presistPost(values));
        return () => subscription.unsubscribe();
    }, [presistPost, watch]);

    useEffect(() => {
        if (editMode)
            setTimeout(() => titleInputRef.current?.setAttribute("style", "height:" + (titleInputRef.current.scrollHeight) + "px;overflow-y:hidden;"), 0)
    }, [editMode])



    const clickPreview = async () => {
        const isValid = await trigger();

        if (isValid) {
            const data = getValues()
            dispatch(stageStory(data))
            setEditMode(false);
        } else {
            clickSubmit(false)(); // I'm doing this so that the react-hook-form attaches onChange listener to inputs validation
        }
    }


    const [createStory] = useCreateStoryMutation({
        onCompleted: (data) => {
            reset()
            storageService.clear();
            setLoading(false)
            dispatch(stageStory(null))
            if (data.createStory?.is_published)
                navigate(createRoute({ type: 'story', id: data.createStory?.id!, title: data.createStory?.title }))
            props.onSuccess?.(!!data.createStory?.is_published);
        },
        onError: (error) => {
            NotificationsService.error('Unexpected error happened, please try again', { error })
            setLoading(false)
        },
        refetchQueries: ['GetMyDrafts']
    });

    const clickSubmit = (publish_now: boolean) => handleSubmit<IStoryFormInputs>(data => {
        setLoading(true);
        createStory({
            variables: {
                data: {
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    tags: data.tags.map(t => t.title),
                    is_published: publish_now,
                    cover_image: (data.cover_image[0] ?? null) as string | null,
                },
            }
        })
    }, props.onValidationError);




    const postId = watch('id') ?? -1;
    const { ref: registerTitleRef, ...titleRegisteration } = register('title');


    return (
        <>
            <LayoutGroup id='edit-story-mode'>
                <div id='preview-switch' className="flex gap-16 isolate">
                    <button type='button' className={`relative px-16 py-8 ${editMode ? 'text-primary-700' : "text-gray-500"} active:scale-95 transition-transform`} onClick={() => setEditMode(true)}>
                        {editMode && <motion.div layoutId='bg' className="bg-primary-100 rounded-8 absolute inset-0 z-0"></motion.div>}
                        <span className='relative z-10'>Edit</span>
                    </button>
                    <button type='button' className={`relative px-16 py-8 ${!editMode ? 'text-primary-700' : "text-gray-500"} active:scale-95 transition-transform`} onClick={clickPreview}>
                        {!editMode && <motion.div layoutId='bg' className="bg-primary-100 rounded-8 absolute inset-0 z-0"></motion.div>}
                        <span className='relative z-10'>Preview</span></button>
                </div>
            </LayoutGroup>
            <form
                id='form'
                onSubmit={clickSubmit(true)}
            >
                {editMode && <>
                    <div
                        className='bg-white border-2 border-gray-200 rounded-16 overflow-hidden'>
                        <div className="p-16 md:p-24 lg:p-32">
                            <Controller
                                control={control}
                                name="cover_image"
                                render={({ field: { onChange, value, onBlur, ref } }) => (
                                    <FilesInput
                                        ref={ref}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        uploadText='Add a cover image'
                                    />
                                )}
                            />



                            <div className="mt-16 relative">
                                <textarea
                                    rows={1}
                                    autoFocus
                                    className="p-0 text-[42px] leading-[58px] border-0 w-full max-w-full resize-none
                                focus:border-0 focus:outline-none focus:ring-0 font-bolder placeholder:!text-gray-400"
                                    placeholder='New story title here...'
                                    {...titleRegisteration}
                                    ref={e => {
                                        registerTitleRef(e);
                                        titleInputRef.current = e;
                                    }}
                                    onInput={() => {
                                        if (!titleInputRef.current) return;
                                        titleInputRef.current.style.height = "auto";
                                        titleInputRef.current.style.height = (titleInputRef.current.scrollHeight) + "px";
                                    }}
                                />
                            </div>

                            <TagsInput
                                placeholder="Add up to 5 popular tags..."
                                classes={{ container: 'mt-16' }}
                            />

                        </div>
                        <ContentEditor
                            key={postId}
                            initialContent={() => getValues().body}
                            placeholder="Write your story content here..."
                            name="body"
                        />
                    </div>
                </>}
                {!editMode && <PreviewPostCard post={{ ...getValues(), cover_image: getValues().cover_image[0] }} />}
                <div className="flex gap-16 mt-32">
                    <Button
                        type='submit'
                        color="primary"
                        disabled={loading}
                    >
                        {props.isUpdating ?
                            "Update" :
                            "Publish"
                        }
                    </Button>
                    {!props.isPublished &&
                        <Button
                            color="gray"
                            disabled={loading}
                            onClick={clickSubmit(false)}
                        >
                            Save as Draft
                        </Button>}
                </div>
            </form>
        </>
    )
}
