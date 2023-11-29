import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import OgTags from "src/Components/OgTags/OgTags";

import { CreateOrUpdateBadgeInput } from "src/graphql";
import * as yup from "yup";
import CreateBadgeForm from "./CreateBadgeForm";
import PreviewBadgeCard from "./PreviewBadgeCard";
import { LoaderData } from "./updateBadgeDetails.loader";

const schema: yup.SchemaOf<CreateOrUpdateBadgeInput> = yup
  .object({
    id: yup.number().required(),
    title: yup.string().required().min(3),
    slug: yup.string().required().min(3),
    description: yup.string().required().min(10),
    image: yup.string().required(),
    color: yup.string(),
    isAdminIssuedOnly: yup.boolean().required(),
    winningDescriptionTemplate: yup.string().required(),
    badgeDefinitionNostrEventId: yup.string().nullable(),
    incrementsNeeded: yup.number().nullable(),
    incrementOnActionId: yup.number().nullable(),
  })
  .required();

export type CreateBadgeFormType = yup.InferType<typeof schema>;

export default function UpdateBadgePage() {
  const loaderData = useLoaderData() as LoaderData;

  const badgeData = loaderData.getBadgeById;

  const formMethods = useForm<CreateBadgeFormType>({
    resolver: yupResolver(schema) as Resolver<CreateBadgeFormType>,
    defaultValues: {
      id: badgeData.id,
      title: badgeData.title,
      slug: badgeData.slug,
      description: badgeData.description,
      image: badgeData.image,
      color: badgeData.color,
      winningDescriptionTemplate: badgeData.winningDescriptionTemplate,
      badgeDefinitionNostrEventId: badgeData.badgeDefinitionNostrEventId,
      isAdminIssuedOnly: badgeData.isAdminIssuedOnly,
      incrementsNeeded: badgeData.incrementsNeeded,
      incrementOnActionId:
        (badgeData.incrementOnAction?.id.toString() as any) ?? null,
    },
  });

  return (
    <>
      <OgTags title={"Update Badge"} description={""} />
      <div className={`page-container`}>
        <h1 className="text-h1 font-bolder mb-24">Update Badge</h1>
        <FormProvider {...formMethods}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,520px)_minmax(420px,1fr)] gap-24 items-center">
            <div className="">
              <CreateBadgeForm badgeId={badgeData.id} />
            </div>
            <div>
              <PreviewBadgeCard />
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
}
