import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import React from "react";
import { Helmet } from "react-helmet";
import { IoLocationOutline } from "react-icons/io5";
import { getSpanDate } from "src/utils/helperFunctions";
import { useTournament } from "../TournamentDetailsContext";
dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function Header() {
  const { tournamentDetails } = useTournament();
  return (
    <>
      <Helmet>
        <title>{tournamentDetails.title} Tournament</title>
        <meta
          property="og:title"
          content={`${tournamentDetails.title} Tournament`}
        />
        <meta name="description" content={tournamentDetails.description} />
        <meta
          property="og:description"
          content={tournamentDetails.description}
        />
        <meta
          property="og:image"
          content={"https://i.ibb.co/3S35g6T/wide.jpg"}
        />
      </Helmet>
      <header className="rounded-20 overflow-hidden w-full p-16 md:p-24 flex flex-col h-[280px] relative">
        <img
          src={tournamentDetails.cover_image}
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
              src={tournamentDetails.thumbnail_image}
              className={
                "w-64 md:w-[128px] aspect-square rounded-16 md:rounded-24 border-2 border-gray-100"
              }
              alt=""
            />
            <div className="flex flex-col gap-4">
              <p className="text-body6">TOURNAMENT 🏆</p>
              <h1 className="text-body1 md:text-h2 font-bold">
                {tournamentDetails.title}
              </h1>
              <p className="text-body3">
                {formatDate(
                  tournamentDetails.start_date,
                  tournamentDetails.end_date
                )}{" "}
                {tournamentDetails.config.projectsSubmissionOpen &&
                  tournamentDetails.config.projectsSubmissionClosesOn && (
                    <span>
                      (Submission closes:{" "}
                      {dayjs(
                        tournamentDetails.config.projectsSubmissionClosesOn
                      ).format("Do MMM")}
                      )
                    </span>
                  )}
              </p>
              <p className="text-body5">
                <IoLocationOutline className="mr-8" />{" "}
                {tournamentDetails.location}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const formatDate = (startDate: string, endDate: string) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const isSameMonth = date1.getMonth() === date2.getMonth();
  if (!isSameMonth)
    return `${dayjs(date1).utc().format("Do MMM")} - ${dayjs(date2)
      .utc()
      .format("Do MMM")}`;

  const isSameDay = date1.getDate() === date2.getDate();
  if (!isSameDay)
    return `${dayjs(date1).utc().format("Do")} - ${dayjs(date2)
      .utc()
      .format("Do MMM")}`;
  // Same Day
  return `${dayjs(date1).utc().format("H:mm")} - ${dayjs(date2)
    .utc()
    .format("H:mm, Do MMM")}`;
};
