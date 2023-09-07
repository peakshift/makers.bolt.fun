type UpcomingTournamentCardProps = {
  type: string;
  title: string;
  description: string;
  imageSrc: string;
  date: string;
};

export function UpcomingTournamentCard({
  type,
  title,
  description,
  imageSrc,
  date,
}: UpcomingTournamentCardProps) {
  return (
    <div className="relative flex flex-col justify-between w-full overflow-hidden rounded-xl">
      <img
        src={imageSrc}
        className="absolute top-0 left-0 object-cover w-full h-full overflow-hidden rounded-xl"
        alt=""
      />
      <div className="relative flex justify-between p-16 z-5">
        <div className="text-xs text-white backdrop-blur-sm font-medium py-4 px-8 bg-white/[16%] rounded-lg flex items-center justify-center">
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
          <p className="mt-4 text-sm text-gray-200">{description}</p>
        </div>
        <div className="h-px  w-[calc(100%-32px)] bg-white/[8%]" />
        <div className="flex justify-between p-16">
          <div className="flex">
            <img
              src="assets/images/events-avatar.png"
              alt="Bolt Fun logo"
              className="w-40 h-40"
            />
            <div className="flex flex-col justify-between ml-12">
              <p className="text-sm font-semibold text-white">BOLT🔩FUN</p>
              <p className="text-xs text-gray-200">Organiser</p>
            </div>
          </div>
          <button className="py-12 text-xs font-semibold text-white rounded-lg bg-violet-500 px-36">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
