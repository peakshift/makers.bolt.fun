import React from "react";
import { FaDiscord } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { openModal } from "src/redux/features/modals.slice";
import { useCountdown } from "src/utils/hooks";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { twMerge } from "tailwind-merge";

interface Props {
  start_date: string;
  makers_count: number;
  avatars: string[];
  isRegistered: boolean;
  isRegistrationOpen?: boolean;
  partners: { link: string; image: string; isPrimary?: boolean }[];
}

export default function RegisterCard({
  makers_count,
  start_date,
  avatars,
  isRegistered,
  isRegistrationOpen,
  partners,
}: Props) {
  const counter = useCountdown(start_date);
  const { id: tournamentId } = useParams();

  const isLoggedIn = useAppSelector((state) => !!state.user.me);
  const dispatch = useAppDispatch();

  const onRegister = () => {
    if (!tournamentId) return;

    if (isLoggedIn)
      dispatch(
        openModal({
          Modal: "RegisterTournamet_ConfrimAccount",
          props: {
            tournamentId: Number(tournamentId),
          },
        })
      );
    else
      dispatch(
        openModal({
          Modal: "RegisterTournamet_Login",
          props: {
            tournamentId: Number(tournamentId),
          },
        })
      );
  };

  return (
    <Card onlyMd className="flex flex-col gap-24 md:!border">
      <div>
        {makers_count > 2 && (
          <div className="text-body5 text-gray-600 flex mb-16">
            {avatars.map((img, idx) => (
              <div key={idx} className="w-[16px] h-32 relative">
                <Avatar
                  src={img}
                  width={32}
                  className="absolute top-0 left-0 min-w-[32px] !border-white"
                />
              </div>
            ))}
            <span className="self-center ml-24 font-medium ">
              + {makers_count} makers
            </span>
          </div>
        )}
        {isRegistrationOpen && (
          <Button
            color={isRegistered ? "gray" : "primary"}
            disabled={isRegistered}
            fullWidth
            onClick={onRegister}
          >
            {isRegistered ? "Registered!" : "Register Now"}
          </Button>
        )}
        {
          <Button
            color={"gray"}
            href={"https://discord.gg/HFqtxavb7x"}
            newTab
            fullWidth
            className="mt-8 !text-primary-500"
          >
            <span className="align-middle ml-4">Join the chat</span>
          </Button>
        }
      </div>
      {isRegistrationOpen && (
        <div>
          <p className="text-body5 text-gray-900 font-medium">Starts in</p>
          {counter.isExpired ? (
            <div className="p-10 border border-green-200 rounded-10 flex items-center gap-10 mt-16 text-green-500">
              <span>&#8226;</span>
              <span className="font-medium text-body5">Live</span>
              <span className="font-medium text-body6 text-gray-500 ml-auto">
                entries close Nov 24
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-10 mt-12">
                <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                  {counter.days}d
                </div>
                <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                  {counter.hours}h
                </div>
                <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                  {counter.minutes}m
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <div>
        <p className="text-body5 text-gray-900 font-medium">
          Sponsors & collaborators
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-y-16 gap-x-10 mt-16">
          {partners.map((p, idx) => (
            <a
              className={twMerge(
                "aspect-square rounded-16 overflow-hidden border border-gray-200",
                p.isPrimary && "col-[1/-1] aspect-auto rounded-0 border-none"
              )}
              key={idx}
              href={p.link}
            >
              <img
                src={p.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
