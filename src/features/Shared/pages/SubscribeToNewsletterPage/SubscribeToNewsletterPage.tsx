import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import ChooseLoginMethods from "src/features/Auth/components/ChooseLoginMethods/ChooseLoginMethods";
import { ComponentProps, CSSProperties, useCallback, useState } from "react";
import LoginWithEmail from "src/features/Auth/components/LoginWithEmail/LoginWithEmail";
import LoginWithLightning from "src/features/Auth/components/LoginWithLightning/LoginWithLightning";
import LoginWithNostr from "src/features/Auth/components/LoginWithNostr/LoginWithNostr";
import { useMeQuery, useSubscribeToNewsletterMutation } from "src/graphql";
import {
  delay,
  extractErrorMessage,
  randomItem,
  trimText,
} from "src/utils/helperFunctions";
import * as yup from "yup";
import { emailSchema } from "src/utils/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import OgTags from "src/Components/OgTags/OgTags";
import { NotificationsService } from "src/services";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";

interface Props {}

const schema = yup
  .object({
    email: emailSchema.required(),
  })
  .required();

type FormType = yup.InferType<typeof schema>;

const trianglesColors = [
  "#FDE68A",
  "#7C3AED",
  "#C4B5FD",
  "#FBCFE8",
  "#CBD5E1",
  "#BFDBFE",
  "#F1F5F9",
];

const NUM_TRIANGLES = 20;

const generatedTriangles = Array(NUM_TRIANGLES)
  .fill(0)
  .map((_, i) => {
    const color = randomItem(...trianglesColors);
    const position = [Math.random(), Math.random()];
    const rotation = Math.random() * 360;
    const scale = 1 + Math.random();
    const blur = Math.floor(Math.random() * 5);
    const animationDuration = Math.floor(Math.random() * 10) + 10;

    return {
      color,
      position,
      rotation,
      scale,
      blur,
      animationDuration,
    };
  });

export default function SubscribeToNewsletterPage({ ...props }: Props) {
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
  const navigate = useNavigate();

  const [mutate, { loading }] = useSubscribeToNewsletterMutation();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (loading) return;
    try {
      await mutate({ variables: { email: data.email } });
      NotificationsService.success("Subscribed to newsletter successfully!");
      await delay(1000);
      navigate(PAGES_ROUTES.blog.feed);
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ??
          "Something went wrong on our side, please try again."
      );
    }
  };

  return (
    <div className="relative">
      <OgTags title="Subscribe to BOLT🔩FUN Newsletter! 💌" />
      <div className="absolute inset-0 bg-gray-900 -z-10 overflow-hidden">
        {generatedTriangles.map((triangle, i) => (
          <div
            style={
              {
                top: `${triangle.position[0] * 100}%`,
                left: `${triangle.position[1] * 100}%`,
                transform: `rotate(${triangle.rotation}deg) scale(${triangle.scale})`,
                "--color": triangle.color,
                filter: `blur(${triangle.blur}px)`,
              } as CSSProperties
            }
            className="absolute"
          >
            <motion.div
              initial={{ y: 0, rotateX: 0 }}
              animate={{ y: 100, rotateZ: 180 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: triangle.animationDuration,
                ease: "easeInOut",
              }}
              className="border-[20px] border-x-transparent border-t-transparent border-[var(--color)]"
            ></motion.div>
          </div>
        ))}
      </div>
      <div className={`page-container !p-0`}>
        <div className="min-h-[100dvh] flex flex-col justify-center items-center">
          <Card className="max-w-[520px]">
            <div className="p-16 md:p-24 text-center">
              <h2 className="text-h3 font-bold">
                Subscribe to BOLT🔩FUN Newsletter! 💌
              </h2>
            </div>
            <div className="p-24 flex flex-col gap-16 ">
              <p className="font-medium">
                A Newsletter for makers going from 0-1 and building in public!
              </p>
              <p className="text-gray-600">
                No spam, ever. You can unsubscribe at any time. & we will never
                share your email address with anyone else.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
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

                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  className="mt-16"
                  isLoading={loading}
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
