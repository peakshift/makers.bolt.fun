import {
  FormProvider,
  NestedValue,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IsValidProjectHashtagDocument,
  ProjectDetailsQuery,
  ProjectLaunchStatusEnum,
  ProjectPermissionEnum,
  Team_Member_Role,
  UpdateProjectInput,
  useProjectDetailsQuery,
} from "src/graphql";
import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { useWindowPrompt } from "src/utils/hooks";
import { imageSchema } from "src/utils/validation";
import { Override } from "src/utils/interfaces";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { apolloClient } from "src/utils/apollo";
import { getStore } from "src/redux/store";
import UpdateProjectContextProvider from "./updateProjectContext";
import { useNavigate } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import { nanoid } from "@reduxjs/toolkit";
import { Helmet } from "react-helmet";
import { nip19 } from "nostr-tools";

interface Props {}

export type IListProjectForm = Override<
  UpdateProjectInput,
  {
    members: NestedValue<ProjectMember[]>;
    capabilities: NestedValue<UpdateProjectInput["capabilities"]>;
    recruit_roles: NestedValue<UpdateProjectInput["recruit_roles"]>;
    tournaments: NestedValue<UpdateProjectInput["tournaments"]>;
    cover_image: NestedValue<UpdateProjectInput["cover_image"]>;
    thumbnail_image: NestedValue<UpdateProjectInput["thumbnail_image"]>;
  }
>;

export type ProjectMember = {
  id: number;
  name: string;
  jobTitle: string | null;
  avatar: string;
  role: Team_Member_Role;
};

const schema: yup.SchemaOf<IListProjectForm> = yup
  .object({
    id: yup.number().optional(),
    title: yup.string().trim().required("please provide a title").min(2),
    hashtag: yup
      .string()
      .required("please provide a project tag")
      .matches(
        /^[^ !@#$%^&*(),.?":{}|<>]*$/,
        "your project's tag can only contain letters, numbers and '_’"
      )
      .min(3, "your project tag must be longer than 2 characters.")
      .max(35, "your project tag must be shorter than 35 characters.")
      .test({
        name: "is unique hashtag",
        test: async (value, context) => {
          // TODO: debounce this validation function
          try {
            const res = await apolloClient.query({
              query: IsValidProjectHashtagDocument,
              variables: {
                hashtag: value,
                projectId: context.parent.id,
              },
            });
            if (res.data.checkValidProjectHashtag) return true;
            return false;
          } catch (error) {
            return false;
          }
        },
        message: "this hashtag is already used by another project",
      }),
    website: yup.string().trim().url().required().label("project's link"),
    tagline: yup.string().trim().required("please provide a tagline").min(10),
    description: yup
      .string()
      .trim()
      .required("please provide a description for your project")
      .min(50, "write at least 10 words descriping your project")
      .max(480, "your description shouldn't exceed 480 characters"),
    lightning_address: yup
      .string()
      .test({
        name: "is valid lightning_address",
        test: async (value) => {
          try {
            if (value) {
              const [name, domain] = value.split("@");
              const lnurl = `https://cors-here.peakshift.workers.dev/?url=https://${domain}/.well-known/lnurlp/${name}`;
              const res = await fetch(lnurl);
              if (res.status === 200) return true;
              return false;
            }
            return true;
          } catch (error) {
            return false;
          }
        },
        message: "this lightning address isn't valid",
      })
      .nullable()
      .label("lightning address"),
    thumbnail_image: imageSchema
      .required("please pick a thumbnail image")
      .default(undefined),
    cover_image: imageSchema
      .required("please pick a cover image")
      .default(undefined),
    twitter: yup.string().url().nullable(),
    discord: yup.string().url().nullable(),
    github: yup.string().url().nullable(),
    figma: yup.string().url().nullable(),
    replit: yup.string().url().nullable(),
    youtube: yup.string().url().nullable(),
    slack: yup.string().url().nullable(),
    npub: yup
      .string()
      .nullable()
      .transform((_value) => {
        if (!_value) return null;
        let value = _value;
        if (_value?.startsWith("nostr:")) {
          value = _value.replace("nostr:", "");
        }
        if (value?.startsWith("npub")) {
          try {
            return nip19.decode(value).data;
          } catch (error) {
            throw new yup.ValidationError(
              new yup.ValidationError(
                "invalid encoding format",
                value,
                "npub",
                "is-valid"
              )
            );
          }
        }

        // valid hex key
        if (value.match(/^[a-f0-9]{64}$/)) return value;

        throw new yup.ValidationError(
          new yup.ValidationError(
            "not a valid public key",
            value,
            "npub",
            "is-valid"
          )
        );
      }),
    telegram: yup.string().url().nullable(),
    category_id: yup.number().required("please choose a category"),
    capabilities: yup.array().of(yup.number().required()).default([]),
    screenshots: yup.array().of(imageSchema.required()).default([]),
    members: yup
      .array()
      .of(yup.object() as any)
      .default([]),
    recruit_roles: yup.array().of(yup.number().required()).default([]),
    launch_status: yup
      .mixed()
      .oneOf([ProjectLaunchStatusEnum.Wip, ProjectLaunchStatusEnum.Launched])
      .default(ProjectLaunchStatusEnum.Wip),
    tournaments: yup.array().of(yup.number().required()).default([]),
  })
  .required();

export default function FormContainer(props: PropsWithChildren<Props>) {
  const [params] = useSearchParams();

  const id = params.get("id") ? Number(params.get("id")) : null;

  const isUpdating = !!id;
  const navigate = useNavigate();

  const methods = useForm<IListProjectForm>({
    defaultValues: {
      cover_image: undefined,
      thumbnail_image: undefined,
      id: isUpdating ? id : undefined,
      title: "",
      website: "",
      tagline: "",
      description: "",
      category_id: undefined,
      capabilities: [],
      screenshots: [],
      members: prepareMembers([]),
      recruit_roles: [],
      launch_status: ProjectLaunchStatusEnum.Wip,
      tournaments: [],
    },
    resolver: yupResolver(schema) as Resolver<IListProjectForm>,
    mode: "onTouched",
  });

  const query = useProjectDetailsQuery({
    variables: {
      projectId: id!,
      projectTag: null,
    },
    skip: !isUpdating,
    onCompleted: (res) => {
      if (res.getProject) {
        const data = res.getProject;
        if (
          !res.getProject.permissions.includes(ProjectPermissionEnum.UpdateInfo)
        )
          navigate({ pathname: createRoute({ type: "projects-page" }) });
        else
          methods.reset({
            id: data.id,
            title: data.title,
            cover_image: data.cover_image
              ? { url: data.cover_image }
              : undefined,
            thumbnail_image: data.thumbnail_image
              ? { url: data.thumbnail_image }
              : undefined,
            tagline: data.tagline,
            website: data.website,
            description: data.description,
            hashtag: data.hashtag,
            twitter: data.twitter,
            discord: data.discord,
            slack: data.slack,
            telegram: data.telegram,
            github: data.github,
            figma: data.figma,
            replit: data.replit,
            npub: data.npub,
            lightning_address: data.lightning_address,
            category_id: data.category.id,
            capabilities: data.capabilities.map((c) => c.id),
            screenshots: data.screenshots.map((url) => ({
              url,
              local_id: nanoid(5),
            })),

            members: prepareMembers(data.members),
            recruit_roles: data.recruit_roles.map((r) => r.id),

            tournaments: [],
            launch_status: data.launch_status,
          });
      }
    },
  });

  useWindowPrompt(methods.formState.isDirty);

  const onSubmit: SubmitHandler<IListProjectForm> = (data) => console.log(data);

  if (query.loading) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>{isUpdating ? "Update project" : "List a project"}</title>
      </Helmet>
      <FormProvider {...methods}>
        <UpdateProjectContextProvider
          permissions={
            query.data?.getProject.permissions ??
            Object.values(ProjectPermissionEnum)
          }
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {props.children}
          </form>
        </UpdateProjectContextProvider>
      </FormProvider>
    </>
  );
}

function prepareMembers(
  members: ProjectDetailsQuery["getProject"]["members"]
): ProjectMember[] {
  const me = getStore().getState().user.me;

  if (!me) {
    window.location.href = "/login";
    return [];
  }

  if (members.length === 0)
    return [
      {
        id: me.id,
        avatar: me.avatar,
        name: me.name,
        jobTitle: me.jobTitle,
        role: Team_Member_Role.Owner,
      },
    ];

  const _members = members.map(({ role, user }) => ({
    role,
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    jobTitle: user.jobTitle,
  }));

  const myMember = _members.find((m) => m.id === me.id);

  if (!myMember) throw new Error("Not a member of the project");

  return [myMember, ..._members.filter((m) => m.id !== me.id)];
}
