import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { useAppSelector, useCurrentSection } from "src/utils/hooks";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
    Menu,
    MenuItem,
    MenuButton,
    useMenuState,
    ControlledMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { FiAward, FiChevronDown, FiFeather, FiLogIn, FiMic } from "react-icons/fi";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";


export default function NavDesktop() {
    const [searchOpen, setSearchOpen] = useState(false)
    const communityRef = useRef(null);
    const [communitymenuProps, toggleCommunityMenu] = useMenuState({ transition: true });



    const { isWalletConnected, curUser } = useAppSelector((state) => ({
        isWalletConnected: state.wallet.isConnected,
        curUser: state.user.me,
    }));


    const openSearch = () => {
        setSearchOpen(true);
    };


    const currentSection = useCurrentSection();
    const navigate = useNavigate()


    return (<nav className="bg-white w-full flex fixed  top-0 left-0 py-16 px-32 items-center z-[2010]">
        <a href="https://bolt.fun/">
            <h2 className="text-h5 font-bold mr-40 lg:mr-64">
                <img className='h-40' src={ASSETS.Logo} alt="Bolt fun logo" />
            </h2>
        </a>
        <ul className="flex gap-32 xl:gap-64">
            <li className="relative">
                <Link to={'/products'} className='text-body4 font-bold hover:text-primary-600'>
                    Products
                </Link>
            </li>
            <li>
                <button
                    ref={communityRef}
                    onMouseEnter={() => toggleCommunityMenu(true)}
                    className='text-body4 font-bold hover:text-primary-600'>Community <FiChevronDown className="ml-8" /></button>
                <ControlledMenu {...communitymenuProps}
                    anchorRef={communityRef}
                    offsetY={28}
                    onMouseLeave={() => toggleCommunityMenu(false)}
                    onClose={() => toggleCommunityMenu(false)}
                    menuClassName='!rounded-12 !p-8 !border-gray-200'
                    menuStyle={{ border: '1px solid' }}
                >
                    <MenuItem
                        href="/blog"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/blog");
                        }}
                        className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12 '
                    >
                        <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                            <FiFeather className={`text-body1 inline-block text-primary-600 `} />
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

                        className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12 opacity-60'
                    >
                        <div className="bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                            <FiMic className={`text-body1 inline-block text-primary-600 `} />
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
                            <FiAward className={`text-body1 inline-block text-primary-600 `} />
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
                </ControlledMenu>
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

            {currentSection === 'products' && <IconButton className='mr-16 self-center' onClick={openSearch}>
                <BsSearch className='scale-125 text-gray-400' />
            </IconButton>}
        </motion.div>
        {curUser !== undefined &&
            (curUser ?
                <Menu
                    menuClassName='!p-8 !rounded-12'
                    menuButton={<MenuButton ><Avatar src={curUser.avatar} width={40} /> </MenuButton>}>
                    <MenuItem
                        href={`/profile/${curUser.id}`}
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate(`/profile/${curUser.id}`);
                        }}
                        className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        href="/logout"
                        onClick={(e) => {
                            e.syntheticEvent.preventDefault();
                            navigate("/logout");
                        }}
                        className='!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12'
                    >
                        Logout
                    </MenuItem>
                </Menu>

                :
                <Link to='/login' className="font-bold hover:text-primary-800 hover:underline">
                    Login <FiLogIn />
                </Link>)
        }
        <div className="relative h-24">
            <motion.div
                initial={{
                    opacity: 0,
                    x: '100%'
                }}
                animate={searchOpen ? {
                    opacity: 1,
                    x: '0',
                    transition: { type: "spring", stiffness: 70 }

                } : {
                    opacity: 0,
                    x: '100%',
                    transition: {
                        ease: "easeIn"
                    }
                }}
                className='absolute top-0 right-0 flex items-center h-full'
            >
                <Search
                    width={326}
                    isOpen={searchOpen}
                    onClose={() => setSearchOpen(false)}
                    onResultClick={() => setSearchOpen(false)}
                />
            </motion.div>
        </div>
    </nav>
    );
}
