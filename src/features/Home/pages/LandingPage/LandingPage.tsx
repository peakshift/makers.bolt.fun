import OgTags from "src/Components/OgTags/OgTags";
import BgImage from "./assets/bg.jpg";
import SocialPreviewImage from "./assets/social-preview.jpg";
import BTCPragueImage from "./assets/btc-prague.png";
import Button from "src/Components/Button/Button";
import resourcesData from "./resources.json";
import { FaChevronRight } from "react-icons/fa";
import { createRoute } from "src/utils/routing";
import { CommunityInvitationCard } from "src/Components/CommunityInvitationCard/CummunityInvitationCard";

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
          <div className="absolute inset-x-0 top-0 w-full -z-10">
            <img src={BgImage} alt="" className="w-full" />{" "}
            <div className="bg-gradient-to-b from-transparent via-[#f8f8f863] to-40% absolute inset-0"></div>
          </div>
          <header className="relative md:py-80">
            <div className="flex flex-col items-center text-center gap-32">
              <h1 className="text-h2 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                #BuildOnBitcoin
              </h1>
              <p className="mb-8 font-medium text-gray-800 text-body2 drop-shadow-sm">
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
                  className="px-32 text-white bg-gray-700"
                >
                  Introduce yourself 🚀
                </Button>
                <Button
                  href={createRoute({
                    type: "write-story",
                    initData: {
                      tags: ["questions"],
                    },
                  })}
                  color="none"
                  className="px-32 text-white bg-gray-700"
                >
                  Ask a question 🙋‍♂️
                </Button>
              </div>
              <div className="flex flex-wrap items-center mt-16 gap-32">
                <span className="text-gray-500 uppercase">announced at</span>
                <img
                  src={BTCPragueImage}
                  alt="BTC Prague"
                  className="max-h-48"
                />
              </div>
            </div>
          </header>
          {/* <button className="flex px-32 py-24 my-32 text-left text-white bg-gray-900 gap-16 rounded-16">
            <div>
              <p className="text-body2 font-bolder">AI4ALL Hackathon ⚡️</p>
              <p className="">
                Sign up for the Fedi x Replit hackathon coming up in July!
              </p>
            </div>
          </button> */}
          {resourcesData.data.map((item) => (
            <section key={item.title} className="relative">
              <h2 className="mb-24 text-center text-h3 md:text-h2 font-bolder">
                {item.title}
              </h2>
              <p className="text-center text-body3">{item.description}</p>
              <ul className="flex flex-wrap justify-between mt-64 gap-24">
                {item.links.map((link) => (
                  <li key={link.title} className="basis-[240px] grow">
                    <a
                      href={link.link}
                      className="flex flex-col h-full p-24 rounded gap-8 hover:outline"
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
                          className="object-cover w-40 aspect-square rounded-8"
                          alt=""
                        />
                      )}
                      <p className="text-gray-700 text-body2 font-bolder">
                        {link.title}
                      </p>
                      <p className="text-gray-700">{link.description}</p>
                      <p className="mt-auto text-gray-900 font-bolder">
                        {link.linkCTA ?? "Learn More"} <FaChevronRight />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <CommunityInvitationCard />
        </div>
      </main>
    </>
  );
}
