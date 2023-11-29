import React from "react";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";

const links = [
  {
    icon: "🎖️",
    label: "Manage Badges",
    url: createRoute({ type: "admin-badges", page: "list" }),
  },
];

export default function AdminDashboard() {
  return (
    <div className="page-container">
      <h1 className="text-h1 font-bolder mb-42">Admin Dashboard</h1>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              to={link.url}
              className="p-24 bg-gray-100 hover:bg-gray-50 border-2 border-gray-200 rounded font-medium flex flex-col items-center text-center text-body3"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
