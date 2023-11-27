import { motion } from "framer-motion";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import IconButton from "../IconButton/IconButton";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { FiBell, FiMenu, FiPlusCircle } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToggle } from "@react-hookz/web";
import styles from "./styles.module.css";
import "@szhsin/react-menu/dist/index.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing";
import { SideNavigation } from "../SideNavigation";
import NotificationsList from "./NotificationsList/NotificationsList";
import { openModal } from "src/redux/features/modals.slice";

const navBtnVariant = {
  menuHide: { rotate: 90, opacity: 0 },
  menuShow: { rotate: 0, opacity: 1 },
  closeHide: { rotate: -90, opacity: 0 },
  closeShow: { rotate: 0, opacity: 1 },
};

const navListVariants = {
  init: { x: 0 },
  show: { x: "-100%" },
  hide: { x: 0 },
};

const categoriesListVariants = {
  open: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: { ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    y: -50,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function NavMobile() {
  const dispatch = useAppDispatch();

  const [drawerOpen, toggleDrawerOpen] = useToggle(false);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash !== "#nav-menu") toggleDrawerOpen(false);
    if (location.hash === "#nav-menu" && !drawerOpen)
      window.history.replaceState("", document.title, window.location.pathname);
  }, [drawerOpen, location.hash, toggleDrawerOpen]);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflowY = "hidden";
    else {
      document.body.style.overflowY = "initial";
    }
  }, [drawerOpen]);

  const onToggleDrawer = (value?: boolean) => {
    toggleDrawerOpen((v) => value ?? !v);
    if (value === false || (!value && drawerOpen))
      window.history.length === 0
        ? navigate(window.location.pathname, { replace: true })
        : navigate(-1);
    else {
      navigate("#nav-menu");
    }
  };

  const openLoginModal = () => {
    dispatch(
      openModal({
        Modal: "LoginModal",
      })
    );
  };

  return (
    <div className={`${styles.navMobile}`}>
      <nav className={`bg-white h-[67px] w-full py-16`}>
        <div className="content-container">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex content-start">
              <button
                className="rounded-full border-0 text-2xl w-[42px] h-[42px] hover:bg-gray-200 flex flex-col justify-center items-center self-center !p-0"
                onClick={() => onToggleDrawer()}
              >
                {!drawerOpen ? (
                  <motion.div
                    key={drawerOpen ? 1 : 0}
                    variants={navBtnVariant}
                    initial="menuHide"
                    animate="menuShow"
                  >
                    <FiMenu />
                  </motion.div>
                ) : (
                  <motion.div
                    key={drawerOpen ? 1 : 0}
                    variants={navBtnVariant}
                    initial="closeHide"
                    animate="closeShow"
                  >
                    <GrClose aria-label="close navigation" />
                  </motion.div>
                )}
              </button>
            </div>

            <div className="flex-[2] flex justify-center">
              <Link to="/">
                <img
                  className="max-h-32"
                  src={ASSETS.Logo}
                  alt="Bolt fun logo"
                />
              </Link>
            </div>

            <div className="flex-1 shrink-0 flex gap-4 justify-end">
              {!!curUser && (
                <NotificationsList
                  menuClassName="!p-8 !rounded-12 !w-[min(80vw,375px)] max-h-[min(80vh,480px)] overflow-y-auto overflow-x-hidden drop-shadow-lg flex flex-col gap-4 small-scrollbar"
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
              {curUser ? (
                <Menu
                  align="end"
                  offsetY={4}
                  menuClassName="!p-8 !rounded-12"
                  menuButton={
                    <MenuButton>
                      <Avatar src={curUser.avatar} width={32} />{" "}
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
                <Button
                  size="sm"
                  color="none"
                  className="!text-body5 whitespace-nowrap"
                  onClick={openLoginModal}
                >
                  Sign in 🔑
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className="fixed left-0 top-[67px] pointer-events-none z-[2010] w-full min-h-[calc(100vh-67px)]"
        style={{ height: "calc(100dvh - 67px)" }}
      >
        {drawerOpen && (
          <button
            onClick={() => onToggleDrawer()}
            tabIndex={-1}
            className="pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20"
          ></button>
        )}
        <motion.div
          className="pointer-events-auto bg-white w-full sm:max-w-[400px] overflow-y-scroll absolute left-full  border px-16 flex flex-col"
          variants={navListVariants}
          style={{ height: "calc(100dvh - 67px)" }}
          animate={drawerOpen ? "show" : "hide"}
        >
          <div className="flex flex-col gap-16 py-16">
            {/* <Search onResultClick={() => onToggleDrawer(false)} /> */}

            <Menu
              align="end"
              offsetY={4}
              menuClassName="!p-8 !rounded-12"
              menuButton={
                <Button color="gray" size="sm">
                  <FiPlusCircle className="text-gray-600 mr-8" />
                  Write
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
          <SideNavigation />
          <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12  border-t pt-32 mt-auto">
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">About Us</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="mailto:team@peakshift.com">Contacts</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <Link to="/terms-conditions">Terms & Conditions</Link>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <Link to="/privacy-policy">Privacy Policy</Link>{" "}
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
