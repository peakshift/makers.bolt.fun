import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import ChooseLoginMethods from "src/features/Auth/components/ChooseLoginMethods/ChooseLoginMethods";
import { ComponentProps, useCallback, useState } from "react";
import LoginWithEmail from "src/features/Auth/components/LoginWithEmail/LoginWithEmail";
import LoginWithLightning from "src/features/Auth/components/LoginWithLightning/LoginWithLightning";
import LoginWithNostr from "src/features/Auth/components/LoginWithNostr/LoginWithNostr";
import { useMeQuery } from "src/graphql";
import { trimText } from "src/utils/helperFunctions";
import * as yup from "yup";
import { emailSchema } from "src/utils/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "src/Components/Button/Button";

interface Props extends ModalCard {}

const schema = yup
  .object({
    email: emailSchema.required(),
  })
  .required();

type FormType = yup.InferType<typeof schema>;

export default function SubscribeToNewsletterModal({
  onClose,
  direction,
  ...props
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // dispatch(action)
    onClose?.();
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[442px] rounded-xl relative"
    >
      <div className="p-16 md:p-24">
        <IoClose
          className="absolute text-body2 top-16 right-16 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Subscribe to BOLT🔩FUN Newsletter
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="p-24">
        <p className="font-medium">
          A Newsletter for makers going from 0-1 and building in public!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="text-body5">
            Your Email
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id="email"
              type="email"
              className="input-text"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}

          <Button fullWidth color="primary" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
