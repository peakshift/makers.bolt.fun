function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-16 py-12 border whitespace-nowrap w-min rounded-xl bg-slate-100 border-slate-200">
      {children}
    </div>
  );
}

type EventCardProps = {
  imgSrc: string;
  type: string;
  title: string;
  description: string;
  className?: string;
};

function EventCard({
  imgSrc,
  type,
  title,
  description,
  className = "",
}: EventCardProps) {
  return (
    <div
      className={
        "relative h-[400px] w-[240px] shadow-lg rounded-lg " + className
      }
    >
      <div className="absolute flex top-12 right-12 gap-x-8">
        <div className="p-8 ml-auto rounded-full backdrop-blur-xl bg-white/[16%] w-max">
          <img src="assets/icons/upload-icon.svg" alt="upload icon" />
        </div>
        <div className="p-8 ml-auto rounded-full backdrop-blur-xl bg-white/[16%] w-max">
          <img src="assets/icons/close-icon.svg" alt="close icon" />
        </div>
      </div>

      <img
        src={imgSrc}
        className="object-cover w-full h-full rounded-lg"
        alt=""
      />
      <div className="absolute bottom-0 left-0 w-full backdrop-blur-md bg-white/[2%]">
        <div className="p-12">
          <p className="text-[10px] font-medium text-slate-200">{type}</p>
          <p className="mt-4 text-sm font-medium text-white">{title}</p>
          <p className="mt-4 text-[10px] text-slate-200">{description}</p>
        </div>
        <div className="h-px w-[calc(100%-32px)] bg-white/[8%]" />
        <div className="flex items-center p-12 gap-x-8">
          <div className="w-[6px] h-[6px] rounded-full bg-amber-500" />
          <p className="text-sm font-medium text-amber-500">Completed</p>
        </div>
      </div>
    </div>
  );
}

function ChipStack() {
  return (
    <div className="flex flex-col overflow-x-hidden w-min gap-y-16">
      <div className="flex -ml-[94px] gap-x-12">
        <Chip>📡 #LNC-web</Chip>
        <Chip>🎛 #LNURL</Chip>
        <Chip>🟦 #Nostr</Chip>
        <Chip>💯 #100DaysOfBitcoin</Chip>
      </div>
      <div className="flex -ml-20 gap-x-12">
        <Chip>🟨 #LND</Chip>
        <Chip>🛰 #CLN</Chip>
        <Chip>🍠 #Taro</Chip>
        <Chip>🔩 #BOLTs</Chip>
      </div>
      <div className="flex -ml-4 gap-x-12">
        <Chip>🚦 #Activity</Chip>
        <Chip>🎨 #Design</Chip>
        <Chip>✋ #Get-Help</Chip>
      </div>
      <div className="flex ml-4 gap-x-12">
        <Chip>👋 #Intros</Chip>
        <Chip>🗿 #Milestones</Chip>
        <Chip>🌩 #Brainstorm</Chip>
      </div>
      <div className="flex -ml-80 gap-x-12">
        <Chip>💬 #Discussion</Chip>
        <Chip>🪙 #LSATs</Chip>
        <Chip>⏩ #Growth-Hacking</Chip>
        <Chip>🌊 #LSPs</Chip>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <main>
      <div className="relative">
        <img
          className="w-full rounded-xl h-[580px]"
          src="assets/images/landing-page-bg.png"
          alt=""
        />
        <div className="absolute top-1/4 text-center -translate-y-[35%] left-1/2 -translate-x-1/2 uppercase text-[#212649] text-6xl font-black">
          <h1>this fall...</h1>
          <h1 className="whitespace-nowrap"> fun is mandatory!</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black uppercase text-slate-700 mt-[58px]">
          welcome to the place for makers to nurture ideas, stay ahead, and
          accelarate ventures together
        </h2>
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <p className="mt-32 text-lg font-bold text-slate-700 leading-7">
          We are vibrant community of innovative makers and technologists. on
          our platform visionaries showcase projects, exchange insights, and
          battle it out for FUN at tournaments we host.
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mt-32 py-80">
          <ChipStack />
          <div className="text-right">
            <div className="p-8 ml-auto rounded-lg bg-slate-800 w-max">
              <img src="assets/icons/message-square.svg" alt="message icon" />
            </div>

            <p className="bg-gradient-to-r from-[#1571EC] mt-12 to-violet-400 text-[40px] bg-clip-text text-transparent font-extrabold">
              Discuss + Learn
            </p>
            <p className="mt-16 text-lg font-medium text-right max-w-[400px] text-slate-600 text-wrap">
              Begin your bitcoin journey by exploring a range of community
              topics and discussions. Discover guides, tutorials, and
              challenges!
            </p>
            <button className="px-32 py-12 mt-32 font-medium text-white border rounded-xl text-md border-neutral-200 bg-slate-800">
              View topics 🏷
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-28">
          <div>
            <div className="p-8 rounded-lg bg-slate-800 w-max">
              <img src="assets/icons/target.svg" alt="target icon" />
            </div>

            <p className="bg-gradient-to-r whitespace-nowrap from-[#1571EC] mt-12 to-violet-400 text-[40px] bg-clip-text text-transparent font-extrabold">
              Attend + Compete
            </p>
            <p className="mt-16 text-lg font-medium max-w-[400px] text-slate-600 text-wrap">
              Explore a range of community events and compete for maker
              supremacy!
            </p>
            <div className="flex items-center mt-20 text-xs font-medium text-neutral-600 gap-x-24">
              <p>Hackathons 🍕</p>
              <p>Workshops 🛠</p>
              <p>Conferences 🤝</p>
            </div>
            <div className="flex items-center mt-32">
              <button className="px-32 py-12 font-medium text-white border whitespace-nowrap rounded-xl text-md border-neutral-200 bg-slate-800">
                Explore events
              </button>
              <button className="px-32 py-12 ml-12 font-medium border whitespace-nowrap text-slate-600 rounded-xl text-md border-violet-500 bg-slate-100">
                Host a hackathon
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <EventCard
              imgSrc="assets/images/ai4all.png"
              className="z-10"
              type="🏆  TOURNAMENT"
              title="Ai4ALL"
              description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
            />
            <EventCard
              imgSrc="assets/images/nostr-hack-week.png"
              className="-ml-[18%] scale-[90%] z-[5]"
              type="🏆  TOURNAMENT"
              title="Ai4ALL"
              description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
            />

            <EventCard
              imgSrc="assets/images/legends-of-lightning.png"
              className="-ml-[20%] scale-[78%] z-0"
              type="🏆  TOURNAMENT"
              title="Ai4ALL"
              description="Lorem ipsum dolor sit amet consectetur. Consectetur auctor olor sit amet consectetur. "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
