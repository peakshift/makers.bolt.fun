
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { FormProvider, NestedValue, Resolver, useForm } from "react-hook-form";
import ErrorPage from "src/Components/Errors/ErrorPage/ErrorPage";
import { Category, CreateStoryMutationVariables, MyProjectsQuery, Post_Type, Project } from "src/graphql";
import { StorageService } from "src/services";
import { useAppSelector } from "src/utils/hooks";
import { Override } from "src/utils/interfaces";
import { imageSchema, tagSchema } from "src/utils/validation";
import * as yup from "yup";
import DraftsContainer from "../Components/DraftsContainer/DraftsContainer";
import ErrorsContainer from "../Components/ErrorsContainer/ErrorsContainer";
import StoryForm from "../Components/StoryForm/StoryForm";
import TemplatesCard from "../Components/TemplatesCard/TemplatesCard";
import styles from './styles.module.scss'



const schema = yup.object({
    id: yup.number().transform(v => v <= 0 ? undefined : v).nullable(),
    title: yup.string().trim().required().min(10, 'Story title must be 2+ words').transform(v => v.replace(/(\r\n|\n|\r)/gm, "")),
    tags: yup.array().of(tagSchema).required().min(1, 'Add at least one tag'),
    body: yup.string().required("Write some content in the post").min(50, 'Post must contain at least 10+ words'),
    cover_image: imageSchema.default(null).nullable(),
}).required();


type ApiStoryInput = NonNullable<CreateStoryMutationVariables['data']>;

type ProjectInput = Pick<Project, 'id' | 'title' | 'thumbnail_image'> & { category: Pick<Category, 'id' | 'title' | 'icon'> }

export type IStoryFormInputs = {
    id: ApiStoryInput['id']
    title: ApiStoryInput['title']
    body: ApiStoryInput['body']
    cover_image: NestedValue<NonNullable<ApiStoryInput['cover_image']>> | null
    tags: NestedValue<ApiStoryInput['tags']>
    project: NestedValue<ProjectInput> | null
    is_published: ApiStoryInput['is_published']
}

export type CreateStoryType = Override<IStoryFormInputs, {
    cover_image: ApiStoryInput['cover_image'],
    project: ProjectInput | null
    tags: { title: string }[]
}>

const storageService = new StorageService<CreateStoryType>('story-edit');


function CreateStoryPage() {


    const { story } = useAppSelector(state => ({
        story: state.staging.story || storageService.get()
    }))


    const formMethods = useForm<CreateStoryType>({
        resolver: yupResolver(schema) as Resolver<CreateStoryType>,
        shouldFocusError: false,
        defaultValues: {
            id: story?.id ?? null,
            title: story?.title ?? '',
            cover_image: story?.cover_image,
            tags: story?.tags ?? [],
            body: story?.body ?? '',
            is_published: story?.is_published ?? false,
            project: story?.project,
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
                <div id="templates" className="mb-24">
                    <TemplatesCard />
                </div>
                <DraftsContainer id='drafts' type={Post_Type.Story} onDraftLoad={resetForm} />

            </div>
        </FormProvider>
    )
}

// TODO: change the default cover_image on error
export default withErrorBoundary(CreateStoryPage, { FallbackComponent: ErrorPage, onError: () => { storageService.set({ ...storageService.get()!, cover_image: null as any }) } })