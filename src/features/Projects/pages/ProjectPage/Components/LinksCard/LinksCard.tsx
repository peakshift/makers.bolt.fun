import Card from "src/Components/Card/Card";
import { Project } from "src/graphql";
import { FaDiscord } from "react-icons/fa";
import { FiFigma, FiGithub, FiGlobe, FiTwitter } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { NotificationsService } from "src/services";
import { GiOstrich } from "react-icons/gi";
import { Tooltip } from "react-tooltip";
import { SiReplit } from "react-icons/si";

interface Props {
  links: Pick<
    Project,
    | "discord"
    | "website"
    | "github"
    | "twitter"
    | "slack"
    | "telegram"
    | "figma"
    | "replit"
    | "npub"
  >;
}

export default function LinksCard({ links }: Props) {
  const linksList = [
    {
      value: links.website,
      text: links.website?.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, ""),
      icon: FiGlobe,
      colors: "bg-gray-100 text-gray-900",
      url: links.website,
      label: "Website",
    },
    {
      value: links.discord,
      text: links.discord,
      icon: FaDiscord,
      colors: "bg-violet-100 text-violet-900",
      label: "Discord",
    },
    {
      value: links.github,
      text: links.github,
      icon: FiGithub,
      colors: "bg-gray-200 text-gray-800",
      url: links.github,
      label: "Github",
    },
    {
      value: links.replit,
      text: links.replit,
      icon: SiReplit,
      colors: "bg-orange-100 text-orange-600",
      url: links.replit,
      label: "Replit",
    },
    {
      value: links.twitter,
      text: links.twitter,
      icon: FiTwitter,
      colors: "bg-blue-100 text-blue-500",
      url: links.twitter,
      label: "Twitter",
    },
    {
      value: links.npub,
      text: links.npub,
      icon: GiOstrich,
      colors: "bg-violet-100 text-violet-600",
      label: "Nostr Public Key",
    },
    {
      value: links.figma,
      text: links.figma,
      icon: FiFigma,
      colors: "bg-pink-100 text-pink-600",
      url: links.figma,
      label: "Figma",
    },
  ];

  return (
    <Card onlyMd>
      <p className="text-body2 font-bold mb-16 hidden md:block">🔗 Links</p>
      <div className="">
        {linksList.length === 0 && (
          <>
            <p className="text-gray-700 text-body4">No links added</p>
          </>
        )}
        <div className="flex flex-wrap gap-16">
          {linksList
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
        </div>
      </div>
    </Card>
  );
}
