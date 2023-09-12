import { JoinTheCommunityCard } from "../Home/pages/LandingPage/LandingPage";

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
  className?: string;
};

function EventCard({ imgSrc, type, title, className = "" }: EventCardProps) {
  return (
    <div
      className={
        "h-[400px] w-[240px] md:h-[240px] md:w-[140px] lg:h-[240px] lg:w-[160px] xl:h-[400px] xl:w-[240px] shadow-lg rounded-lg " +
        className
      }
    >
      <div className="relative w-full h-full">
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
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-md bg-white/[2%]" />
            <div className="relative z-10 w-full">
              <div className="p-12">
                <p className="text-[10px] font-medium text-slate-200">{type}</p>
                <p className="mt-4 text-sm font-medium text-white">{title}</p>
              </div>
              <div className="h-px mx-auto w-[calc(100%-32px)] bg-white/[8%]" />
              <div className="flex items-center p-12 gap-x-8">
                <div className="w-[6px] h-[6px] rounded-full bg-amber-500" />
                <p className="text-sm font-medium text-amber-500">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipStack() {
  return (
    <div className="flex flex-col overflow-x-hidden w-min gap-y-16">
      <div className="flex -ml-[94px] gap-x-12">
        <div className="hidden sm:block">
          <Chip>📡 #LNC-web</Chip>
        </div>
        <div className="hidden [@media(min-width:400px)]:block">
          <Chip>🎛 #LNURL</Chip>
        </div>
        <Chip>🟦 #Nostr</Chip>
        <Chip>💯 #100DaysOfBitcoin</Chip>
      </div>
      <div className="flex -ml-20 gap-x-12">
        <div className="hidden sm:block">
          <Chip>🟨 #LND</Chip>
        </div>
        <div className="hidden [@media(min-width:400px)]:block">
          <Chip>🛰 #CLN</Chip>
        </div>
        <Chip>🍠 #Taro</Chip>
        <Chip>🔩 #BOLTs</Chip>
      </div>
      <div className="flex -ml-4 gap-x-12">
        <div className="hidden sm:block">
          <Chip>🚦 #Activity</Chip>
        </div>
        <div className="hidden [@media(min-width:400px)]:block">
          <Chip>🎨 #Design</Chip>
        </div>
        <Chip>✋ #Get-Help</Chip>
      </div>
      <div className="flex ml-4 gap-x-12">
        <div className="hidden sm:block">
          <Chip>👋 #Intros</Chip>
        </div>
        <div className="hidden [@media(min-width:400px)]:block">
          <Chip>🗿 #Milestones</Chip>
        </div>
        <Chip>🌩 #Brainstorm</Chip>
      </div>
      <div className="flex -ml-80 gap-x-12">
        <div className="hidden sm:block">
          <Chip>💬 #Discussion</Chip>
        </div>
        <div className="hidden [@media(min-width:400px)]:block">
          <Chip>🪙 #LSATs</Chip>
        </div>
        <Chip>⏩ #Growth-Hacking</Chip>
        <Chip>🌊 #LSPs</Chip>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <main className="bg-white rounded-xl">
      <div className="relative">
        <img
          className="w-full rounded-xl"
          src="assets/images/landing-page-bg.png"
          alt=""
        />
        <div className="absolute top-1/4 text-center -translate-y-[35%] left-1/2 -translate-x-1/2 uppercase text-[#212649] text-2xl xs:text-3xl sm:!text-5xl md:!text-6xl font-black">
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
      <div className="relative w-full">
        <div className="px-20 mx-auto xl:max-w-5xl">
          <div className="flex items-center justify-end w-full mt-32 md:flex-row py-80">
            <div className="absolute left-0 hidden top-26 lg:block">
              <ChipStack />
            </div>
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
          <div className="block lg:hidden">
            <ChipStack />
          </div>

          <div className="flex flex-col items-center justify-between w-full md:flex-row py-28">
            <div>
              <div className="p-8 rounded-lg bg-slate-800 w-max">
                <img src="assets/icons/target.svg" alt="target icon" />
              </div>

              <p className="bg-gradient-to-r from-[#1571EC] mt-12 to-violet-400 text-[40px] bg-clip-text text-transparent font-extrabold">
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
              <div className="flex flex-col items-start mt-32 md:items-center gap-y-8 md:gap-y-0 md:gap-x-12 md:flex-row">
                <button className="px-32 py-12 font-medium text-white border whitespace-nowrap rounded-xl text-md border-neutral-200 bg-slate-800">
                  Explore events
                </button>
                <button className="px-32 py-12 font-medium border whitespace-nowrap text-slate-600 rounded-xl text-md border-violet-500 bg-slate-100">
                  Host a hackathon
                </button>
              </div>
            </div>
            <div className="relative flex justify-end mt-32 ml-[125px] md:mt-0">
              <EventCard
                imgSrc="assets/images/legends-of-lightning.png"
                className="scale-[78%] z-[5]"
                type="🏆  TOURNAMENT"
                title="Ai4ALL"
              />

              <div className="absolute top-0 z-10 right-52 xl:right-64">
                <div className="relative">
                  <EventCard
                    imgSrc="assets/images/ai4all.png"
                    className="absolute top-0 z-10 right-52 xl:right-64"
                    type="🏆  TOURNAMENT"
                    title="Ai4ALL"
                  />

                  <EventCard
                    imgSrc="assets/images/nostr-hack-week.png"
                    className="scale-[90%]"
                    type="🏆  TOURNAMENT"
                    title="Ai4ALL"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between xl:flex-row py-28">
            <img
              src="assets/images/hangout.png"
              className="h-full xl:h-[360px] 2xl:h-[400px]"
              alt=""
            />

            <div className="flex flex-col items-end w-full mt-32 xl:mt-0">
              <div className="p-8 rounded-lg bg-slate-800 w-max">
                <img src="assets/icons/video-icon.svg" alt="target icon" />
              </div>

              <p className="bg-gradient-to-r whitespace-nowrap from-[#1571EC] mt-12 to-violet-400 text-[40px] bg-clip-text text-transparent font-extrabold">
                Hangout live
              </p>
              <p className="mt-16 text-lg text-right font-medium max-w-[400px] text-slate-600 text-wrap">
                Join other makers in our new virtual hangout space. Discuss
                popular topics, collaborate, and more!
              </p>
              <div className="flex items-center mt-32">
                <button className="px-32 py-12 font-medium text-white border whitespace-nowrap rounded-xl text-md border-neutral-200 bg-slate-800">
                  Check it out
                </button>
              </div>
            </div>
          </div>

          <div className="py-28">
            <JoinTheCommunityCard />
          </div>
        </div>
      </div>
    </main>
  );
}
