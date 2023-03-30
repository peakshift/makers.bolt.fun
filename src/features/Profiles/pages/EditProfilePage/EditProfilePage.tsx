import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import Slider from "src/Components/Slider/Slider";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import { Helmet } from "react-helmet";
import { MEDIA_QUERIES } from "src/utils/theme";
import PreferencesTab from "./PreferencesTab/PreferencesTab";
import RolesSkillsTab from "./RolesSkillsTab/RolesSkillsTab";
import Card from "src/Components/Card/Card";
import BasicProfileInfoTab from "./BasicProfileInfoTab/BasicProfileInfoTab";
import NostrSettingsTab from "./NostrSettingsTab/NostrSettingsTab";

const links = [
  {
    icon: "🤠",
    text: "Basic information",
    path: "basic-info",
  },
  {
    icon: "🎛️",
    text: "Roles & Skills",
    path: "roles-skills",
  },
  {
    icon: "🦩",
    text: "Nostr Settings",
    path: "nostr",
  },
  {
    icon: "🔐",
    text: "Security",
    path: "auth",
  },
];

export default function EditProfilePage() {
  const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMinMedium);

  const user = useAppSelector((state) => state.user.me);

  if (!user) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta property="og:title" content="Settings" />
      </Helmet>
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          <aside>
            {isMediumScreen ? (
              <Card className="sticky-side-element">
                <p className="text-body2 font-bolder text-black mb-16">
                  Edit maker profile
                </p>
                <ul className=" flex flex-col gap-8">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={link.path}
                        className={({
                          isActive,
                        }) => `flex items-start rounded-8 cursor-pointer font-bold p-12
                                 active:scale-95 transition-transform
                                ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}
                                `}
                      >
                        <span className="mr-4" aria-hidden>
                          {link.icon}
                        </span>{" "}
                        {link.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : (
              <div className="overflow-hidden">
                <div className="border-b-2 border-gray-200">
                  <Slider>
                    {links.map((link, idx) => (
                      <NavLink
                        to={link.path}
                        key={idx}
                        className={`flex items-start cursor-pointer font-bold py-12
                                                active:scale-95 transition-transform`}
                        style={({ isActive }) => ({
                          boxShadow: isActive
                            ? "0px 3px 1px -1px var(--primary)"
                            : "none",
                        })}
                      >
                        <span className="mr-4" aria-hidden>
                          {link.icon}
                        </span>{" "}
                        {link.text}
                      </NavLink>
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </aside>
          <main className="md:col-span-3">
            <Routes>
              <Route index element={<Navigate to="basic-info" replace />} />
              <Route path="basic-info" element={<BasicProfileInfoTab />} />
              <Route path="roles-skills" element={<RolesSkillsTab />} />
              <Route path="nostr" element={<NostrSettingsTab />} />
              <Route path="auth" element={<PreferencesTab />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
