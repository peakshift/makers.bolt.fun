import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { toggleSearch } from "src/redux/features/ui.slice";

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

interface Props {
}

export default function NavMobile({ }: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { searchOpen } = useAppSelector((state) => ({
    isWalletConnected: state.wallet.isConnected,
    searchOpen: state.ui.isSearchOpen
  }));



  const handleClick = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    if (open) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "initial";
  }, [open]);



  const handleSearchClick = () => {
    dispatch(toggleSearch())
  };




  return (
    <div className="w-screen z-[2010]">
      <nav className="bg-white fixed top-0 left-0  h-[67px] w-full p-16 px-32 flex justify-between items-center z-[2010]">
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
          <Button size="sm"
            color="primary"
            className="rounded-24"
            href="https://form.jotform.com/220301236112030"
            newTab>
            Submit App️
          </Button>
          <IconButton className='ml-8  self-center' onClick={handleSearchClick}>
            <BsSearch className="text-gray-400" />
          </IconButton>
        </motion.div>
        <Search width='calc(100vw - 64px)' />

        {/* <button className='rounded-full ml-auto text-2xl w-[50px] h-[50px] hover:bg-gray-200' onClick={handleClick}>

                    {!open ? (<motion.div key={open ? 1 : 0} variants={navBtnVariant} initial='menuHide' animate='menuShow'><FiMenu /></motion.div>)
                        : (<motion.div key={open ? 1 : 0} variants={navBtnVariant} initial='closeHide' animate='closeShow'><GrClose /></motion.div>)}
                </button> */}
      </nav>

      <div className="fixed  left-0 pointer-events-none z-[2010] w-full min-h-[calc(100vh-76px)]">
        {open && (
          <div
            onClick={handleClick}
            className="pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20"
          ></div>
        )}
        <motion.div
          className="pointer-events-auto bg-white w-full sm:max-w-[400px] min-h-full absolute left-full  border shadow-2xl pt-32 sm:p-32 flex flex-col"
          variants={navListVariants}
          animate={open ? "show" : "hide"}
        >
          <div className="px-16">
            {/* <form className='relative' onSubmit={handleSubmit}>
                            <BsSearch className='absolute top-1/2 left-20 transform -translate-x-1/2  -translate-y-1/2 text-gray-500' />
                            <input
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                className="bg-gray-100 text-gray-600 focus:outline-primary w-full py-12 px-20 pl-40 rounded-24 placeholder-gray-500" placeholder="Search" />

                            <input className="btn bg-gray-100 w-full  rounded-24 mt-16 placeholder-gray-500" placeholder="Search" />
                        </form> */}
            <a
              href="https://form.jotform.com/220301236112030"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                color="primary"
                fullWidth
                className="py-12 px-40 rounded-24 mt-40"
              >
                Submit App️
              </Button>
            </a>
            {/* <Button color='gray' fullWidth className="py-12 px-40 rounded-24 my-16"> <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button> */}
          </div>
          {/* <ul className="py-16 gap-64 border-t">
                        {navLinks.map((link, idx) => <li key={idx} className="text-body3 p-16 hover:bg-gray-200">
                            <Link to={link.url}><link.icon className={`text-body2  inline-block mr-12 ${link.color}`} /> {link.text} </Link></li>
                        )}
                    </ul> */}
          <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12  border-t mt-32">
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
