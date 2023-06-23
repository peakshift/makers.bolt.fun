import { Controller, useFormContext } from "react-hook-form";
import Card from "src/Components/Card/Card";
import { FaDiscord, FaFigma, FaSlack, FaTelegram } from "react-icons/fa";
import { GiOstrich } from "react-icons/gi";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { SiReplit } from "react-icons/si";
import CategoriesInput from "../CategoriesInput/CategoriesInput";
import CapabilitiesInput from "../CapabilitiesInput/CapabilitiesInput";
import { IListProjectForm } from "../FormContainer/FormContainer";
import AvatarInput from "src/Components/Inputs/FilesInputs/AvatarInput/AvatarInput";
import CoverImageInput from "src/Components/Inputs/FilesInputs/CoverImageInput/CoverImageInput";
import ScreenshotsInput from "src/Components/Inputs/FilesInputs/ScreenshotsInput/ScreenshotsInput";
import { BsLightningChargeFill } from "react-icons/bs";
import InfoCard from "src/Components/InfoCard/InfoCard";
import TextInput from "src/Components/Inputs/TextInput/TextInput";
import TextareaInput from "src/Components/Inputs/TextareaInput/TextareaInput";
import { registerDebounceValidation } from "src/utils/validation";

interface Props {}

export default function ProjectDetailsTab(props: Props) {
  const {
    register,
    formState: { errors, dirtyFields },
    control,
    getValues,
    trigger,
    watch,
  } = useFormContext<IListProjectForm>();

  const isUpdating = !!getValues("id");

  const descriptionLength = watch("description").length;

  return (
    <div className="md:col-span-2 flex flex-col gap-24">
      <Card className="" defaultPadding={false}>
        <div className="bg-gray-600 relative h-[160px] rounded-t-12 md:rounded-t-16">
          <Controller
            control={control}
            name="cover_image"
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <CoverImageInput
                value={value}
                rounded="rounded-t-12 md:rounded-t-16"
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
          />
          <div className="absolute left-24 bottom-0 translate-y-1/2">
            <Controller
              control={control}
              name="thumbnail_image"
              render={({ field: { onChange, value } }) => (
                <AvatarInput value={value} onChange={onChange} width={120} />
              )}
            />
          </div>
        </div>

        <div className="p-16 md:p-24 mt-64">
          {(errors.cover_image || errors.thumbnail_image) && (
            <div className="mb-16">
              {errors.cover_image && (
                <p className="input-error" role="alert">
                  {errors.cover_image.message}
                </p>
              )}
              {errors.thumbnail_image && (
                <p className="input-error" role="alert">
                  {errors.thumbnail_image.message}
                </p>
              )}
            </div>
          )}
          <label htmlFor="title-input" className="text-body5 font-medium">
            Project name<sup className="text-red-500">*</sup>
          </label>
          <TextInput
            id="title-input"
            className="mt-8"
            isError={!!errors.title}
            placeholder="e.g BOLT🔩FUN"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="input-error" role="alert">
              {errors.title.message}
            </p>
          )}
          <label
            htmlFor="project-link-input"
            className="text-body5 mt-16 font-medium"
          >
            Project link<sup className="text-red-500">*</sup>
          </label>
          <TextInput
            id="project-link-input"
            className="mt-8"
            isError={!!errors.website}
            placeholder="https://lightning.xyz"
            {...register("website")}
          />
          {errors.website && (
            <p className="input-error" role="alert">
              {errors.website.message}
            </p>
          )}
          <label
            htmlFor="tagline-input"
            className="text-body5 mt-16 font-medium"
          >
            Tagline<sup className="text-red-500">*</sup>
          </label>
          <TextInput
            id="tagline-input"
            className="mt-8"
            isError={!!errors.tagline}
            placeholder="Your product’s one liner"
            {...register("tagline")}
          />
          {errors.tagline && (
            <p className="input-error" role="alert">
              {errors.tagline.message}
            </p>
          )}
          <label htmlFor="desc-input" className="text-body5 mt-16 font-medium">
            Description<sup className="text-red-500">*</sup>
          </label>
          <TextareaInput
            id="desc-input"
            className="mt-8"
            isError={!!errors.description}
            rows={5}
            placeholder="Provide a short description your product..."
            {...register("description")}
            renderAfter={() => (
              <p className="text-body6 font-medium text-gray-400 absolute top-full translate-y-8 right-0">
                {descriptionLength}/480
              </p>
            )}
          />
          {errors.description && (
            <p className="input-error" role="alert">
              {errors.description.message}
            </p>
          )}
          <label
            htmlFor="hashtag-input"
            className="text-body5 font-medium mt-16"
          >
            Project tag<sup className="text-red-500">*</sup>
          </label>
          <TextInput
            id="hashtag-input"
            className="mt-8"
            isError={!!errors.hashtag}
            placeholder="my_project_name"
            inputClass="pl-8"
            renderBefore={() => (
              <span className="flex flex-col justify-center pl-16 shrink-0">
                #
              </span>
            )}
            {...registerDebounceValidation("hashtag", 1000, trigger, register)}
          />
          {errors.hashtag && (
            <p className="input-error" role="alert">
              {errors.hashtag.message}
            </p>
          )}
          {isUpdating && dirtyFields.hashtag && (
            <InfoCard className="mt-8 bg-warning-50 border-warning-100">
              <span className="font-medium text-orange-600">⚠️ Warning:</span>{" "}
              when you change the tag of your project, existing links that use
              this tag will no longer work & will need to be updateded.
            </InfoCard>
          )}
          {!isUpdating && (
            <InfoCard className="mt-8">
              <span className="font-medium text-gray-900">ℹ️ Project tag</span>{" "}
              allows you to mention your project in stories, or across other
              platforms like Discord. You can change your project’s tag later,
              but links that use the old tag will no longer work & need to be
              updated.
            </InfoCard>
          )}
        </div>
      </Card>
      <Card className="">
        <h2 className="text-body2 font-bolder">🔗 Links</h2>
        <p className="text-body4 font-light text-gray-600 mt-8">
          Make sure that people can find your project online.{" "}
        </p>
        <div className="flex flex-col gap-8 mt-24">
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.twitter}
              renderBefore={() => (
                <FiTwitter className="text-blue-400 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Twitter Link"
              placeholder="https://twitter.com/project_handle"
              {...register("twitter")}
            />
            {errors.twitter && (
              <p className="input-error" role="alert">
                {errors.twitter.message}
              </p>
            )}
          </div>

          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.discord}
              renderBefore={() => (
                <FaDiscord className="text-violet-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Discord Link"
              placeholder="https://discord.com/"
              {...register("discord")}
            />
            {errors.discord && (
              <p className="input-error" role="alert">
                {errors.discord.message}
              </p>
            )}
          </div>

          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.github}
              renderBefore={() => (
                <FiGithub className="text-gray-700 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Github Link"
              placeholder="https://github.com/"
              {...register("github")}
            />
            {errors.github && (
              <p className="input-error" role="alert">
                {errors.github.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.slack}
              renderBefore={() => (
                <FaSlack className="text-pink-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Slack Link"
              placeholder="https://slack.com/"
              {...register("slack")}
            />
            {errors.slack && (
              <p className="input-error" role="alert">
                {errors.slack.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.telegram}
              renderBefore={() => (
                <FaTelegram className="text-teal-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Telegram Link"
              placeholder="https://t.me/XXXXXX"
              {...register("telegram")}
            />
            {errors.telegram && (
              <p className="input-error" role="alert">
                {errors.telegram.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.figma}
              renderBefore={() => (
                <FaFigma className="text-pink-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Figma Link"
              placeholder="https://www.figma.com/file/XXXXXX"
              {...register("figma")}
            />
            {errors.figma && (
              <p className="input-error" role="alert">
                {errors.figma.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.replit}
              renderBefore={() => (
                <SiReplit className="text-orange-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Replit Link"
              placeholder="https://replit.com/@username/project-name"
              {...register("replit")}
            />
            {errors.replit && (
              <p className="input-error" role="alert">
                {errors.replit.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.npub}
              renderBefore={() => (
                <GiOstrich className="text-violet-500 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Nostr Public Key"
              placeholder="npub123456..."
              {...register("npub")}
            />
            {errors.npub && (
              <p className="input-error" role="alert">
                {errors.npub.message}
              </p>
            )}
          </div>
          <div>
            <TextInput
              className="mt-8"
              isError={!!errors.lightning_address}
              renderBefore={() => (
                <BsLightningChargeFill className="text-yellow-400 text-body2 pl-16 py-0 w-auto shrink-0 self-center" />
              )}
              aria-label="Lightning Address"
              placeholder="lightning_address@XXX.com"
              {...register("lightning_address")}
            />
            {errors.lightning_address && (
              <p className="input-error" role="alert">
                {errors.lightning_address.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-body2 font-bolder">
          🌶️ Category<sup className="text-red-500">*</sup>
        </h2>
        <p className="text-body4 font-light text-gray-600 mt-8">
          Select one of the categories below.
        </p>
        <div className="mt-24">
          <Controller
            control={control}
            name="category_id"
            render={({ field: { onChange, value } }) => (
              <CategoriesInput value={value} onChange={onChange} />
            )}
          />
          {errors.category_id && (
            <p className="input-error" role="alert">
              {errors.category_id?.message}
            </p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-body2 font-bolder">🦾 Capabilities</h2>
        <p className="text-body4 font-light text-gray-600 mt-8">
          Let other makers know what lightning capabilities your application
          has.
        </p>
        <div className="mt-24">
          <Controller
            control={control}
            name="capabilities"
            render={({ field: { onChange, value } }) => (
              <CapabilitiesInput value={value} onChange={onChange} />
            )}
          />
          {errors.capabilities && (
            <p className="input-error" role="alert">
              {errors.capabilities?.message}
            </p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-body2 font-bolder">📷 Screenshots</h2>
        <p className="text-body4 font-light text-gray-600 mt-8">
          Choose up to 4 screenshots from your project
        </p>
        <div className="mt-24">
          <Controller
            control={control}
            name="screenshots"
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <ScreenshotsInput
                value={value}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
          />
          {errors.capabilities && (
            <p className="input-error" role="alert">
              {errors.capabilities?.message}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
