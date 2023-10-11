import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";

type NavItem = {
  href: string;
  icon: string;
  text: string;
  isExternal?: boolean;
  badge?: {
    text: string;
    color: string;
  };
  highlighted?: boolean;
};

const navItems: NavItem[] = [
  {
    href: PAGES_ROUTES.blog.feed,
    icon: "📰",
    text: "Community Feed",
  },
  {
    href: createRoute({ type: "tag-page", tag: "intros" }),
    icon: "👋",
    text: "Intros",
  },
  {
    href: createRoute({ type: "tag-page", tag: "get-help" }),
    icon: "🙋‍♀️",
    text: "Questions",
  },
  {
    href: createRoute({ type: "tournaments" }),
    icon: "🏆",
    text: "Tournaments",
    badge: {
      text: "2",
      color: "red",
    },
    highlighted: true,
  },
  {
    href: PAGES_ROUTES.blog.topicsPage,
    icon: "🏷️",
    text: "Topics",
  },
  {
    href: createRoute({ type: "hangout" }),
    icon: "🔊",
    text: "Hangout",
  },
  {
    href: createRoute({ type: "projects-page" }),
    icon: "🚀",
    text: "Explore Projects",
  },
  {
    href: PAGES_ROUTES.landingPage.buildOnBitcoin,
    icon: "🧰",
    text: "#BuildOnBitcoin",
  },
  // {
  //   href: createRoute({ type: "tournament", idOrSlug: "nostrasia" }),
  //   icon: "🦩",
  //   text: "#Nostrasia",
  //   badge: {
  //     text: "REGISTER!",
  //     color: "red",
  //   },
  //   highlighted: true,
  // },
  // {
  //   href: createRoute({ type: "tournament", idOrSlug: "ai4all" }),
  //   icon: "🤖",
  //   text: "#Ai4ALL",
  //   highlighted: false,
  // },
  // {
  //   href: createRoute({ type: "tournament", idOrSlug: "nostr-hack" }),
  //   icon: "🦩",
  //   text: "#NostrHack",
  //   badge: {
  //     text: "ENDED",
  //     color: "primary",
  //   },
  // },
  // {
  //   href: createRoute({ type: "tournament", idOrSlug: "legends-of-lightning" }),
  //   icon: "🏆",
  //   text: "#LegendsOfLightning",
  //   badge: {
  //     text: "2022",
  //     color: "primary",
  //   },
  // },
  {
    href: "mailto:team@peakshift.com",
    icon: "💬",
    text: "Host a hackathon",
  },
  {
    href: "https://www.figma.com/file/73tOKOOvZD8iN3qP9Cr18E/BOLT%F0%9F%94%A9FUN?node-id=878-150109&t=aRcywwDisNlwZfPF-0",
    icon: "🎨",
    text: "View in Figma",
    isExternal: true,
  },
  {
    href: "http://github.com/peakshift/makers.bolt.fun",
    icon: "🐙",
    text: "View source",
    isExternal: true,
  },
];

export default function DefaultSideNavigation() {
  return (
    <ul className="flex flex-col mb-16 gap-8">
      {navItems.map((item) => (
        <li className="group" key={item.href}>
          {item.isExternal ? (
            <a
              className="flex items-center font-bold cursor-pointer text-slate-700 rounded-8 active:scale-95 transition-transform group-hover:bg-slate-100"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="w-40 h-40 py-8 text-center bg-slate-50 group-hover:bg-slate-100 rounded-8"
                aria-hidden
              >
                {item.icon}
              </span>
              <span className="self-center px-8 alig">
                {item.text}
                {item.badge && (
                  <span
                    className={`ml-4 inline-block font-medium text-xs rounded px-2 py-0.5 bg-${item.badge.color}-500 text-white`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </span>
              <FaExternalLinkAlt />
            </a>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `flex items-center text-slate-700 rounded-8 cursor-pointer font-bold active:scale-95 transition-transform ${
                  isActive ? "bg-slate-200" : "group-hover:bg-slate-100"
                } ${
                  item.highlighted ? "border-2 border-blue-200 bg-blue-50" : ""
                }`
              }
              to={item.href}
            >
              <span
                className="w-40 h-40 py-8 text-center rounded-8"
                aria-hidden
              >
                {item.icon}
              </span>
              <span className="self-center px-8">
                {item.text}
                {item.badge && (
                  <span
                    className={`ml-4 inline-block font-medium text-xs rounded px-2 py-0.5 bg-${item.badge.color}-500 text-white`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </span>
              {item.isExternal && <FaExternalLinkAlt />}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}
