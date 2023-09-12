import { Link } from "react-router-dom";
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
        <div className="absolute flex items-center top-12 right-12 gap-x-8">
          <div className="p-8 ml-auto rounded-full backdrop-blur-xl bg-white/[16%] w-max">
            <img src="assets/icons/home-upload-icon.svg" alt="upload icon" />
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
        <div className="absolute backdrop-blur-md rounded-lg bg-white/[2%] bottom-0 left-0 w-full">
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

const VibrantDrawingSVG = () => {
  return (
    <svg
      width="68"
      height="15"
      viewBox="0 0 68 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38867 10.6499C3.69355 11.5294 9.12798 12.4582 10.3851 13.9819"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
      <path
        d="M9.88477 4.28857C10.042 5.90888 14.9059 8.29402 16.6321 9.57265C17.5484 10.2514 18.7476 11.3965 19.3809 12.1642"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
      <path
        d="M28.3789 1.25977C30.7404 4.91735 31.3406 8.74253 32.8771 12.4674"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
      <path
        d="M39.373 12.1646C41.9693 10.7223 41.8518 7.54584 42.8716 5.56794C43.4045 4.53446 44.4055 2.45761 45.8704 1.86572"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
      <path
        d="M49.8691 11.2559C51.4653 9.1061 53.3984 6.32771 56.1166 4.60869C56.9627 4.07363 57.8395 3.08532 58.8655 2.77441"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
      <path
        d="M62.3633 13.6791C62.5517 11.7376 64.4226 9.72304 67.3613 8.83252"
        stroke="#DD1D29"
        stroke-width="1.21471"
        stroke-linecap="round"
      />
    </svg>
  );
};

const FunDrawingSVG = () => {
  return (
    <svg
      width="91"
      height="36"
      viewBox="0 0 91 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3469 20.1655C7.03027 21.0338 2.56243 21.3952 1.67272 24.4508C0.968755 26.8685 1.48033 29.6223 4.26199 31.5125C5.81815 32.5699 7.76306 32.1373 8.81456 31.0124C10.946 28.7321 11.8591 26.3118 11.8591 23.7179C11.8591 22.9841 11.7974 22.2517 11.731 21.5192C11.6959 21.1311 11.6664 20.7428 11.6172 20.3552C11.6041 20.2521 11.6108 20.5622 11.6172 20.6656C11.7373 22.5947 12.041 24.6153 12.7838 26.4943C13.1798 27.4959 13.9902 29.4924 16.0702 29.719C18.4821 29.9818 19.4271 27.8518 20.0537 26.8392"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M20.3105 20.0107C20.6869 23.9513 21.3349 27.845 21.3349 31.7888C21.3349 34.4411 20.6626 26.3849 21.8897 23.839C22.5343 22.5018 24.3619 20.4704 27.1963 20.8385C30.1223 21.2185 30.8538 22.9966 31.5497 24.503C32.1604 25.8248 32.4331 27.1689 32.8586 28.5123C33.0746 29.1947 33.6268 29.8659 33.6268 30.5644"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M46.1727 22.4933C43.754 21.5662 38.3943 19.0498 36.1997 21.5103C33.9146 24.0725 35.6674 27.1935 37.6935 29.5549C39.0066 31.0853 44.1423 32.3777 46.0731 30.6413C49.4755 27.5815 47.9479 24.2897 46.1869 21.0879C45.0472 19.0157 44.124 16.8059 44.124 14.6125C44.124 13.7054 44.3615 16.4224 44.5793 17.3199C44.9835 18.9857 45.5322 20.6362 45.9166 22.3036C46.6128 25.3237 47.7543 28.6916 50.7821 31.1846C51.4396 31.7258 51.9518 32.0046 52.8308 32.271"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M44.0831 14.4748C44.0831 13.5584 43.9531 12.6339 43.9531 11.7075"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M60.5645 13.8707C60.6239 13.7446 63.1795 15.0364 64.0093 14.5196C64.7541 14.0556 65.0585 13.3617 65.8015 12.9114C66.2548 12.6367 67.8589 13.2581 68.2222 13.3628C68.8979 13.5577 70.3239 14.0376 70.992 13.5603C71.5299 13.1762 71.924 12.7093 72.505 12.3472C73.6179 11.6534 74.7893 12.8213 75.6588 13.2429C76.3 13.5538 77.6289 14.0041 78.4868 13.6732C79.0461 13.4575 81.3604 12.3768 80.6631 13.3628C79.342 15.2311 77.9515 17.235 77.9515 19.3299"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M58.6797 14.252C61.0612 14.8705 62.6321 15.9012 64.7081 16.7911C66.5997 17.602 68.3076 18.6012 70.1547 19.4573C70.7554 19.7357 71.1706 19.7117 71.9236 19.6124C74.0388 19.3338 76.0785 18.9325 78.2314 18.7519C81.1664 18.5058 76.3249 18.6151 75.6478 18.7237C74.4841 18.9104 72.296 19.3144 72.296 20.219C72.296 20.7824 75.0585 20.5999 75.6827 20.5999C77.3817 20.5999 76.4049 19.1254 77.3236 18.5686"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M71.6783 20.0711C71.4897 20.7697 71.3561 21.4841 71.0775 22.1725C70.5828 23.3949 69.0103 24.4627 67.9721 25.5198C67.2976 26.2065 66.6166 26.9416 66.1408 27.6914C65.8561 28.1399 65.8359 28.6658 65.6847 29.1347C65.507 29.6858 65.4911 30.2801 65.4314 30.8413C65.374 31.3799 65.6491 31.6721 66.0756 32.1354C66.777 32.8974 67.4811 33.2759 68.8335 33.6095C70.6729 34.0632 72.7747 34.3668 74.7547 34.4737C78.9956 34.7028 84.7273 34.3924 87.1835 32.017C88.7111 30.5396 90.0743 28.7044 90.05 26.9236C90.0372 25.9908 89.3583 25.2207 88.414 24.502C86.5964 23.1186 84.0184 22.2662 81.4505 21.4881C79.8561 21.0049 78.8949 20.2353 77.9325 19.3604"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M79.2377 22.835C76.2693 22.8572 72.8922 23.77 72.2597 25.6865C72.0689 26.2647 72.9104 26.6768 73.8015 26.6912C75.6265 26.7207 79.4151 25.9516 80.7579 27.0158C82.0811 28.0645 79.6929 29.2988 78.3112 29.7007C77.4447 29.9528 76.3662 30.1341 75.4013 29.9859C74.5984 29.8625 73.9708 29.5305 73.2442 29.3103"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M74.1582 22.3608C74.6014 24.1907 74.8572 26.0458 75.0051 27.8929C75.0613 28.5943 75.1319 29.2966 75.2657 29.9943C75.3597 30.4839 75.2227 30.9951 75.5915 31.442"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M76.5 21.9663C76.5 23.8173 76.6995 25.719 77.2021 27.5466C77.5081 28.6593 77.6131 29.7975 78.0635 30.8896"
        stroke="#DD1D29"
        stroke-width="1.11168"
        stroke-linecap="round"
      />
      <path
        d="M18.0938 13.2217C18.5267 11.5281 19.8824 10.2209 21.1393 8.72149C22.4505 7.15736 23.7824 5.53775 25.2 4.01033C25.5093 3.67713 26.8132 0.968081 27.6365 1.28559C29.0677 1.83756 30.2139 2.60557 31.6972 3.10501C34.473 4.0396 37.2185 4.74051 39.6882 5.99675C42.128 7.23776 44.5798 8.40598 47.1425 9.55649C47.7715 9.83886 48.5689 10.3535 49.1584 10.5321"
        stroke="#DD1D29"
        stroke-width="1.09955"
        stroke-linecap="round"
      />
    </svg>
  );
};

export function LandingPage() {
  return (
    <main className="bg-white border border-gray-200 rounded-xl">
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
        <div className="mt-32 text-lg font-bold text-slate-700 leading-7">
          We are community of innovative makers and{" "}
          <div className="relative inline">
            vibrant
            <div className="hidden md:block absolute -left-1 -top-[24px]">
              <VibrantDrawingSVG />
            </div>{" "}
          </div>
          community of innovative makers and{" "}
          <div className="relative inline">
            technologists
            <div className="absolute -top-[4px] left-0">
              <img src="assets/icons/hand-circle-icon.svg" alt="" />
            </div>{" "}
          </div>
          . on our platform visionaries showcase projects, exchange insights,
          and battle it out for&nbsp;
          <div className="relative inline">
            FUN
            <div className="hidden md:block absolute left-[16px] top-[24px]">
              <FunDrawingSVG />
            </div>
          </div>
          &nbsp;at tournaments we host.
        </div>
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
              <Link
                className="block px-32 py-12 mt-32 ml-auto font-medium text-white border w-max rounded-xl text-md border-neutral-200 bg-slate-800"
                to="/topics"
              >
                View topics 🏷
              </Link>
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
                <Link
                  className="block px-32 py-12 font-medium text-white border whitespace-nowrap rounded-xl text-md border-neutral-200 bg-slate-800"
                  to="/tournaments"
                >
                  Explore events
                </Link>
                <a
                  className="px-32 py-12 font-medium border whitespace-nowrap text-slate-600 rounded-xl text-md border-violet-500 bg-slate-100"
                  href="mailto:team@peakshift.com"
                >
                  Host a hackathon
                </a>
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
            <div className="w-full xl:w-1/2">
              <img src="assets/images/hangout.png" className="w-full" alt="" />
            </div>

            <div className="flex flex-col items-end w-full mt-32 xl:w-1/2 xl:mt-0">
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
                <Link
                  className="block px-32 py-12 font-medium text-white border whitespace-nowrap rounded-xl text-md border-neutral-200 bg-slate-800"
                  to="/hangout"
                >
                  Check it out
                </Link>
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
