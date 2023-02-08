import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { PayloadAction } from "@reduxjs/toolkit";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NostrProfile } from "../../useNostrComments";
import { useId } from "react";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { nip19 } from "nostr-tools";
import { useAppDispatch } from "src/utils/hooks";
import { NotificationsService } from "src/services";

interface Props extends ModalCard {
  profile: NostrProfile;
  updateInfoCallback: PayloadAction<{ profile_data: NostrProfile }>;
  disconnectProfileCallback: PayloadAction<{}>;
}
interface IFormInputs {
  name: string;
  image: string;
  about: string;
  nip05?: string;
  lightning_address?: string;
}

const schema: yup.SchemaOf<IFormInputs> = yup
  .object({
    name: yup.string().required().min(2),
    image: yup.string().required().url(),
    about: yup.string().required().max(150),
    nip05: yup.string().optional(),
    lightning_address: yup.string().email().optional(),
  })
  .required();

export default function UpdateNostrProfileModal({
  onClose,
  direction,
  profile,
  updateInfoCallback,
  disconnectProfileCallback,
}: Props) {
  const dispatch = useAppDispatch();
  const inputId = useId();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: profile.name,
      about: profile.about ?? "",
      image: profile.image,
      lightning_address: profile.lightning_address ?? "",
      nip05: profile.nip05 ?? "",
    },
  });

  const profileImage = watch("image");

  const onDisconnect = () => {
    const action = Object.assign({}, disconnectProfileCallback);
    dispatch(action);
    onClose?.();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const action = Object.assign({}, updateInfoCallback);
    action.payload = {
      profile_data: {
        ...data,
        link: "nostr:" + nip19.npubEncode(profile.pubkey),
        pubkey: profile.pubkey,
      },
    };
    dispatch(action);
    onClose?.();
    NotificationsService.info("Publishing new profile data...");
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[522px] rounded-xl relative"
    >
      <div className="p-24">
        <IoClose
          className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Update Your Nostr Profile
        </h2>
      </div>
      <hr className="bg-gray-200" />

      <form
        className="flex flex-col gap-24 p-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor={`${inputId}-name`} className="text-body5 font-bold">
            Your Nostr Username
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id={`${inputId}-name`}
              autoFocus
              type={"text"}
              className="input-text"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor={`${inputId}-about`} className="text-body5 font-bold">
            About
          </label>
          <div className="input-wrapper mt-8 relative">
            <textarea
              id={`${inputId}-about`}
              rows={3}
              className="input-text"
              placeholder="Let people know you a little better"
              {...register("about")}
            />
          </div>
          {errors.about && (
            <p className="input-error">{errors.about.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${inputId}-image`} className="text-body5 font-bold">
            Profile Image URL
          </label>
          <div className="flex items-center gap-12">
            <div className="input-wrapper mt-8 relative">
              <input
                id={`${inputId}-image`}
                type={"text"}
                className="input-text"
                placeholder={`https://api.dicebear.com/5.x/croodles/svg?seed=${profile.pubkey}`}
                {...register("image")}
              />
            </div>
            <div className="w-42">
              {profileImage && <Avatar src={profileImage} width={42} />}
            </div>
          </div>
          {errors.image && (
            <p className="input-error">{errors.image.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${inputId}-nip05`} className="text-body5 font-bold">
            NIP-05 Id
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id={`${inputId}-nip05`}
              placeholder="bob@somewhere.com"
              type={"text"}
              className="input-text"
              {...register("nip05")}
            />
          </div>
          {errors.nip05 && (
            <p className="input-error">{errors.nip05.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor={`${inputId}-lightning_address`}
            className="text-body5 font-bold"
          >
            Lightning Address
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id={`${inputId}-lightning_address`}
              placeholder="bob@getalby.com"
              type={"text"}
              className="input-text"
              {...register("lightning_address")}
            />
          </div>
          {errors.lightning_address && (
            <p className="input-error">{errors.lightning_address.message}</p>
          )}
        </div>

        <div className="flex gap-16 justify-between mt-32">
          <Button size="sm" variant="text" color="red" onClick={onDisconnect}>
            Disconnect this profile
          </Button>
          <div className="flex gap-16 justify-end">
            <Button size="sm" type="submit" color="primary">
              Update Info
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
