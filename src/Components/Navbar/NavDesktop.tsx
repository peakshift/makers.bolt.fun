import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { useAppSelector, useCurrentSection } from "src/utils/hooks";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { FiChevronDown } from "react-icons/fi";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing";
import Button from "../Button/Button";

export default function NavDesktop() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const openSearch = () => {
    setSearchOpen(true);
  };

  const currentSection = useCurrentSection();
  const navigate = useNavigate();

  return (
    <nav className="bg-white py-16 w-full min-w-full">
      <div className="content-container">
        <div className="flex items-center">
          <Link to="/">
            <h2 className="text-h5 font-bold mr-40 lg:mr-64">
              <img className="h-40" src={ASSETS.Logo} alt="Bolt fun logo" />
            </h2>
          </Link>
          <ul className="flex gap-32 xl:gap-64">
            <li className="relative">
              <Link
                to={"/projects"}
                className="text-body4 font-bold hover:text-primary-600"
              >
                Projects
              </Link>
            </li>
            <li className="relative">
              <Link
                to={createRoute({ type: "hangout" })}
                className="text-body4 font-bold hover:text-primary-600 relative pr-4"
              >
                Hangout{" "}
                <span className="absolute -top-3 -right-36 font-medium text-xs leading-5 rounded text-red-600 bg-red-400/10 px-2 py-0.1">
                  LIVE
                </span>
              </Link>
            </li>
            <li>
              <Menu
                offsetY={28}
                menuButton={
                  <MenuButton className="text-body4 font-bold hover:text-primary-600">
                    <div className="flex items-center">
                      {" "}
                      Events
                      <sup className="text-red-500 text-body2 block animate-pulse">
                        &#8226;
                      </sup>{" "}
                      <FiChevronDown className="ml-8" />{" "}
                    </div>
                  </MenuButton>
                }
                menuClassName="!rounded-12 !p-8 !border-gray-200"
                menuStyle={{ border: "1px solid" }}
              >
                <MenuItem
                  href="/tournaments/2"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/tournaments/2/overview");
                  }}
                  className="!p-16 font-medium flex gap-16 bg-orange-200 hover:bg-orange-300 !rounded-12"
                >
                  <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                    <span className="text-body2">🦩</span>
                  </div>
                  <div>
                    <p className="text-body4 text-black font-medium">
                      Nostr Hack & Design Week{" "}
                      <span className="text-red-500 text-body6 bg-red-200 p-4 px-8 rounded-24 font-bold">
                        Hot! 🔥
                      </span>
                    </p>
                    <p className="text-body5 text-gray-600 mt-4">
                      Design & Build cool things with the protocol!
                    </p>
                  </div>
                </MenuItem>
                <MenuItem
                  href="/tournaments/1"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/tournaments/1/overview");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                    <span className="text-body2">🏆</span>
                  </div>
                  <div>
                    <p className="text-body4 text-black font-medium">
                      #LegendsOfLightning
                    </p>
                    <p className="text-body5 text-gray-600 mt-4">
                      In 2022 we put on the largest
                      <br /> bitcoin hackathon.
                    </p>
                  </div>
                </MenuItem>
                <MenuItem
                  href="/hackathons"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/hackathons");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                    <span className="text-body2">👩‍💻</span>
                  </div>
                  <div>
                    <p className="text-body4 text-black font-medium">
                      Hackathons
                    </p>
                    <p className="text-body5 text-gray-600 mt-4">
                      Take part in hackathons & tournaments
                    </p>
                  </div>
                </MenuItem>
                <MenuItem
                  href="mailto:team@peakshift.com"
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                    <span className="text-body2">💬</span>
                  </div>
                  <div>
                    <p className="text-body4 text-black font-medium">
                      Host a Hackathon
                    </p>
                    <p className="text-body5 text-gray-600 mt-4">
                      Need some help setting up your own?
                    </p>
                  </div>
                </MenuItem>
              </Menu>
            </li>
            <li className="relative">
              <a
                href={"https://bolt.fun/guide/"}
                target="_blank"
                rel="noreferrer"
                className="text-body4 font-bold hover:text-primary-600"
              >
                Guide
              </a>
            </li>
          </ul>

          <div className="flex-1"></div>

          <motion.div
            animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
            className="flex"
          >
            {/* <Button
                color="primary"
                size="md"
                className="lg:px-40"
                href="https://airtable.com/shr2VkxarNsIFilDz"
                newTab
            >
                Submit App️
            </Button> */}
            {/* {isWalletConnected ?
                            <Button className="ml-16 py-12 px-16 lg:px-20">Connected <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></Button>
                            : <Button className="ml-16 py-12 px-16 lg:px-20" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button>
                        } */}

            {currentSection === "apps" && (
              <IconButton className="mr-16 self-center" onClick={openSearch}>
                <BsSearch className="scale-125 text-gray-400" />
              </IconButton>
            )}
          </motion.div>
          {curUser !== undefined &&
            (curUser ? (
              <Menu
                align="end"
                offsetY={4}
                menuClassName="!p-8 !rounded-12"
                menuButton={
                  <MenuButton>
                    <Avatar src={curUser.avatar} width={40} />{" "}
                  </MenuButton>
                }
              >
                <MenuItem
                  href={createRoute({
                    type: "profile",
                    id: curUser.id,
                    username: curUser.name,
                  })}
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate(
                      createRoute({
                        type: "profile",
                        id: curUser.id,
                        username: curUser.name,
                      })
                    );
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  👾 Profile
                </MenuItem>
                <MenuItem
                  href="/edit-profile"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/edit-profile");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  ⚙️ Settings
                </MenuItem>
                <MenuItem
                  href="/logout"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/logout");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  👋 Logout
                </MenuItem>
              </Menu>
            ) : (
              <Button size="sm" color="white" href="/login">
                Connect ⚡
              </Button>
            ))}
          <div className="relative h-36">
            <motion.div
              initial={{
                opacity: 0,
                y: "0",
              }}
              animate={
                searchOpen
                  ? {
                      opacity: 1,
                      y: "0",
                      transition: { type: "spring", stiffness: 70 },
                    }
                  : {
                      opacity: 0,
                      y: "-120px",
                      transition: {
                        ease: "easeIn",
                      },
                    }
              }
              className="absolute top-0 right-0 flex items-center h-full"
            >
              <Search
                width={326}
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                onResultClick={() => setSearchOpen(false)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
