import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { FormProvider, NestedValue, Resolver, useForm } from "react-hook-form";
import { Triangle } from "react-loader-spinner";
import ErrorPage from "src/Components/Errors/ErrorPage/ErrorPage";
import {
  Category,
  CreateStoryMutationVariables,
  Post_Type,
  Project,
} from "src/graphql";
import { unstageStoryEdit } from "src/redux/features/staging.slice";
import { StorageService } from "src/services";
import { useAppDispatch, useAppSelector, usePreload } from "src/utils/hooks";
import { Override } from "src/utils/interfaces";
import { imageSchema, tagSchema } from "src/utils/validation";
import * as yup from "yup";
import DraftsContainer from "../Components/DraftsContainer/DraftsContainer";
import ErrorsContainer from "../Components/ErrorsContainer/ErrorsContainer";
import StoryForm from "../Components/StoryForm/StoryForm";
import TemplatesCard from "../Components/TemplatesCard/TemplatesCard";
import styles from "./styles.module.scss";

const schema = yup
  .object({
    id: yup
      .number()
      .transform((v) => (v <= 0 ? undefined : v))
      .nullable(),
    title: yup
      .string()
      .trim()
      .required()
      .min(10, "Story title must be 2+ words")
      .transform((v) => v.replace(/(\r\n|\n|\r)/gm, "")),
    tags: yup.array().of(tagSchema).required().min(1, "Add at least one tag"),
    body: yup
      .string()
      .required("Write some content in the post")
      .min(50, "Post must contain at least 10+ words"),
    cover_image: imageSchema.default(null).nullable(),
  })
  .required();

type ApiStoryInput = NonNullable<CreateStoryMutationVariables["data"]>;

type ProjectInput = Pick<Project, "id" | "title" | "thumbnail_image"> & {
  category: Pick<Category, "id" | "title" | "icon">;
};

export type IStoryFormInputs = {
  id: ApiStoryInput["id"];
  title: ApiStoryInput["title"];
  body: ApiStoryInput["body"];
  cover_image: NestedValue<NonNullable<ApiStoryInput["cover_image"]>> | null;
  tags: NestedValue<ApiStoryInput["tags"]>;
  project: NestedValue<ProjectInput> | null;
  is_published: ApiStoryInput["is_published"];
};

export type CreateStoryType = Override<
  IStoryFormInputs,
  {
    cover_image: ApiStoryInput["cover_image"];
    project: ProjectInput | null;
    tags: { id: number; title: string }[];
  }
>;

function CreateStoryPage() {
  const dispatch = useAppDispatch();

  const dataInUrl = getInitDataFromURL();

  const [storageService] = useState(
    () =>
      new StorageService<CreateStoryType>(
        "story-edit" +
          (dataInUrl.tags ? `-${dataInUrl.tags?.[0].title}` : "default")
      )
  );

  const dataInLocalStorage = storageService.get();

  const { stagedStoryEdit, stagedStoryPreview } = useAppSelector((state) => ({
    stagedStoryEdit: state.staging.storyEdit,
    stagedStoryPreview: state.staging.storyPreview,
  }));

  const [isEditing] = useState(!!stagedStoryEdit?.id);

  const initFormData =
    stagedStoryPreview ||
    (isEditing ? stagedStoryEdit : { ...dataInLocalStorage, ...dataInUrl });

  const [storyCreated, setStoryCreated] = useState(false);

  const formMethods = useForm<CreateStoryType>({
    resolver: yupResolver(schema) as Resolver<CreateStoryType>,
    shouldFocusError: false,
    defaultValues: {
      id: initFormData?.id ?? null,
      title: initFormData?.title ?? "",
      cover_image: initFormData?.cover_image,
      tags: initFormData?.tags ?? [],
      body: initFormData?.body ?? "",
      is_published: initFormData?.is_published ?? false,
      project: initFormData?.project,
    },
  });

  const errorsContainerRef = useRef<HTMLDivElement>(null!);
  const [formKey, setFormKey] = useState(1);

  usePreload("PostPage");

  useEffect(() => {
    dispatch(unstageStoryEdit());
  }, [dispatch]);

  const resetForm = () => setFormKey((v) => v + 1);

  if (storyCreated)
    return (
      <div className="flex flex-col gap-24 min-h-screen justify-center items-center">
        <Triangle
          height="80"
          width="80"
          color="var(--primary)"
          ariaLabel="triangle-loading"
          visible={true}
        />
        <p className="text-body3 text-gray-600 font-bold">
          Preparing your new story...
        </p>
      </div>
    );

  return (
    <FormProvider {...formMethods}>
      <div className={styles.grid}>
        <StoryForm
          key={formKey}
          isPublished={!!initFormData?.is_published}
          isUpdating={!!initFormData?.id}
          onSuccess={() => setStoryCreated(true)}
          onValidationError={() =>
            errorsContainerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          storageService={storageService}
        />

        <ErrorsContainer id="errors" ref={errorsContainerRef} />
        <div id="templates" className="mb-24">
          <TemplatesCard />
        </div>
        <DraftsContainer
          id="drafts"
          type={Post_Type.Story}
          onDraftLoad={resetForm}
        />
      </div>
    </FormProvider>
  );
}

// TODO: change the default cover_image on error
export default withErrorBoundary(CreateStoryPage, {
  FallbackComponent: ErrorPage,
  onError: () => {
    // storageService.set({ ...storageService.get()!, cover_image: null as any });
  },
});

function getInitDataFromURL() {
  const qs = window.location.search;
  const urlParams = new URLSearchParams(qs);

  const _tags = urlParams.get("tags");

  // extract the other fields here & parse them if you want to support initializing
  // the form data from the URL
  // currently, only tags is needed
  return {
    ...(_tags && { tags: [{ title: _tags }] }),
  } as Partial<CreateStoryType>;
}
