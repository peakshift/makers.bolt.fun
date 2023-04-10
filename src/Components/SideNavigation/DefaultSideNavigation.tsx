import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type NavItem = {
  href: string;
  icon: string;
  text: string;
  isExternal?: boolean;
  badge?: {
    text: string;
    color: string;
  };
};

const navItems: NavItem[] = [
  {
    href: "/feed",
    icon: "📰",
    text: "Feed",
  },
  {
    href: "/t/cubo+",
    icon: "➕",
    text: "CUBO+",
  },
  {
    href: "/topics",
    icon: "🏷️",
    text: "Topics",
  },
  {
    href: "/hangout",
    icon: "🔊",
    text: "Hangout",
    badge: {
      text: "LIVE",
      color: "red",
    },
  },
  {
    href: "/projects",
    icon: "🚀",
    text: "Explore Projects",
  },
  {
    href: "/tournaments/2/overview",
    icon: "🦩",
    text: "#NostrHack",
  },
  {
    href: "/tournaments/1/overview",
    icon: "🏆",
    text: "#LegendsOfLightning",
  },
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
    <ul className="flex flex-col gap-8 mb-16">
      {navItems.map((item) => (
        <li className="group" key={item.href}>
          {item.isExternal ? (
            <a
              className="flex items-center text-gray-700 rounded-8 cursor-pointer font-bold active:scale-95 transition-transform group-hover:bg-gray-100"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="bg-gray-50 group-hover:bg-gray-100 rounded-8 w-40 h-40 text-center py-8"
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
                `flex items-center text-gray-700 rounded-8 cursor-pointer font-bold active:scale-95 transition-transform ${
                  isActive ? "bg-primary-100" : "group-hover:bg-gray-100"
                }`
              }
              to={item.href}
            >
              <span
                className="rounded-8 w-40 h-40 text-center py-8"
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
