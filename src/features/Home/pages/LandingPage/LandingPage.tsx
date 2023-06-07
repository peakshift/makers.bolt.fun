import OgTags from "src/Components/OgTags/OgTags";
import BgImage from "./assets/bg.jpg";
import Button from "src/Components/Button/Button";
import resourcesData from "./resources.json";
import { FaChevronRight } from "react-icons/fa";

export default function LandingPage() {
  return (
    <>
      <OgTags
        title="Build on Bitcoin | BOLT FUN"
        description="The Founders Club is an exclusive space on BOLT.FUN that offers a safe and supportive environment for makers to pitch their ideas, connect, learn and share their experiences. "
      />
      <main
        className="relative isolate md:col-span-3 bg-white rounded
          grid grid-cols-[24px_1fr_24px] md:grid-cols-[80px_1fr_80px]
          max-md:-mx-16 py-80"
      >
        <div className="col-start-2 col-end-3 flex flex-col gap-y-[160px]">
          <div className="absolute w-full inset-x-0 top-0 -z-10">
            <img src={BgImage} alt="" className="w-full" />{" "}
            <div className="bg-gradient-to-b from-transparent to-[#fff0]  absolute inset-0 bg-opacity-40 xl:bg-opacity-10"></div>
          </div>
          <header className="relative md:py-80">
            <div className="flex flex-col gap-32 text-center items-center">
              <h1 className="text-h1 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                #BuildOnBitcoin
              </h1>
              <p className="text-body2 font-medium mb-8 text-gray-700">
                People are building the future of the internet with Bitcoin.
                From social networks, to streaming payments, and even custom
                assets.
                <br />
                <br />
                Now we celebrate 10 years of 0 downtime and fast with layer 2!
              </p>
              <div className="flex flex-wrap gap-20">
                <Button color="none" className="bg-gray-700 text-white px-32">
                  Introduce yourself 🚀
                </Button>
              </div>
            </div>
          </header>
          <button className="my-80 px-32 py-24 bg-gray-900 text-white flex gap-16 text-left rounded-16">
            <div>
              <p className="text-body2 font-bolder">AI4ALL Hackathon ⚡️</p>
              <p className="">
                Sign up for the Fedi x Replit hackathon coming up in July!
              </p>
            </div>
          </button>
          {resourcesData.data.map((item) => (
            <section key={item.title} className="relative">
              <h2 className="text-h2 text-center font-bolder mb-24">
                {item.title}
              </h2>
              <p className="text-body3 text-center">{item.description}</p>
              <ul className="flex flex-wrap justify-between gap-24 mt-64">
                {item.links.map((link) => (
                  <li key={link.title} className="basis-[240px] grow">
                    <a
                      href={link.link}
                      className="p-24 rounded h-full flex flex-col gap-8 hover:outline outline-yellow-400"
                      style={{
                        backgroundColor: link.color ?? "#F1F5F9",
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
                        Learn more <FaChevronRight />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
