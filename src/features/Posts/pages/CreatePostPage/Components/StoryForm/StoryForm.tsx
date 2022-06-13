import { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form";
import Button from "src/Components/Button/Button";
import FilesInput from "src/Components/Inputs/FilesInput/FilesInput";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import * as yup from "yup";
import ContentEditor from "../ContentEditor/ContentEditor";
import { Topic, useCreateStoryMutation } from 'src/graphql'
import { useNavigate } from 'react-router-dom'
import TopicsInput from '../TopicsInput/TopicsInput'
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { stageStory } from 'src/redux/features/staging.slice'
import { Override } from 'src/utils/interfaces';
import { NotificationsService } from "src/services/notifications.service";

const FileSchema = yup.lazy((value: string | File[]) => {

    switch (typeof value) {
        case 'object':
            return yup.mixed()
                .test("fileSize", "File Size is too large", file => file.size <= 5242880)
                .test("fileType", "Unsupported File Format, only png/jpg/jpeg images are allowed",
                    (file: File) =>
                        ["image/jpeg", "image/png", "image/jpg"].includes(file.type))
        case 'string':
            return yup.string().url();
        default:
            return yup.mixed()
    }
})

const schema = yup.object({
    title: yup.string().required().min(10),
    topic: yup.object().nullable().required(),
    tags: yup.array().required().min(1),
    body: yup.string().required().min(50, 'you have to write at least 10 words'),
    cover_image: yup.array().of(FileSchema as any)

}).required();


interface IFormInputs {
    id: number | null
    title: string
    topic: NestedValue<Topic> | null
    tags: NestedValue<{ title: string }[]>
    cover_image: NestedValue<File[]> | NestedValue<string[]>
    body: string
}



export type CreateStoryType = Override<IFormInputs, {
    topic: Topic | null
    tags: { title: string }[]
    cover_image: File[] | string[]
}>

export default function StoryForm() {


    const dispatch = useAppDispatch();
    const { story } = useAppSelector(state => ({
        story: state.staging.story
    }))

    const formMethods = useForm<IFormInputs>({
        resolver: yupResolver(schema) as Resolver<IFormInputs>,
        defaultValues: {
            id: story?.id ?? null,
            title: story?.title ?? '',
            topic: story?.topic ?? null,
            cover_image: story?.cover_image ?? [],
            tags: story?.tags ?? [],
            body: story?.body ?? '',
        },
    });
    const { handleSubmit, control, register, formState: { errors, }, trigger, getValues, } = formMethods;
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [createStory] = useCreateStoryMutation({
        onCompleted: (data) => {
            navigate(`/blog/post/Story/${data.createStory?.id}`)
            setLoading(false)
        },

        onError: (error) => {
            NotificationsService.error('Unexpected error happened, please try again', { error })
            setLoading(false)
        }
    });

    const clickPreview = async () => {
        const isValid = await trigger();
        const data = getValues()

        if (isValid) {
            dispatch(stageStory(data))
            navigate('/blog/preview-post/Story')
        }
    }

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        setLoading(true);
        createStory({
            variables: {
                data: {
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    tags: data.tags.map(t => t.title),
                    cover_image: data.cover_image[0] as string,
                    topicId: 1,
                },
            }
        })
    }

    const isUpdating = story?.id;

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className='bg-white border-2 border-gray-100 rounded-12 overflow-hidden'>
                    <div className="p-32">
                        <Controller
                            control={control}
                            name="cover_image"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <FilesInput
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    uploadText='Add a cover image'
                                />
                            )}
                        />
                        <p className='input-error'>{errors.cover_image?.message}</p>


                        <p className="text-body5 mt-16">
                            Title
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                autoFocus
                                type='text'
                                className="input-text"
                                placeholder='Your Story Title'
                                {...register("title")}
                            />
                        </div>
                        {errors.title && <p className="input-error">
                            {errors.title.message}
                        </p>}

                        <p className="text-body5 mt-16">
                            Topic
                        </p>
                        <div className="mt-16">
                            <Controller
                                control={control}
                                name="topic"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TopicsInput
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.topic && <p className="input-error">
                            {errors.topic.message}
                        </p>}
                        <p className="text-body5 mt-16">
                            Tags
                        </p>
                        <TagsInput
                            placeholder="Enter your tag and click enter. You can add multiple tags to your post"
                            classes={{ container: 'mt-8' }}
                        />
                        {errors.tags && <p className="input-error">
                            {errors.tags.message}
                        </p>}
                    </div>
                    <ContentEditor
                        initialContent={story?.body}
                        placeholder="Write your story content here..."
                        name="body"
                    />

                    {errors.body && <p className="input-error py-8 px-16">
                        {errors.body.message}
                    </p>}
                </div>
                <div className="flex gap-16 mt-32">
                    <Button
                        type='submit'
                        color="primary"
                        disabled={loading}
                    >
                        {isUpdating ?
                            loading ? "Updating..." : "Update" :
                            loading ? "Publishing..." : "Publish"
                        }
                    </Button>
                    <Button
                        color="gray"
                        onClick={clickPreview}
                    >
                        Preview
                    </Button>
                </div>
            </form>
        </FormProvider >
    )
}
