import { useEffect, useRef, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, NestedValue, Resolver, useForm } from "react-hook-form";
import Button from "src/Components/Button/Button";
import FilesInput from "src/Components/Inputs/FilesInput/FilesInput";
import TagsInput from "src/Components/Inputs/TagsInput/TagsInput";
import * as yup from "yup";
import ContentEditor from "../ContentEditor/ContentEditor";
import { Post_Type, useCreateStoryMutation, useGetMyDraftsQuery } from 'src/graphql'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { stageStory } from 'src/redux/features/staging.slice'
import { Override } from 'src/utils/interfaces';
import { NotificationsService } from "src/services/notifications.service";
import { createRoute } from 'src/utils/routing';
import PreviewPostCard from '../PreviewPostCard/PreviewPostCard'
import { StorageService } from 'src/services';
import { useThrottledCallback } from '@react-hookz/web';

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
    is_published: boolean | null
}



export type CreateStoryType = Override<IFormInputs, {
    tags: { title: string }[]
    cover_image: File[] | string[]
}>

const storageService = new StorageService<CreateStoryType>('story-edit');

export default function StoryForm() {


    const dispatch = useAppDispatch();
    const { story } = useAppSelector(state => ({
        story: state.staging.story || storageService.get()
    }))


    const [editMode, setEditMode] = useState(true)
    const navigate = useNavigate();
    const errorsContainerRef = useRef<HTMLDivElement>(null!);

    const myDraftsQuery = useGetMyDraftsQuery({ variables: { type: Post_Type.Story } })

    const formMethods = useForm<IFormInputs>({
        resolver: yupResolver(schema) as Resolver<IFormInputs>,
        shouldFocusError: false,
        defaultValues: {
            id: story?.id ?? null,
            title: story?.title ?? '',
            cover_image: story?.cover_image ?? [],
            tags: story?.tags ?? [],
            body: story?.body ?? '',
            is_published: story?.is_published ?? false,
        },
    });
    const { handleSubmit, control, register, formState: { errors, isValid, isSubmitted }, trigger, getValues, watch } = formMethods;


    const presistPost = useThrottledCallback((value) => storageService.set(value), [], 1000)
    useEffect(() => {
        const subscription = watch((value) => presistPost(value));
        return () => subscription.unsubscribe();
    }, [presistPost, watch]);




    const [loading, setLoading] = useState(false);
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
            storageService.set(data)
            setEditMode(false);
        } else {
            clickSubmit(false)(); // I'm doing this so that the react-hook-form attaches onChange listener to inputs validation
        }
    }

    const clickSubmit = (publish_now: boolean) => handleSubmit<IFormInputs>(data => {
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
        storageService.clear();
    }, () => errorsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: "center" }))


    const isUpdating = story?.id;


    return (
        <FormProvider {...formMethods}>
            <div className="grid gap-24 grid-cols-1 xl:grid-cols-[1fr_min(326px,25%)]">
                <form
                    className='order-2 xl:order-1'
                    onSubmit={clickSubmit(true)}
                >
                    <div className="flex gap-16 mb-24">
                        <button type='button' className={`rounded-8 px-16 py-8 ${editMode ? 'bg-primary-100 text-primary-700' : "text-gray-500"} active:scale-95 transition-transform`} onClick={() => setEditMode(true)}>Edit</button>
                        <button type='button' className={`rounded-8 px-16 py-8 ${!editMode ? 'bg-primary-100 text-primary-700' : "text-gray-500"} active:scale-95 transition-transform`} onClick={clickPreview}>Preview</button>
                    </div>
                    {editMode && <>
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



                                <div className="mt-16 relative">
                                    <input
                                        autoFocus
                                        type='text'
                                        className="p-0 text-[42px] border-0 focus:border-0 focus:outline-none focus:ring-0 font-bolder placeholder:!text-gray-400"
                                        placeholder='New story title here...'
                                        {...register("title")}
                                    />
                                </div>

                                <TagsInput
                                    placeholder="Add up to 5 popular tags..."
                                    classes={{ container: 'mt-16' }}
                                />

                            </div>
                            <ContentEditor
                                initialContent={story?.body}
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
                            {isUpdating ?
                                "Update" :
                                "Publish"
                            }
                        </Button>
                        {!story?.is_published &&
                            <Button
                                color="gray"
                                disabled={loading}
                                onClick={clickSubmit(false)}
                            >
                                Save as Draft
                            </Button>}
                    </div>
                </form>
                <div className="order-1 xl:sticky top-32 self-start flex flex-col gap-24">
                    <div ref={errorsContainerRef}>
                        {(!isValid && isSubmitted) && <ul className='bg-red-50 p-8 pl-24 border-l-4 rounded-8 border-red-600 list-disc text-body4 text-medium'>
                            {errors.title && <li className="input-error text-body5 text-medium">
                                {errors.title.message}
                            </li>}
                            {errors.cover_image && <li className="input-error text-body5 text-medium">
                                {errors.cover_image.message}
                            </li>}
                            {errors.tags && <li className="input-error text-body5 text-medium">
                                {errors.tags.message}
                            </li>}
                            {errors.body && <li className="input-error text-body5 text-medium">
                                {errors.body.message}
                            </li>}
                        </ul>}
                    </div>
                    {(!myDraftsQuery.loading && myDraftsQuery.data?.getMyDrafts && myDraftsQuery.data.getMyDrafts.length > 0) &&
                        <div className="border-2 border-gray-200 rounded-16 p-16">
                            <p className="text-body4 font-bold mb-16">Saved Drafts</p>
                            <ul className=''>
                                {myDraftsQuery.data.getMyDrafts.map(draft => <li key={draft.id} className='hover:underline' role={'button'}>{draft.title}</li>)}
                            </ul>
                        </div>}
                </div>
            </div>
        </FormProvider >
    )
}
