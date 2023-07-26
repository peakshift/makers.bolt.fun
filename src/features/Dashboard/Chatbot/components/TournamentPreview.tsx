import { marked } from "marked";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import Card from "src/Components/Card/Card";
import FAQsSection from "src/features/Tournaments/pages/OverviewPage/FAQsSection/FAQsSection";
import JudgesSection from "src/features/Tournaments/pages/OverviewPage/JudgesSection/JudgesSection";
import PrizesSection from "src/features/Tournaments/pages/OverviewPage/PrizesSection/PrizesSection";
import RegisterCard from "src/features/Tournaments/pages/OverviewPage/RegisterCard/RegisterCard";
import { purifyHtml } from "src/utils/validation";
import { useTournament } from "../contexts/tournament.context";

export default function TournamentPreview() {
  const { tournament } = useTournament();

  const loading = !tournament;

  return (
    <div className="overflow-y-auto h-full">
      {loading && <p>Loading...</p>}
      {tournament && (
        <>
          <header className="rounded-20 overflow-hidden w-full p-16 md:p-24 flex flex-col h-[280px] relative">
            <img
              src={tournament.cover_image}
              className="absolute inset-0 h-full w-full object-cover object-center"
              alt=""
            />
            <div className="absolute inset-0 h-full w-full bg-black bg-opacity-50 " />
            <div className="w-full mt-auto">
              <div
                className="text-white flex flex-col md:flex-row gap-16 md:gap-32 relative"
                style={{ marginTop: "auto" }}
              >
                <img
                  src={tournament.thumbnail_image}
                  className={
                    "w-64 md:w-[128px] aspect-square rounded-16 md:rounded-24 border-2 border-gray-100"
                  }
                  alt=""
                />
                <div className="flex flex-col gap-4">
                  <p className="text-body6">TOURNAMENT 🏆</p>
                  <h1 className="text-body1 md:text-h2 font-bold">
                    {tournament.title}
                  </h1>
                  <p className="text-body3">
                    {new Date(tournament.start_date).toDateString()} -{" "}
                    {new Date(tournament.end_date).toDateString()}
                  </p>
                  <p className="text-body5">
                    <IoLocationOutline className="mr-8" /> {tournament.location}
                  </p>
                </div>
              </div>
            </div>
          </header>
          <Card
            onlyMd
            className="flex flex-col gap-42 bg-white max-md:-mx-16 px-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
              <div className="md:col-span-2">
                <div
                  className={`text-gray-600 prose `}
                  dangerouslySetInnerHTML={{
                    __html: purifyHtml(
                      marked.parse(tournament.description ?? "")
                    ),
                  }}
                ></div>
                {true &&
                  tournament.makers_deals &&
                  tournament.makers_deals?.length > 0 && (
                    <div className="mt-32">
                      <p className="text-body2 font-bolder mb-16">
                        Hacker perks from our partners 🎁
                      </p>
                      <ul className="flex flex-col gap-8">
                        {tournament.makers_deals.map((deal, idx) => (
                          <li
                            key={idx}
                            className={`w-full gap-8 items-center bg-gray-100 rounded ${
                              deal.url && "hover:bg-gray-200"
                            }`}
                          >
                            {deal.url ? (
                              <a
                                href={deal.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block p-16"
                              >
                                <div className="self-center text-left">
                                  <p className="text-body4 text-gray-900 font-bold">
                                    {deal.title}
                                  </p>
                                  <p className="text-body5 text-gray-600">
                                    {deal.description}
                                  </p>
                                </div>
                              </a>
                            ) : (
                              <div className="self-center text-left p-16">
                                <p className="text-body4 text-gray-900 font-medium">
                                  {deal.title}
                                </p>
                                <p className="text-body5 text-gray-600">
                                  {deal.description}
                                </p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              <RegisterCard
                makers_count={200}
                start_date={tournament.start_date}
                avatars={[]}
                isRegistered={false}
                isRegistrationOpen={tournament.config!.registerationOpen}
                partnersList={tournament.partners ?? []}
                contacts={tournament.contacts ?? []}
                tournament={tournament}
              />
            </div>
            <PrizesSection prizes={tournament.prizes ?? []} />

            {tournament.judges && tournament.judges?.length > 0 && (
              <JudgesSection judges={tournament.judges} />
            )}
            {tournament.faqs && tournament.faqs.length > 0 && (
              <FAQsSection faqs={tournament.faqs} />
            )}
          </Card>
        </>
      )}
    </div>
  );
}
