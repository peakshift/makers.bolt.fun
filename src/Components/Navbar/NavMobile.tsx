import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { toggleSearch } from "src/redux/features/ui.slice";
import { FiAward, FiChevronDown, FiFeather, FiMenu, FiMic, } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "@react-hookz/web";
import styles from './styles.module.css'
import { Menu, MenuButton, MenuItem, } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';

interface Props {
}


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


export default function NavMobile({ }: Props) {
  const dispatch = useAppDispatch();
  const { searchOpen } = useAppSelector((state) => ({
    isWalletConnected: state.wallet.isConnected,
    searchOpen: state.ui.isSearchOpen
  }));

  const [drawerOpen, toggleDrawerOpen] = useToggle(false);
  const [communityOpen, toggleCommunityOpen] = useToggle(false)




  useEffect(() => {
    if (drawerOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "initial";
  }, [drawerOpen]);



  const handleSearchClick = () => {
    toggleDrawerOpen(false)
    dispatch(toggleSearch())
  };




  return (
    <div className={`${styles.navMobile} w-screen z-[2010]`}>
      <nav className={`bg-white fixed top-0 left-0  h-[67px] w-full p-16 px-32 flex justify-between items-center z-[2010]`}>
        {/* <div className="w-40 h-40 bg-gray-100 rounded-8 mr-auto">
                    <img className="w-full h-full object-cover" src="https://www.figma.com/file/OFowr5RJk9YZCW35KT7D5K/image/07b85d84145942255afd215b3da26dbbf1dd03bd?fuid=772401335362859303" alt="" />
                </div> */}
        <a href="https://bolt.fun/">
          <img className='h-32' src={ASSETS.Logo} alt="Bolt fun logo" />
        </a>

        <div className="ml-auto"></div>
        <motion.div
          animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
          className="flex"
        >
          {/* <IconButton className='ml-8  self-center' onClick={handleSearchClick}>
            <BsSearch className="text-gray-400" />
          </IconButton> */}
          <IconButton className='auto text-2xl w-[50px] h-[50px] hover:bg-gray-200 self-center' onClick={() => toggleDrawerOpen()}>
            {!drawerOpen ? (<motion.div key={drawerOpen ? 1 : 0} variants={navBtnVariant} initial='menuHide' animate='menuShow'><FiMenu /></motion.div>)
              : (<motion.div key={drawerOpen ? 1 : 0} variants={navBtnVariant} initial='closeHide' animate='closeShow'><GrClose /></motion.div>)}
          </IconButton>
        </motion.div>
        <Search width='calc(100vw - 64px)' />

      </nav>

      <div className="fixed  left-0 pointer-events-none z-[2010] w-full min-h-[calc(100vh-76px)]">
        {drawerOpen && (
          <div
            onClick={() => toggleDrawerOpen()}
            className="pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20"
          ></div>
        )}
        <motion.div
          className="pointer-events-auto bg-white w-full sm:max-w-[400px] overflow-y-scroll absolute left-full  border shadow-2xl px-16 flex flex-col"
          variants={navListVariants}
          style={{ height: 'calc(100vh - 67px)' }}
          animate={drawerOpen ? "show" : "hide"}
        >
          <div className="flex flex-col gap-16 py-16">
            <a
              href="https://airtable.com/shr2VkxarNsIFilDz"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                color="primary"
                fullWidth
                className="py-12 px-40 rounded-24 "
              >
                Submit LApp️
              </Button>
            </a>

            <Button
              color='white'
              fullWidth
              className="py-12 px-40 rounded-24"
              onClick={() => handleSearchClick()}

            >
              <BsSearch className='inline-block transform scale-125' />
              <span className="align-middle"> Search Apps</span>
            </Button>
            {/* <Button color='gray' fullWidth className="py-12 px-40 rounded-24 my-16"> <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button> */}
          </div>
          <ul className="px-32 flex flex-col py-16 gap-32 border-t">
            {/* {navLinks.map((link, idx) => <li key={idx} className="text-body3 p-16 active:bg-gray-200">
              <Link to={link.url} onClick={() => toggleDrawerOpen(false)}><link.icon className={`text-body2  inline-block mr-12 text-primary-600`} /> <span className="align-middle">{link.text}</span> </Link></li>
            )} */}
            <li className="relative">
              <Link
                to={'/products'}
                onClick={() => toggleDrawerOpen(false)}
                className='text-body4 font-bold hover:text-primary-600'>
                Products
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
                      <FiFeather className={`text-body1 inline-block text-primary-600 `} />
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
                  <p

                    className='font-medium flex gap-16 !rounded-12 opacity-60'
                  >
                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                      <FiMic className={`text-body1 inline-block text-primary-600 `} />
                    </div>
                    <div>
                      <p className="text-body4 text-black font-medium">
                        Discussions
                      </p>
                      <p className="text-body5 font-normal text-gray-600 mt-4">
                        Coming soon
                      </p>
                    </div>
                  </p>
                  <Link
                    to="/hackathons"
                    onClick={() => toggleDrawerOpen(false)}
                    className='font-medium flex gap-16 !rounded-12'
                  >
                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                      <FiAward className={`text-body1 inline-block text-primary-600 `} />
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
