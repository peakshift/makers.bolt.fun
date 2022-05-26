
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { toggleSearch } from "src/redux/features/ui.slice";
import { navLinks } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";
import { useEffect, useRef, useState } from "react";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useClickOutside, useToggle } from "@react-hookz/web";
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { FiChevronDown, FiSend } from "react-icons/fi";
import { MdComment, MdOutlineExplore, MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import { BiCoinStack } from "react-icons/bi";


export default function NavDesktop() {
    const dispatch = useAppDispatch();
    const [categoriesOpen, toggleCategories] = useToggle(false)
    const categoriesRef = useRef<HTMLLIElement>(null)
    useClickOutside(categoriesRef, () => toggleCategories(false))


    const { isWalletConnected, searchOpen } = useAppSelector((state) => ({
        isWalletConnected: state.wallet.isConnected,
        searchOpen: state.ui.isSearchOpen
    }));


    const handleSearchClick = () => {
        dispatch(toggleSearch())
    };



    const onConnectWallet = () => {
        dispatch(
            openModal({
                Modal: "Login_ScanningWalletCard",
            })
        );
    };

    const onWithdraw = () => {
        dispatch(
            openModal({
                Modal: "Claim_FundWithdrawCard",
            })
        );
    };

    const navigate = useNavigate()


    return (<nav className="bg-white w-full flex fixed h-[118px] top-0 left-0 py-36 px-32 items-center z-[2010]">
        <a href="https://bolt.fun/">
            <h2 className="text-h5 font-bold mr-40 lg:mr-64">
                <img className='h-40' src={ASSETS.Logo} alt="Bolt fun logo" />
            </h2>
        </a>
        <ul className="flex gap-32 xl:gap-64">
            <li>
                <Menu offsetY={24} menuClassName='!rounded-12' menuButton={<MenuButton className='text-body4 font-bold hover:text-primary-600'>LApps <FiChevronDown className="ml-8" /></MenuButton>}>
                    <MenuItem
                        href="/"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/");
                        }}
                        className='!px-24 !py-16 font-medium'
                    >
                        <MdOutlineExplore className={`text-body1 inline-block mr-12 text-primary-600 `} /> Explore
                    </MenuItem>
                    <MenuItem
                        href="/hottest"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/hottest");
                        }}
                        className='!px-24 !py-16 font-medium'
                    >
                        <MdOutlineLocalFireDepartment className={`text-body1 inline-block mr-12 text-primary-600 `} /> Hottest
                    </MenuItem>
                    <SubMenu
                        overflow="auto"
                        itemProps={{ className: '!p-0' }}
                        label={<div className='!px-24 !py-16 font-medium'><IoExtensionPuzzle className={`text-body1 inline-block mr-12 text-primary-600 `} /> Categories</div>}
                    >
                        <CategoriesList />
                    </SubMenu>
                    <MenuItem
                        href="https://airtable.com/shr2VkxarNsIFilDz"
                        target="_blank" rel="noopener noreferrer"
                        className='!px-24 !py-16 font-medium'
                    >
                        <FiSend className={`text-body1 inline-block mr-12 text-primary-600 `} />  Submit LApp
                    </MenuItem>
                </Menu>
            </li>
            <li>
                <Menu offsetY={24} menuClassName='!rounded-12' menuButton={<MenuButton className='text-body4 font-bold hover:text-primary-600'>Community <FiChevronDown className="ml-8" /></MenuButton>}>
                    <MenuItem
                        href="/blog"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/blog");
                        }}
                        className='!px-24 !py-16 font-medium'
                    >
                        <MdComment className={`text-body1 inline-block mr-12 text-primary-600 `} /> Stories
                    </MenuItem>
                    <MenuItem
                        href="/hackathons"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/hackathons");
                        }}
                        className='!px-24 !py-16 font-medium'
                    >
                        <IoMdTrophy className={`text-body1 inline-block mr-12 text-primary-600 `} /> Hackathons
                    </MenuItem>
                </Menu>
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
                <Link to={'/donate'} className='text-body4 font-bold hover:text-primary-600'>
                    Donate
                </Link>
            </li>
        </ul>

        <div className="ml-auto"></div>
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

            <IconButton className='ml-16 self-center' onClick={handleSearchClick}>
                <BsSearch className='scale-125 text-gray-400' />
            </IconButton>
        </motion.div>
        <Search />

    </nav>
    );
}
