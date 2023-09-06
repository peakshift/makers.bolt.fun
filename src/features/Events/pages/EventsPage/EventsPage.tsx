type EventCardProps = {
  type: string;
  title: string;
  description: string;
  date: Date;
};

export function EventCard({ type, title, description }: EventCardProps) {
  return (
    <div className="h-[300px] w-full flex flex-col justify-between bg-gradient-to-r from-indigo-500 to-gray-900 rounded-xl">
      <div className="flex justify-between p-16">
        <div className="text-xs text-white font-semibold py-4 px-8 bg-white/[16%] rounded-lg flex items-center justify-center">
          NOV 3
        </div>
        <button>
          <img src="assets/icons/upload-icon.svg" alt="upload-icon" />
        </button>
      </div>

      <div className="w-full backdrop-blur-lg bg-white/[2%]">
        <div className="p-16">
          <p className="text-xs font-semibold text-white">{type}</p>
          <p className="mt-4 font-semibold text-white">{title}</p>
          <p className="mt-4 text-sm text-gray-200">{description}</p>
        </div>
        <div className="h-px w-full bg-white/[8%]" />
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

export function EventsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Upcoming Tournaments</h1>
      <div className="flex mt-16 gap-x-20">
        <EventCard
          type="🏆 TOURNAMENT"
          title="Legends Of Lightning II"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
          date={new Date()}
        />
        <EventCard
          type="🏆 TOURNAMENT"
          title="Nostrasia Hackathon"
          description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
          date={new Date()}
        />
      </div>
    </main>
  );
}
