import OgTags from "src/Components/OgTags/OgTags";
import FeedTagsFilter from "src/features/Posts/pages/FeedPage/PopularTagsFilter/FeedTagsFilter";
import Card from "src/Components/Card/Card";
import BgImage from "./assets/bg.png";
import JohnsAvatar from "./assets/avatar.png";
import HangoutImage from "./assets/hangout.jpg";
import EventsImage from "./assets/events.png";
import PerksImage from "./assets/perks.png";
import Button from "src/Components/Button/Button";
import { FiSmile, FiTarget, FiUsers } from "react-icons/fi";
import ApplyForm from "./Components/ApplyForm";

export default function LandingPage() {
  return (
    <>
      <OgTags
        title="Founders Club"
        description="The Founders Club is an exclusive space on BOLT.FUN that offers a safe and supportive environment for makers to pitch their ideas, connect, learn and share their experiences. "
      />
      <div className={`page-container bg-gray-50`}>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-16">
          <aside className="no-scrollbar">
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
          <main className="relative md:col-span-3 bg-white rounded px-24 md:px-80 py-80 md:pt-[160px] flex flex-col gap-[160px]">
            <div className="absolute w-full inset-x-0 top-0 ">
              <img src={BgImage} alt="" className="w-full" />
              <div className="bg-gray-100 absolute inset-0 bg-opacity-40 xl:bg-opacity-10"></div>
            </div>
            <header className="relative">
              <div className="flex flex-wrap gap-16 gap-y-32 justify-between items-center">
                <div className="grow basis-[440px]">
                  <h1 className="text-h2 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                    Founders Club
                  </h1>
                  <p className="text-body2 font-medium mb-8 text-gray-700">
                    The Founders Club is an exclusive space on BOLT.FUN that
                    offers a safe and supportive environment for makers to pitch
                    their ideas, connect, learn and share their experiences.
                  </p>
                </div>
                <div className="basis-[326px] mx-auto bg-gray-800 rounded p-16 text-white relative">
                  {" "}
                  <img
                    src={JohnsAvatar}
                    alt=""
                    className="absolute w-[100px] top-0 right-0 -translate-y-1/4 translate-x-1/4"
                  />
                  <p className="text-body2 font-bold mb-4">
                    Claim your invitation
                  </p>
                  <p className="text-body4 font-light">
                    Hey it’s Johns here! <br />
                    <br /> We think you’d be a great fit for our new members
                    only community wanted to see if you wanted to be a part of
                    it before we officially launch.
                    <br />
                    <br /> Check out the rest of the page and let us know if
                    you’d like to join!
                  </p>
                  <Button color="primary" fullWidth className="mt-32">
                    Accept Invitation
                  </Button>
                  <Button color="gray" fullWidth className="mt-16">
                    Sorry, I’m not interested
                  </Button>
                </div>
              </div>
            </header>
            <section>
              <h2 className="text-h2 text-center font-bolder mb-24">
                What's Inside
              </h2>
              <p className="text-body2 text-center">
                As a small startup trying to figure out product market fit
                ourself, we’ve created The Founders Club so we could be amongst
                cool people building sustainable businesses on bitcoin to learn
                from.
              </p>
              <ul className="flex flex-wrap justify-between gap-24 mt-64">
                <li className="bg-gray-100 p-24 rounded basis-[240px] grow flex flex-col gap-8">
                  <p className="text-body1">🙌</p>
                  <p className="text-body2 font-bolder text-gray-700">
                    Networking
                  </p>
                  <p className="text-gray-700">
                    We only invite founders who are serious about starting their
                    business, are interested in engineering, design and
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
                    Every few months we’ll be having missions for members of the
                    founders club. Our first mission is to encourage you to
                    think about your pitch which is important because presenting
                    your product increases interest and exposure, which can help
                    to drive growth.
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
                  economy, you might want to be the next unicorn, or to just be
                  your own boss, and cover living expenses. Whatever the reason,
                  only the brave few or silly embark on this journey. Since it
                  can get lonely, and the path may be unclear, why not support
                  each other, and learn from one another.
                </p>
              </div>
            </section>
            <section>
              <div className="grid md:grid-cols-2 gap-24 items-center">
                <img src={HangoutImage} alt="" />
                <div className="text-right flex flex-col gap-24 items-end">
                  <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1">
                    <FiUsers />
                  </span>
                  <h2 className="text-h1 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                    Meet bitcoin founders
                  </h2>
                  <p className="text-body3 font-medium text-gray-700">
                    There’s one rule of the Founders club. You do not talk about
                    the founders club, oh and you have to have started, or want
                    to start a company, or have a burning desire to create
                    something amazing. If you have an idea that you want to
                    share with the world, then you're the perfect fit for our
                    community.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid md:grid-cols-2 gap-24 items-center">
                <div className="flex flex-col gap-24">
                  <span className="bg-gray-200 w-48 aspect-square rounded-12 text-blue-500 flex flex-col justify-center items-center text-body1">
                    <FiTarget />
                  </span>
                  <h2 className="text-h1 font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent inline-block">
                    Missions
                  </h2>
                  <p className="text-body3 font-medium text-gray-700">
                    As founders, there are certain tasks that you might not like
                    to do. That's why we've come up with a unique way to make
                    these tasks fun and engaging through our exciting and
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
                  <Button
                    color="black"
                    href="#mission-0"
                    className="self-start"
                    onClick={() =>
                      document
                        .getElementById("mission-0")
                        ?.scrollIntoView({ block: "center" })
                    }
                  >
                    Read about Mission #0
                  </Button>
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
                  <Button color="black" disabled>
                    Explore deals 🚀{" "}
                    <span className="text-gray-300 font-light">(soon)</span>
                  </Button>
                </div>
                <img
                  src={PerksImage}
                  alt=""
                  className="translate-x-24 md:translate-x-80"
                />
              </div>
            </section>
            <section id="mission-0">
              <div className="bg-gray-900 rounded p-48 text-center flex flex-col gap-24">
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
                  with FirstBase.io. The winner will also receive $250k worth of
                  deals and rewards for various tools and services including
                  server costs, project management, and figma. Don't miss out on
                  this amazing opportunity to jumpstart your business. Start
                  crafting your winning pitch now!
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
                      stroke="#11182C"
                      stroke-width="7"
                    />
                  </svg>
                </span>
              </div>
            </section>
            <section>
              <div className="bg-gray-50 rounded grid grid-cols-2">
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
                        Get your company’s adverts featured where our community
                        is most active.
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
                        We’ll give you extra love and shoutouts through podcast
                        appearances, spaces, and more!
                      </p>
                    </div>
                  </div>
                </div>
                <ApplyForm />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
