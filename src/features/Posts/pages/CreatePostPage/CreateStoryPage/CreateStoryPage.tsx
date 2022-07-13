
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
    title: yup.string().trim().required().min(10, 'the title is too short'),
    tags: yup.array().required().min(1, 'please pick at least one relevant tag'),
    body: yup.string().required().min(50, 'stories should have a minimum of 10 words'),
    cover_image: yup.array().of(FileSchema as any)

}).required();


export interface IStoryFormInputs {
    id: number | null
    title: string
    tags: NestedValue<{ title: string }[]>
    cover_image: NestedValue<File[]> | NestedValue<string[]>
    body: string
    is_published: boolean | null
}



export type CreateStoryType = Override<IStoryFormInputs, {
    tags: { title: string }[]
    cover_image: File[] | string[]
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
            cover_image: story?.cover_image ?? [],
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

                <div id="form">
                    <StoryForm
                        key={formKey}
                        isPublished={!!story?.is_published}
                        isUpdating={!!story?.id}
                        onSuccess={() => resetForm()}
                        onValidationError={() => errorsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: "center" })}
                    />
                </div>

                <div id="errors">
                    <ErrorsContainer ref={errorsContainerRef} />
                </div>
                <div id="drafts">
                    <DraftsContainer type={Post_Type.Story} onDraftLoad={resetForm} />
                </div>
            </div>
        </FormProvider>
    )
}
