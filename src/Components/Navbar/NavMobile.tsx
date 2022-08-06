import { motion } from "framer-motion";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { useAppSelector } from "src/utils/hooks";
import { FiMenu, } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "@react-hookz/web";
import styles from './styles.module.css'
import '@szhsin/react-menu/dist/index.css';
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing";

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
    opacity: 1, y: 0, display: 'block',
    transition: { ease: 'easeOut' }
  },
  closed: {
    opacity: 0, y: -50,
    transition: {
      ease: "easeIn",
      duration: .2
    },
    transitionEnd: {
      display: 'none'
    }
  }
}

const listArrowVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 }
}


export default function NavMobile() {


  const [drawerOpen, toggleDrawerOpen] = useToggle(false);
  const [communityOpen, toggleCommunityOpen] = useToggle(false)

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));
  const navigate = useNavigate()

  useEffect(() => {
    if (drawerOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "initial";
  }, [drawerOpen]);



  return (
    <div className={`${styles.navMobile}`}>
      <nav className={`bg-white h-[67px] w-full py-16`}>
        <div className="content-container flex justify-between items-center">

          <div className="flex-1 flex content-start">
            <IconButton className='auto text-2xl w-[50px] h-[50px] hover:bg-gray-200 self-center' onClick={() => toggleDrawerOpen()}>
              {!drawerOpen ? (<motion.div key={drawerOpen ? 1 : 0} variants={navBtnVariant} initial='menuHide' animate='menuShow'><FiMenu /></motion.div>)
                : (<motion.div key={drawerOpen ? 1 : 0} variants={navBtnVariant} initial='closeHide' animate='closeShow'><GrClose /></motion.div>)}
            </IconButton>

          </div>

          <div className="flex-[2] flex justify-center">
            <Link to="/">
              <img className='max-h-32' src={ASSETS.Logo} alt="Bolt fun logo" />
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            {curUser !== undefined &&
              (curUser &&
                <Menu
                  menuClassName='!p-8 !rounded-12'
                  menuButton={<MenuButton ><Avatar src={curUser.avatar} width={32} /> </MenuButton>}>
                  <MenuItem
                    href={createRoute({ type: 'profile', id: curUser.id, username: curUser.name })}
                    onClick={(e) => {
                      e.syntheticEvent.preventDefault();
                      navigate(createRoute({ type: 'profile', id: curUser.id, username: curUser.name }));
                    }}
                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                  >
                    👾 Profile
                  </MenuItem>
                  <MenuItem
                    href="/edit-profile"
                    onClick={(e) => {
                      e.syntheticEvent.preventDefault();
                      navigate("/edit-profile");
                    }}
                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                  >
                    ⚙️ Settings
                  </MenuItem>
                  <MenuItem
                    href="/logout"
                    onClick={(e) => {
                      e.syntheticEvent.preventDefault();
                      navigate("/logout");
                    }}
                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                  >
                    👋 Logout
                  </MenuItem>
                </Menu>

              )
            }</div>

        </div>
      </nav>

      <div className="fixed left-0 top-[67px] pointer-events-none z-[2010] w-full min-h-[calc(100vh-67px)]">
        {drawerOpen && (
          <div
            onClick={() => toggleDrawerOpen()}
            className="pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20"
          ></div>
        )}
        <motion.div
          className="pointer-events-auto bg-white w-full sm:max-w-[400px] overflow-y-scroll absolute left-full  border px-16 flex flex-col"
          variants={navListVariants}
          style={{ height: 'calc(100vh - 67px)' }}
          animate={drawerOpen ? "show" : "hide"}
        >
          <div className="flex flex-col gap-16 py-16">
            <Search onResultClick={() => toggleDrawerOpen(false)} />
            {
              curUser ?
                <Button
                  color="gray"
                  fullWidth
                  className="!py-16 px-40 rounded-12 "
                  href='/logout'
                  onClick={() => toggleDrawerOpen()}
                >
                  Logout
                </Button> :
                <Button
                  color="primary"
                  fullWidth
                  className="!py-16 px-40 rounded-12 "
                  href='/login'
                  onClick={() => toggleDrawerOpen()}
                >
                  Connect your lightning wallet ⚡️
                </Button>
            }
          </div>
          <ul className="px-32 flex flex-col py-16 gap-32 border-t">

            <li className="relative">
              <Link
                to={'/apps'}
                onClick={() => toggleDrawerOpen(false)}
                className='text-body4 font-bold hover:text-primary-600'>
                Apps
              </Link>
            </li>
            <li>
              <button
                className='text-body4 font-bold hover:text-primary-600 w-full flex justify-between'
                onClick={() => toggleCommunityOpen()}
              >Community
                <motion.span
                  variants={listArrowVariants}
                  initial={'closed'}
                  animate={communityOpen ? 'open' : 'closed'}
                  className="ml-auto">
                  <BsChevronDown className=" text-gray-400" />
                </motion.span>
              </button>
              {<motion.div
                variants={categoriesListVariants}
                initial={'closed'}
                animate={communityOpen ? 'open' : 'closed'}
              >
                <div className='flex flex-col gap-24 pt-16'    >
                  <Link
                    to="/blog"
                    onClick={() => toggleDrawerOpen(false)}
                    className='font-medium flex gap-16 !rounded-12 '
                  >
                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                      <span className="text-body2">✍🏼</span>
                    </div>
                    <div>
                      <p className="text-body4 text-black font-medium">
                        Stories
                      </p>
                      <p className="text-body5 font-normal text-gray-600 mt-4">
                        Tales from the maker community
                      </p>
                    </div>
                  </Link>
                  <div

                    className='font-medium flex gap-16 !rounded-12 opacity-60'
                  >
                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                      <span className="text-body2">💬</span>
                    </div>
                    <div>
                      <p className="text-body4 text-black font-medium">
                        Discussions
                      </p>
                      <p className="text-body5 font-normal text-gray-600 mt-4">
                        Coming soon
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/hackathons"
                    onClick={() => toggleDrawerOpen(false)}
                    className='font-medium flex gap-16 !rounded-12'
                  >
                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                      <span className="text-body2">🏆</span>
                    </div>
                    <div>
                      <p className="text-body4 text-black font-medium">
                        Hackathons
                      </p>
                      <p className="text-body5 font-normal text-gray-600 mt-4">
                        Take part in hackathons & tournaments
                      </p>
                    </div>
                  </Link>
                </div>
              </motion.div>}
            </li>
            <li className="relative">
              <a
                href={'https://bolt.fun/guide/'}
                target="_blank"
                rel="noreferrer"
                className='text-body4 font-bold hover:text-primary-600'
              >
                Guide
              </a>
            </li>
            <li className="relative">
              <Link
                to={'/donate'}
                onClick={() => toggleDrawerOpen(false)}
                className='text-body4 font-bold hover:text-primary-600'>
                Donate
              </Link>
            </li>
          </ul>
          <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12  border-t pt-32 mt-auto">
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">About Us</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Support</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Press</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Contacts</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Careers</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Sitemap</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Legal</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/">Cookies Settings</a>
            </li>

          </ul>
        </motion.div>
      </div>
    </div>
  );
}
