function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-16 py-12 border whitespace-nowrap w-min rounded-xl bg-slate-100 border-slate-200">
      {children}
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
      <div className="flex items-center justify-between mt-32 py-80">
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
        <div className="text-right mr-36">
          <p className="bg-gradient-to-r from-[#1571EC] to-violet-400 text-[40px] bg-clip-text text-transparent font-extrabold">
            Discuss + Learn
          </p>
          <p className="mt-16 text-lg font-medium text-right max-w-[400px] text-slate-600 text-wrap">
            Begin your bitcoin journey by exploring a range of community topics
            and discussions. Discover guides, tutorials, and challenges!
          </p>
          <button className="px-32 py-12 mt-32 font-medium text-white border rounded-xl text-md border-neutral-200 bg-slate-800">
            View topics 🏷
          </button>
        </div>
      </div>
    </main>
  );
}
