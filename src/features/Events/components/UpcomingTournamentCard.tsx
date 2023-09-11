import { Link } from "react-router-dom";

type UpcomingTournamentCardProps = {
  type: string;
  title: string;
  imageSrc: string;
  date: string;
  organizerImageSrc: string;
  linkTo: string;
};

export function UpcomingTournamentCard({
  type,
  title,
  imageSrc,
  date,
  organizerImageSrc,
  linkTo,
}: UpcomingTournamentCardProps) {
  return (
    <div className="relative flex flex-col justify-between w-full overflow-hidden rounded-xl">
      <img
        src={imageSrc}
        className="absolute top-0 left-0 object-cover w-full h-full overflow-hidden rounded-xl"
        alt=""
      />
      <div className="relative flex justify-between p-16 z-5">
        <div className="text-xs text-white backdrop-blur-md font-medium py-4 px-8 bg-white/[16%] rounded-lg flex items-center justify-center">
          {date}
        </div>
        <button>
          <img src="assets/icons/upload-icon.svg" alt="upload-icon" />
        </button>
      </div>

      <div className="w-full backdrop-blur-sm  bg-[#000000]/[20%] mt-64">
        <div className="p-16">
          <p className="text-xs font-medium text-white">{type}</p>
          <p className="mt-4 font-medium text-white">{title}</p>
        </div>
        <div className="h-px  w-[calc(100%-32px)] bg-white/[8%]" />
        <div className="flex justify-between p-16">
          <div className="flex items-center">
            <img
              src="assets/images/events-avatar.png"
              alt="Bolt Fun logo"
              className="w-40 h-40"
            />
            <img
              src={organizerImageSrc}
              alt="Co-organizer logo"
              className="w-40 h-40 -ml-[14px] border-2 border-slate-800 rounded-xl"
            />
            <p className="ml-12 text-sm text-white">Organizers</p>
          </div>
          <Link
            className="py-12 text-xs font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600 transition px-36"
            to={linkTo}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
