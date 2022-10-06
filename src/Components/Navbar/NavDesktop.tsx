import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { useAppSelector, useCurrentSection } from "src/utils/hooks";
import ASSETS from "src/assets";
import IconButton from "../IconButton/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Menu,
    MenuItem,
    MenuButton,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { FiChevronDown } from "react-icons/fi";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";
import Button from "../Button/Button";


export default function NavDesktop() {
    const [searchOpen, setSearchOpen] = useState(false)



    const { curUser } = useAppSelector((state) => ({
        curUser: null,
    }));


    const openSearch = () => {
        setSearchOpen(true);
    };


    const currentSection = useCurrentSection();
    const navigate = useNavigate()


    return (
        <nav className="bg-white py-16 w-full min-w-full">
            <div className="content-container">
                <div className="flex items-center">
                    <Link to="/">
                        <h2 className="text-h5 font-bold mr-40 lg:mr-64">
                            <img className='h-40' src={ASSETS.Logo} alt="Bolt fun logo" />
                        </h2>
                    </Link>
                    <ul className="flex gap-32 xl:gap-64">
                        <li className="relative">
                            <Link to={'/projects'} className='text-body4 font-bold hover:text-primary-600'>
                                Projects
                            </Link>
                        </li>
                        <li className="relative">
                            <Link to={'/hackathons'} className='text-body4 font-bold hover:text-primary-600'>
                                Events
                            </Link>
                        </li>
                        {/* <li>
                            <Menu
                                offsetY={28}
                                menuButton={
                                    <MenuButton
                                        className='text-body4 font-bold hover:text-primary-600'>Community <FiChevronDown className="ml-8" />
                                    </MenuButton>
                                }
                                menuClassName='!rounded-12 !p-8 !border-gray-200'
                                menuStyle={{ border: '1px solid' }}
                            >
                                <MenuItem
                                    href={PAGES_ROUTES.blog.feed}
                                    onClick={(e) => {
                                        e.syntheticEvent.preventDefault();
                                        navigate(PAGES_ROUTES.blog.feed);
                                    }}
                                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12 '
                                >
                                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                                         <span className="text-body2">✍🏼</span>
                                    </div>
                                    <div>
                                        <p className="text-body4 text-black font-medium">
                                            Stories
                                        </p>
                                        <p className="text-body5 text-gray-600 mt-4">
                                            Tales from the maker community
                                        </p>
                                    </div>
                                </MenuItem>
                                <MenuItem

                                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12 opacity-40'
                                >
                                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                                        <span className="text-body2">💬</span>
                                    </div>
                                    <div>
                                        <p className="text-body4 text-black font-medium">
                                            Discussions
                                        </p>
                                        <p className="text-body5 text-gray-600 mt-4">
                                            Coming soon
                                        </p>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    href="/hackathons"
                                    onClick={(e) => {
                                        e.syntheticEvent.preventDefault();
                                        navigate("/hackathons");
                                    }}
                                    className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                                >
                                    <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                                        <span className="text-body2">🏆</span>
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
                            </Menu>
                        </li> */}
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

                    </motion.div>


                </div>
            </div>
        </nav>
    );
}
