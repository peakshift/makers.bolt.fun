import OgTags from "src/Components/OgTags/OgTags";
import FeedTagsFilter from "src/features/Posts/pages/FeedPage/PopularTagsFilter/FeedTagsFilter";
import Card from "src/Components/Card/Card";
import BgImage from "./assets/bg.png";
import HangoutImage from "./assets/hangout.jpg";
import EventsImage from "./assets/events.png";
import PerksImage from "./assets/perks.png";
import CirclesImage from "./assets/circles.svg";
import { FiSmile, FiTarget, FiUsers } from "react-icons/fi";
import ApplyForm from "./Components/ApplyForm";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "./foundersLandingPage.loader";
import InvitationStatusCard from "./Components/InvitationStatusCard";

export default function LandingPage() {
  const loaderData = useLoaderData() as LoaderData;

  const invitationStatus = loaderData?.isClubInvitationValid;

  const showInvitationCard =
    invitationStatus != null && !loaderData?.me?.is_in_founders_club;

  return (
    <>
      <OgTags
        title="Founders Club"
        description="The Founders Club is an exclusive space on BOLT.FUN that offers a safe and supportive environment for makers to pitch their ideas, connect, learn and share their experiences. "
      />
      <div className={`page-container bg-gray-50 rounded-16`}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-16">
          <aside className="hidden lg:block no-scrollbar">
            <div className="md:overflow-y-scroll sticky-side-element flex flex-col gap-16 md:gap-24">
              <h1 className={`md:block text-h3 font-bolder order-1`}>
                ✍️ Stories
              </h1>
              <div className="order-2 md:order-3">
                <Card onlyMd>
                  <FeedTagsFilter />
                </Card>
              </div>
            </div>
          </aside>
          <main
            className="relative isolate md:col-span-3 bg-white rounded
          grid grid-cols-[24px_1fr_24px] md:grid-cols-[80px_1fr_80px]
          max-md:-mx-16 py-80"
          >
            {loaderData?.me?.is_in_founders_club && (
              <div className="bg-primary-500 text-white absolute inset-x-0 top-0 z-10 px-16 py-4 font-bold text-center rounded-t-16">
                You are a valuable member of the Founders Club! ✨
              </div>
            )}
            <div className="col-start-2 col-end-3 flex flex-col gap-y-[160px]">
              <div className="absolute w-full inset-x-0 top-0 ">
                <img src={BgImage} alt="" className="w-full" />
                <div className="bg-gray-50 absolute inset-0 bg-opacity-40 xl:bg-opacity-10"></div>
              </div>
              <header className="relative md:py-80">
                <div className="flex flex-wrap gap-16 gap-y-32 justify-between items-center">
                  <div
                    className={`grow basis-[440px] max-md:text-center ${
                      !showInvitationCard &&
                      "flex flex-col items-center text-center"
                    }`}
                  >
                    <h1 className="text-h1 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                      Founders Club
                    </h1>
                    <p className="text-body2 font-medium mb-8 text-gray-700 max-w-[50ch]">
                      The Founders Club is an exclusive space on BOLT.FUN that
                      offers a safe and supportive environment for makers to
                      pitch their ideas, connect, learn and share their
                      experiences.
                    </p>
                  </div>
                  {showInvitationCard && (
                    <InvitationStatusCard status={invitationStatus!} />
                  )}
                </div>
              </header>
              <section className="relative">
                <h2 className="text-h2 text-center font-bolder mb-24">
                  What's Inside
                  <img
                    src={CirclesImage}
                    alt=""
                    className="absolute -translate-y-1/2 -z-10"
                  />
                </h2>
                <p className="text-body2 text-center">
                  As a small startup trying to figure out product market fit
                  ourself, we’ve created The Founders Club so we could be
                  amongst cool people building sustainable businesses on bitcoin
                  to learn from.
                </p>
                <ul className="flex flex-wrap justify-between gap-24 mt-64">
                  <li className="bg-gray-100 p-24 rounded basis-[240px] grow flex flex-col gap-8">
                    <p className="text-body1">🙌</p>
                    <p className="text-body2 font-bolder text-gray-700">
                      Networking
                    </p>
                    <p className="text-gray-700">
                      We only invite founders who are serious about starting
                      their business, are interested in engineering, design and
                      entrepreneurship, meeting investors, and getting feedback
                      from mentors.
                    </p>
                  </li>{" "}
                  <li className="bg-gray-100 p-24 rounded basis-[240px] grow flex flex-col gap-8">
                    <p className="text-body1">🧪</p>
                    <p className="text-body2 font-bolder text-gray-700">
                      Missions
                    </p>
                    <p className="text-gray-700">
                      Every few months we’ll be having missions for members of
                      the founders club. Our first mission is to encourage you
                      to think about your pitch which is important because
                      presenting your product increases interest and exposure,
                      which can help to drive growth.
                    </p>
                  </li>{" "}
                  <li className="bg-gray-100 p-24 rounded basis-[240px] grow flex flex-col gap-8">
                    <p className="text-body1">⚡️</p>
                    <p className="text-body2 font-bolder text-gray-700">
                      Deals+perks
                    </p>
                    <p className="text-gray-700">
                      It’s costly to run a company, especially when you’re
                      bootstrapping in the beginning. We gathered discounts on
                      startup tools so you lower your operating costs.
                    </p>
                  </li>
                </ul>
              </section>
              <section>
                <div className="bg-gray-900 rounded p-48 text-center">
                  <h2 className="text-h2 font-bolder text-center mb-24 text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                    Why should you care?
                  </h2>
                  <p className="text-white text-body3">
                    New businesses are important for growth of any industry or
                    economy, you might want to be the next unicorn, or to just
                    be your own boss, and cover living expenses. Whatever the
                    reason, only the brave few or silly embark on this journey.
                    Since it can get lonely, and the path may be unclear, why
                    not support each other, and learn from one another.
                  </p>
                </div>
              </section>
              <section>
                <div className="grid md:grid-cols-2 gap-24 items-center">
                  <img src={HangoutImage} alt="" className="max-md:order-2" />
                  <div className="md:text-right flex flex-col gap-24 md:items-end">
                    <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1">
                      <FiUsers />
                    </span>
                    <h2 className="text-h1 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                      Meet bitcoin founders
                    </h2>
                    <p className="text-body3 font-medium text-gray-700">
                      There’s one rule of the Founders club. You do not talk
                      about the founders club, oh and you have to have started,
                      or want to start a company, or have a burning desire to
                      create something amazing. If you have an idea that you
                      want to share with the world, then you're the perfect fit
                      for our community.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid md:grid-cols-2 gap-y-24 gap-x-48 items-center">
                  <div className="flex flex-col gap-24">
                    <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1">
                      <FiTarget />
                    </span>
                    <h2 className="text-h1 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                      Missions
                    </h2>
                    <p className="text-body3 font-medium text-gray-700">
                      As founders, there are certain tasks that you might not
                      like to do. That's why we've come up with a unique way to
                      make these tasks fun and engaging through our exciting and
                      incentive-based missions. Think of it as a game where you
                      can earn rewards and gain exposure for your business while
                      completing challenges that might have otherwise seemed
                      tedious.
                    </p>
                    <ul className="flex flex-wrap gap-16">
                      <li className="text-gray-700 text-body4 font-medium">
                        Pitch Competitions 🍕
                      </li>
                      <li className="text-gray-700 text-body4 font-medium">
                        Marketing 🛠
                      </li>
                      <li className="text-gray-700 text-body4 font-medium">
                        Growth 🤝
                      </li>
                    </ul>
                  </div>
                  <img src={EventsImage} alt="" />
                </div>
              </section>
              <section>
                <div className="grid md:grid-cols-2 gap-24 items-center">
                  <div className="flex flex-col gap-24 items-start">
                    <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1">
                      <FiSmile />
                    </span>
                    <h2 className="text-h1 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                      Deals + Perks
                    </h2>
                    <p className="text-body3 font-medium text-gray-700">
                      Starting or running a business is expensive so we’ve put
                      together a set of discounts, deals, and perks from various
                      bitcoin companies to give you some of the best tools and
                      services.
                    </p>
                  </div>
                  <img
                    src={PerksImage}
                    alt=""
                    className="translate-x-24 md:translate-x-80"
                  />
                </div>
              </section>
              <section id="mission-0">
                <div className="bg-gray-900 rounded p-24 md:p-48 text-center flex flex-col gap-24">
                  <span className="bg-gray-800 text-blue-400 px-24 py-12 rounded self-center">
                    MISSION #0
                  </span>
                  <h2 className="text-h2 font-bolder text-center text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                    Startup pitch competition
                  </h2>
                  <p className="text-white text-body3">
                    Founders will have two months to present their project ideas
                    in the form of a pitch deck. Participate in our Pitch
                    Competition, present your idea to the top industry VCs and
                    judges, get discounts and deals, valuable feedback from the
                    mentors, win the prize, and start your company.
                    <br />
                    <br />
                    <br />
                    The prize is a coupon for registering your company in the US
                    with FirstBase.io. The winner will also receive $250k worth
                    of deals and rewards for various tools and services
                    including server costs, project management, and figma. Don't
                    miss out on this amazing opportunity to jumpstart your
                    business. Start crafting your winning pitch now!
                  </p>
                  <span className="text-gray-400 text-[100px] self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="121"
                      height="167"
                      viewBox="0 0 121 167"
                      fill="none"
                    >
                      <path
                        d="M65.8214 14H14.8214C10.9568 14 7.25054 15.5352 4.51787 18.2679C1.7852 21.0005 0.25 24.7068 0.25 28.5714V130.571C0.25 134.436 1.7852 138.142 4.51787 140.875C7.25054 143.608 10.9568 145.143 14.8214 145.143H36.6786V167L51.25 159.714L65.8214 167V145.143H87.6786C91.5432 145.143 95.2495 143.608 97.9821 140.875C100.715 138.142 102.25 134.436 102.25 130.571V50.4286M65.8214 108.714V123.286L51.25 116L36.6786 123.286V108.714L22.1071 101.429L36.6786 94.1429V79.5714L51.25 86.8571L65.8214 79.5714V94.1429L80.3929 101.429"
                        fill="#1E293B"
                      />
                      <path
                        d="M111.75 51L69.75 9V51H111.75Z"
                        fill="#1E293B"
                        stroke="#101828"
                        strokeWidth="7"
                      />
                    </svg>
                  </span>
                </div>
              </section>
              <section>
                <div className="bg-gray-50 rounded grid md:grid-cols-2">
                  <div className="flex flex-col justify-center items-center gap-40 p-24 md:p-42">
                    <div className="">
                      <h2 className="text-body1 text-center font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
                        Apply for Founder Club
                      </h2>
                      <p className="text-gray-700 text-center font-bold text-body2 mt-12">
                        An exclusive community to level up founders and their
                        projects
                      </p>
                    </div>
                    <div className="flex gap-16">
                      <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1 shrink-0 self-start">
                        <FiUsers />
                      </span>
                      <div>
                        <p className="text-body2 text-gray-700 font-bolder">
                          Networking
                        </p>
                        <p className="text-body4 text-gray-700 font-light">
                          Get your company’s adverts featured where our
                          community is most active.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-16">
                      <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1 shrink-0 self-start">
                        <FiSmile />
                      </span>
                      <div>
                        <p className="text-body2 text-gray-700 font-bolder">
                          Deals & Perks
                        </p>
                        <p className="text-body4 text-gray-700 font-light">
                          Reach a live audience through our community hangout
                          spaces!
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-16">
                      <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1 shrink-0 self-start">
                        <FiTarget />
                      </span>
                      <div>
                        <p className="text-body2 text-gray-700 font-bolder">
                          Missions
                        </p>
                        <p className="text-body4 text-gray-700 font-light">
                          We’ll give you extra love and shoutouts through
                          podcast appearances, spaces, and more!
                        </p>
                      </div>
                    </div>
                  </div>
                  <ApplyForm />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
