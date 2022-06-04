import { ComponentProps } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "src/Components/Button/Button";
import { useUpdateProfileAboutMutation } from "src/graphql";
import { NotificationsService } from "src/services/notifications.service";
import AboutCard from "./AboutCard"

interface Props {
  data: ComponentProps<typeof AboutCard>['user'],
  onClose?: () => void;
}

type IFormInputs = Props['data'];

export default function UpdateAboutForm({ data, onClose }: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>({
    defaultValues: data
  });

  const [mutate, mutationStatus] = useUpdateProfileAboutMutation({
    onCompleted: () => {
      onClose?.()
    }
  });



  const onSubmit: SubmitHandler<IFormInputs> = data => {
    mutate({
      variables: {
        data: {
          name: data.name,
          avatar: data.avatar,
          jobTitle: data.jobTitle,
          bio: data.bio,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          lightning_address: data.lightning_address,
          location: data.location,
          twitter: data.twitter,
          website: data.website,
        }
      }
    }).catch(() => {
      NotificationsService.error('A network error happened');
      mutationStatus.reset()
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-body5 mt-16 font-medium">
        Name
      </p>
      <div className="input-wrapper mt-8 relative">
        <input
          autoFocus
          type='text'
          className="input-text"
          placeholder='John Doe'
          {...register("name")}
        />
      </div>
      {errors.name && <p className="input-error">
        {errors.name.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Avatar
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder='https://images.com/my-avatar.jpg'
          {...register("avatar")}
        />
      </div>
      {errors.avatar && <p className="input-error">
        {errors.avatar.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Bio
      </p>
      <div className="input-wrapper mt-8 relative">
        <textarea

          rows={3}
          className="input-text !p-20"
          placeholder='Tell others a little bit about yourself'
          {...register("bio")}
        />
      </div>
      {errors.bio && <p className="input-error">
        {errors.bio.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Job Title
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="UK, London"
          {...register("jobTitle")}
        />
      </div>
      {errors.jobTitle && <p className="input-error">
        {errors.jobTitle.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Location
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="UK, London"
          {...register("location")}
        />
      </div>
      {errors.location && <p className="input-error">
        {errors.location.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Website
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="www.website.io"
          {...register("website")}
        />
      </div>
      {errors.website && <p className="input-error">
        {errors.website.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Twitter
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="@johndoe"
          {...register("twitter")}
        />
      </div>
      {errors.twitter && <p className="input-error">
        {errors.twitter.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Github
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="johndoe"
          {...register("github")}
        />
      </div>
      {errors.github && <p className="input-error">
        {errors.github.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Linkedin
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="www.linkedin.com/in/john-doe"
          {...register("linkedin")}
        />
      </div>
      {errors.linkedin && <p className="input-error">
        {errors.linkedin.message}
      </p>}
      <p className="text-body5 mt-16 font-medium">
        Lightning address
      </p>
      <div className="input-wrapper mt-8 relative">
        <input

          type='text'
          className="input-text"
          placeholder="johndoe@lnd.com"
          {...register("lightning_address")}
        />
      </div>
      {errors.lightning_address && <p className="input-error">
        {errors.lightning_address.message}
      </p>}
      <div className="mt-24 flex gap-16 justify-end">
        <Button
          color='gray'
          disabled={mutationStatus.loading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          color='primary'
          isLoading={mutationStatus.loading}
          disabled={mutationStatus.loading}
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}
