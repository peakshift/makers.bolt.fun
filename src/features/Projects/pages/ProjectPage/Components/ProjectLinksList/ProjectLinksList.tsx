import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaDiscord } from "react-icons/fa";
import { FiFigma, FiGithub, FiGlobe, FiTwitter } from "react-icons/fi";
import { GiOstrich } from "react-icons/gi";
import { SiReplit, SiYoutube } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import { Project } from "src/graphql";
import { NotificationsService } from "src/services";

interface Props {
  project: Pick<
    Project,
    | "github"
    | "website"
    | "discord"
    | "twitter"
    | "youtube"
    | "npub"
    | "figma"
    | "replit"
  >;
}

export default function ProjectLinksList({ project }: Props) {
  const links = [
    {
      value: project.discord,
      text: project.discord,
      icon: FaDiscord,
      colors: "bg-violet-100 text-violet-900",
      label: "Discord",
    },
    {
      value: project.website,
      text: project.website?.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, ""),
      icon: FiGlobe,
      colors: "bg-gray-100 text-gray-900",
      url: project.website,
      label: "Website",
    },
    {
      value: project.twitter,
      text: project.twitter,
      icon: FiTwitter,
      colors: "bg-blue-100 text-blue-500",
      url: project.twitter,
      label: "Twitter",
    },
    {
      value: project.youtube,
      text: project.youtube,
      icon: SiYoutube,
      colors: "bg-red-100 text-red-600",
      url: project.youtube,
      label: "Youtube",
    },
    {
      value: project.github,
      text: project.github,
      icon: FiGithub,
      colors: "bg-gray-200 text-gray-800",
      url: project.github,
      label: "Github",
    },
    {
      value: project.npub,
      text: project.npub,
      icon: GiOstrich,
      colors: "bg-violet-100 text-violet-600",
      label: "Nostr Public Key",
    },
    {
      value: project.figma,
      text: project.figma,
      icon: FiFigma,
      colors: "bg-pink-100 text-pink-600",
      url: project.figma,
      label: "Figma",
    },
    {
      value: project.replit,
      text: project.replit,
      icon: SiReplit,
      colors: "bg-orange-100 text-orange-600",
      url: project.replit,
      label: "Replit",
    },
  ];

  const isEmpty = links.every((link) => !link.value);

  if (isEmpty)
    return <p className="text-body4 text-gray-500">No links provided</p>;

  return (
    <>
      {links
        .filter((link) => !!link.value)
        .map((link, idx) =>
          link.url ? (
            <a
              key={idx}
              href={link.url!}
              className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
              target="_blank"
              rel="noreferrer"
              data-tooltip-id={`project_link_${link.url}`}
              data-tooltip-content={link.label}
            >
              <link.icon className="scale-125" />
              <Tooltip id={`project_link_${link.url}`} />
            </a>
          ) : (
            <CopyToClipboard
              text={link.value!}
              onCopy={() =>
                NotificationsService.info(" Copied to clipboard", {
                  icon: "📋",
                })
              }
            >
              <button
                key={idx}
                onClick={() => {}}
                className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                data-tooltip-id={`project_link_${link.url}`}
                data-tooltip-content={link.label}
              >
                <link.icon className="scale-125" />
                <Tooltip id={`project_link_${link.url}`} />
              </button>
            </CopyToClipboard>
          )
        )}
    </>
  );
}
