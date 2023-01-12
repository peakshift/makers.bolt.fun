import React from "react";
import { FaDiscord } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { openModal } from "src/redux/features/modals.slice";
import { useCountdown } from "src/utils/hooks";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

interface Props {
  start_date: string;
  makers_count: number;
  avatars: string[];
  isRegistered: boolean;
}

export default function RegisterCard({
  makers_count,
  start_date,
  avatars,
  isRegistered,
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
        {/* <Button color={isRegistered ? 'gray' : "primary"} disabled={isRegistered} fullWidth onClick={onRegister}>{isRegistered ? "Registered!" : "Register Now"}</Button> */}
        <Button
          color={"gray"}
          href={"https://discord.gg/HFqtxavb7x"}
          newTab
          fullWidth
          className="mt-8 !text-primary-500"
        >
          <FaDiscord />{" "}
          <span className="align-middle ml-4">Join the Discord</span>
        </Button>
      </div>
      {/* <div>
                <p className="text-body5 text-gray-900 font-medium">
                    Tournament starts in
                </p>
                {counter.isExpired ?
                    <div className="p-10 border border-green-200 rounded-10 flex items-center gap-10 mt-16 text-green-500">
                        <span>&#8226;</span>
                        <span className='font-medium text-body5'>Live</span>
                        <span className='font-medium text-body6 text-gray-500 ml-auto'>entries close Nov 24</span>

                    </div>
                    :
                    <>
                        <div className="grid grid-cols-3 gap-10 mt-16">
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
                }
            </div> */}
      <div>
        <p className="text-body5 text-gray-900 font-medium">
          Sponsors & collaborators
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-y-16 gap-x-10 mt-16">
          {partners.map((p, idx) => (
            <a
              className="first-of-type:col-[1/-1] first-of-type:aspect-auto aspect-square rounded-16 first-of-type:rounded-0 overflow-hidden border first-of-type:border-none border-gray-200 "
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

const partners = [
  {
    link: "https://fulgur.ventures/",
    image: "https://i.ibb.co/7zhq234/fulgur.png",
  },
  {
    link: "https://peakshift.com/",
    image: "https://i.ibb.co/nPJVd7s/ps.png",
  },
  {
    link: "https://www.afrobitcoin.org/",
    image: "https://i.ibb.co/qDZYrGz/Screenshot-2022-09-14-at-17-03-47.jpg",
  },
  {
    link: "https://bitcoin.design/",
    image: "https://i.ibb.co/cgY6zy2/bitcoin-design.jpg",
  },
  {
    link: "https://voltage.cloud/",
    image: "https://i.ibb.co/vd6mQfg/voltage.png",
  },
  {
    link: "https://lightning.engineering/",
    image: "https://i.ibb.co/x34whhN/lightning.png",
  },
  {
    link: "https://galoy.io",
    image: "https://i.ibb.co/xCcT4Hw/galoy2.jpg",
  },
  {
    link: "https://breez.technology/",
    image: "https://i.ibb.co/6stx8tC/breez.webp",
  },
  {
    link: "https://www.getmash.com",
    image: "https://i.ibb.co/fxNh5v3/mash-logo.png",
  },
  {
    link: "https://2022.tabconf.com/",
    image: "https://i.ibb.co/zFGVqvV/tab-conf.jpg",
  },
  {
    link: "https://geyser.fund/",
    image: "https://i.ibb.co/tp6L5bt/geyser.jpg",
  },
  {
    link: "https://opensats.org/",
    image: "https://i.ibb.co/b5y29TL/open-sats.jpg",
  },
  {
    link: "https://adoptingbitcoin.org/2022/",
    image: "https://i.ibb.co/HdvRbxQ/Screenshot-2022-09-14-at-17-06-33.jpg",
  },
];
