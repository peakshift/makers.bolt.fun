import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  useAppDispatch,
  useAppSelector,
  useCurrentSection,
} from "src/utils/hooks";
import ASSETS from "src/assets";
import IconButton from "../IconButton/IconButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { FiBell, FiChevronDown, FiPlus } from "react-icons/fi";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing";
import Button from "../Button/Button";
import NotificationsList from "./NotificationsList/NotificationsList";
import Search from "../Inputs/Search/Search";
import { openModal } from "src/redux/features/modals.slice";

export default function NavDesktop() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const openSearch = () => {
    setSearchOpen(true);
  };
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const currentSection = useCurrentSection();
  const navigate = useNavigate();

  const openLoginModal = () => {
    dispatch(
      openModal({
        Modal: "LoginModal",
      })
    );
  };

  return (
    <nav className="bg-white border-b-2 py-16 w-full min-w-full">
      <div className="content-container">
        <div className="flex items-center gap-16">
          <Link to="/">
            <img
              className="h-40 mr-40 cursor-pointer"
              src={ASSETS.Logo}
              alt="BOLT.FUN"
            />
          </Link>
          <div className="ml-auto pt-2 mr-40 grow">
            <Search />
          </div>
          <div className="ml-auto">
            <Menu
              align="end"
              offsetY={4}
              menuClassName="!p-8 !border-gray-300 !border-2 !shadow-none !rounded-lg !border-solid"
              menuButton={
                <Button color="secondary" size="sm">
                  <span className="align-middle">Write</span>{" "}
                  <FiPlus className="text-primary-500 mr-8" />
                </Button>
              }
            >
              <MenuItem
                href={createRoute({
                  type: "write-story",
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                ✍️ Story
              </MenuItem>
              <MenuItem
                href={createRoute({
                  type: "write-story",
                  initData: {
                    tags: ["get-help"],
                  },
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                🙋‍♂️ Question
              </MenuItem>
              <MenuItem
                href={createRoute({
                  type: "edit-project",
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                🚀 Project
              </MenuItem>
            </Menu>
          </div>

          {!!curUser && (
            <NotificationsList
              menuClassName="!p-8 !rounded-12 !w-[min(90vw,375px)] max-h-[min(50vh,480px)] overflow-y-auto overflow-x-hidden flex flex-col gap-4 small-scrollbar"
              renderOpenListButton={({
                hasNewNotifications,
                isNostrKeySet,
              }) => (
                <IconButton
                  className="text-gray-900 hover:text-gray-700 group relative"
                  aria-label="Open Notifications List"
                  aria-describedby="has-new-notifications"
                >
                  <FiBell className="group-hover:rotate-12 group-hover:scale-110" />
                  {!isNostrKeySet && (
                    <span
                      id="has-new-notifications"
                      className="w-8 block bg-orange-400-500 aspect-square rounded-full absolute top-8 right-8 animate-pulse"
                      aria-label="has a message"
                    ></span>
                  )}
                  {hasNewNotifications && (
                    <span
                      id="has-new-notifications"
                      className="w-8 block bg-red-500 aspect-square rounded-full absolute top-8 right-8 animate-pulse"
                      aria-label="has new notifications"
                    ></span>
                  )}
                </IconButton>
              )}
            />
          )}

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

            {currentSection === "projects" && (
              <IconButton className="self-center" onClick={openSearch}>
                <BsSearch className="" />
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
                {curUser.is_admin && (
                  <MenuItem
                    href={createRoute({
                      type: "profile",
                      id: curUser.id,
                      username: curUser.name,
                    })}
                    onClick={(e) => {
                      e.syntheticEvent.preventDefault();
                      navigate("/admin");
                    }}
                    className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                  >
                    👨🏻‍💼 Admin
                  </MenuItem>
                )}
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
              <Button
                size="sm"
                color="white"
                onClick={openLoginModal}
                // state={{ from: pathname }}
              >
                Sign in 🔑
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
              {/* <Search
                width={326}
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                onResultClick={() => setSearchOpen(false)}
              /> */}
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
