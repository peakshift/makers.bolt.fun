import OgTags from "src/Components/OgTags/OgTags";
import BgImage from "./assets/bg.jpg";
import ConfettiImage from "./assets/confetti.png";
import SocialPreviewImage from "./assets/social-preview.jpg";
import CreateProfileImage from "./assets/create-profile.png";
import BTCPragueImage from "./assets/btc-prague.png";
import Button from "src/Components/Button/Button";
import resourcesData from "./resources.json";
import { FaChevronRight } from "react-icons/fa";
import { PAGES_ROUTES, createRoute } from "src/utils/routing";

export default function LandingPage() {
  return (
    <>
      <OgTags
        title="Build On Bitcoin | BOLT FUN"
        description="People are building the future of the internet with Bitcoin. From social networks, to streaming payments, and even custom assets. Now we celebrate 10 years of 0 downtime and fast with layer 2!"
        image={SocialPreviewImage}
      />
      <main
        className="relative isolate md:col-span-3 bg-white rounded
          grid grid-cols-[24px_1fr_24px] md:grid-cols-[80px_1fr_80px]
          max-md:-mx-16 py-80 overflow-hidden border-2 border-gray-100"
      >
        <div className="col-start-2 col-end-3 flex flex-col gap-y-[160px]">
          <div className="absolute w-full inset-x-0 top-0 -z-10">
            <img src={BgImage} alt="" className="w-full" />{" "}
            <div className="bg-gradient-to-b from-transparent via-[#f8f8f863] to-40% absolute inset-0"></div>
          </div>
          <header className="relative md:py-80">
            <div className="flex flex-col gap-32 text-center items-center">
              <h1 className="text-h2 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                #BuildOnBitcoin
              </h1>
              <p className="text-body2 font-medium mb-8 text-gray-800 drop-shadow-sm">
                People are building the future of the internet with Bitcoin.
                From social networks, to streaming payments, and even custom
                assets.
                <br />
                <br />
                Now we celebrate 10 years of 0 downtime and fast with layer 2!
              </p>
              <div className="flex flex-wrap justify-center gap-20">
                <Button
                  href={createRoute({
                    type: "write-story",
                    initData: {
                      tags: ["intros"],
                    },
                  })}
                  color="none"
                  className="bg-gray-700 text-white px-32"
                >
                  Introduce yourself 🚀
                </Button>
                <Button
                  href={createRoute({
                    type: "write-story",
                    initData: {
                      tags: ["get-help"],
                    },
                  })}
                  color="none"
                  className="bg-gray-700 text-white px-32"
                >
                  Ask a question 🙋‍♂️
                </Button>
              </div>
              <div className="flex flex-wrap gap-32 items-center mt-16">
                <span className="text-gray-500 uppercase">announced at</span>
                <img
                  src={BTCPragueImage}
                  alt="BTC Prague"
                  className="max-h-48"
                />
              </div>
            </div>
          </header>
          {/* <button className="my-32 px-32 py-24 bg-gray-900 text-white flex gap-16 text-left rounded-16">
            <div>
              <p className="text-body2 font-bolder">AI4ALL Hackathon ⚡️</p>
              <p className="">
                Sign up for the Fedi x Replit hackathon coming up in July!
              </p>
            </div>
          </button> */}
          {resourcesData.data.map((item) => (
            <section key={item.title} className="relative">
              <h2 className="text-h3 md:text-h2 text-center font-bolder mb-24">
                {item.title}
              </h2>
              <p className="text-body3 text-center">{item.description}</p>
              <ul className="flex flex-wrap justify-between gap-24 mt-64">
                {item.links.map((link) => (
                  <li key={link.title} className="basis-[240px] grow">
                    <a
                      href={link.link}
                      className="p-24 rounded h-full flex flex-col gap-8 hover:outline"
                      style={{
                        backgroundColor: link.color ?? "#F1F5F9",
                        outlineColor: `color-mix(in srgb, ${link.color} 80%, #292e41)`,
                      }}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Learn more about ${link.title}`}
                    >
                      {link.emoji && !link.logo && (
                        <p className="text-h3">{link.emoji}</p>
                      )}
                      {link.logo && (
                        <img
                          src={link.logo}
                          className="w-40 aspect-square rounded-8 object-cover"
                          alt=""
                        />
                      )}
                      <p className="text-body2 font-bolder text-gray-700">
                        {link.title}
                      </p>
                      <p className="text-gray-700">{link.description}</p>
                      <p className="text-gray-900 font-bolder mt-auto">
                        {link.linkCTA ?? "Learn More"} <FaChevronRight />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section className="bg-gray-800 rounded-16 p-16 md:p-32 text-center  relative isolate">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <img src={ConfettiImage} alt="" className="" />
              <div className="bg-gray-800 rounded-16 bg-opacity-40 absolute inset-0"></div>
            </div>
            <div className="flex flex-col gap-12 relative">
              <h2 className="text-body1 font-bolder bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent ">
                Join the community
              </h2>
              <p className="text-body3 text-white">
                Proof of work starts with you. Share your work, build in public,
                win bounties and take part in hackathons and tournaments! Sign
                up and introduce yourself to the community.
              </p>
              <img
                src={CreateProfileImage}
                alt=""
                className="self-center max-w-[300px]"
              />
              <Button
                href={PAGES_ROUTES.auth.login}
                color="primary"
                className="self-center !px-64 -mt-40"
              >
                Sign up
              </Button>
              <p className="text-gray-200">
                And become a part of the most FUN developers community!
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
