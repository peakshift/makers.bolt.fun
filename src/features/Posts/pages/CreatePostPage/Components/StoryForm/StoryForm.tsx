import { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, NestedValue, Resolver, SubmitHandler, useForm } from "react-hook-form";
import Button from "src/Components/Button/Button";
import FilesInput from "src/Components/Inputs/FilesInput/FilesInput";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import * as yup from "yup";
import ContentEditor from "../ContentEditor/ContentEditor";
import { useCreateStoryMutation } from 'src/graphql'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { stageStory } from 'src/redux/features/staging.slice'
import { Override } from 'src/utils/interfaces';
import { NotificationsService } from "src/services/notifications.service";
import { createRoute } from 'src/utils/routing';

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
    title: yup.string().trim().required().min(10, 'the title is too short'),
    tags: yup.array().required().min(1, 'please pick at least one relevant tag'),
    body: yup.string().required().min(50, 'stories should have a minimum of 10 words'),
    cover_image: yup.array().of(FileSchema as any)

}).required();


interface IFormInputs {
    id: number | null
    title: string
    tags: NestedValue<{ title: string }[]>
    cover_image: NestedValue<File[]> | NestedValue<string[]>
    body: string
}



export type CreateStoryType = Override<IFormInputs, {
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
            navigate(createRoute({ type: 'story', id: data.createStory?.id!, title: data.createStory?.title }))
            setLoading(false)
        },

        onError: (error) => {
            NotificationsService.error('Unexpected error happened, please try again', { error })
            setLoading(false)
        }
    });

    const clickPreview = async () => {
        const isValid = await trigger();

        if (isValid) {
            const data = getValues()
            dispatch(stageStory(data))
            navigate('/blog/preview-post/Story')
        } else {
            clickSubmit(); // I'm doing this so that the react-hook-form attaches onChange listener to inputs validation
        }
    }

    const clickSubmit = handleSubmit<IFormInputs>(data => {
        setLoading(true);
        createStory({
            variables: {
                data: {
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    tags: data.tags.map(t => t.title),
                    cover_image: (data.cover_image[0] ?? null) as string | null,
                },
            }
        })
    })


    const isUpdating = story?.id;

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={clickSubmit}
            >
                <div
                    className='bg-white border-2 border-gray-200 rounded-16 overflow-hidden'>
                    <div className="p-32">
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
                        <p className='input-error'>{errors.cover_image?.message}</p>



                        <div className="mt-16 relative">
                            <input
                                autoFocus
                                type='text'
                                className="p-0 text-[42px] border-0 focus:border-0 focus:outline-none focus:ring-0 font-bolder placeholder:!text-gray-600"
                                placeholder='Your Story Title...'
                                {...register("title")}
                            />
                        </div>
                        {errors.title && <p className="input-error">
                            {errors.title.message}
                        </p>}

                        <TagsInput
                            placeholder="Add up to 5 popular tags..."
                            classes={{ container: 'mt-16' }}
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
