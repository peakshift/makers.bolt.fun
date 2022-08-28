
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { FormProvider, NestedValue, Resolver, useForm } from "react-hook-form";
import { Post_Type } from "src/graphql";
import { StorageService } from "src/services";
import { useAppSelector } from "src/utils/hooks";
import { Override } from "src/utils/interfaces";
import * as yup from "yup";
import DraftsContainer from "../Components/DraftsContainer/DraftsContainer";
import ErrorsContainer from "../Components/ErrorsContainer/ErrorsContainer";
import StoryForm from "../Components/StoryForm/StoryForm";
import styles from './styles.module.scss'

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
    title: yup.string().trim().required().min(10, 'Story title must be 2+ words').transform(v => v.replace(/(\r\n|\n|\r)/gm, "")),
    tags: yup.array().required().min(1, 'Add at least one tag'),
    body: yup.string().required("Write some content in the post").min(50, 'Post must contain at least 10+ words'),
    cover_image: yup.string().trim().nullable(true),

}).required();


export interface IStoryFormInputs {
    id: number | null
    title: string
    tags: NestedValue<{ title: string }[]>
    cover_image: string | null
    body: string
    is_published: boolean | null
}



export type CreateStoryType = Override<IStoryFormInputs, {
    tags: { title: string }[]
}>

const storageService = new StorageService<CreateStoryType>('story-edit');


export default function CreateStoryPage() {


    const { story } = useAppSelector(state => ({
        story: state.staging.story || storageService.get()
    }))

    const formMethods = useForm<IStoryFormInputs>({
        resolver: yupResolver(schema) as Resolver<IStoryFormInputs>,
        shouldFocusError: false,
        defaultValues: {
            id: story?.id ?? null,
            title: story?.title ?? '',
            cover_image: story?.cover_image,
            tags: story?.tags ?? [],
            body: story?.body ?? '',
            is_published: story?.is_published ?? false,
        },
    });



    const errorsContainerRef = useRef<HTMLDivElement>(null!);
    const [formKey, setFormKey] = useState(1)

    const resetForm = () => setFormKey(v => v + 1)


    return (
        <FormProvider {...formMethods}>
            <div className={styles.grid}>

                <StoryForm
                    key={formKey}
                    isPublished={!!story?.is_published}
                    isUpdating={!!story?.id}
                    onSuccess={() => resetForm()}
                    onValidationError={() => errorsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: "center" })}
                />

                <ErrorsContainer id='errors' ref={errorsContainerRef} />

                <DraftsContainer id='drafts' type={Post_Type.Story} onDraftLoad={resetForm} />

            </div>
        </FormProvider>
    )
}
