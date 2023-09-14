import { Link } from "react-router-dom";

type CompletedTournamentCardProps = {
  title: string;
  imageSrc: string;
  date: string;
  emoji: string;
  linkTo: string;
};

export function CompletedTournamentCard({
  title,
  imageSrc,
  date,
  emoji,
  linkTo,
}: CompletedTournamentCardProps) {
  return (
    <Link
      to={linkTo}
      className="flex flex-col p-8 hover:bg-slate-100 rounded-2xl"
    >
      <div className="relative">
        <img
          className="w-full h-[160px] object-cover rounded-xl"
          src={imageSrc}
          alt=""
        />
        <div className="absolute top-0 left-0 flex justify-between w-full p-16">
          <div className="text-xs text-white font-medium py-4 px-8 bg-white/[16%] backdrop-blur-sm rounded-lg flex items-center justify-center">
            {date}
          </div>
          <div className="text-xs text-white font-medium py-4 px-8 bg-white/[16%] rounded-lg flex items-center justify-center">
            {emoji}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        {/* <p className="mt-8 text-xs font-medium text-slate-600">Hosted by</p> */}
        {/* <div className="flex mt-8 gap-x-4"> */}
        {/*   <Avatar */}
        {/*     width={24} */}
        {/*     src="https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/943e12c7-603e-4432-a939-d06a01df0d00/public" */}
        {/*   /> */}
        {/*   <Avatar */}
        {/*     width={24} */}
        {/*     src="https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/943e12c7-603e-4432-a939-d06a01df0d00/public" */}
        {/*   /> */}
        {/* </div> */}
      </div>
    </Link>
  );
}
