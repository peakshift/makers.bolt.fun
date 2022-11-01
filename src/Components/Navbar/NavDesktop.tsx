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
                    <Button color="primary" size="sm" className="ml-auto">Submit project</Button>

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
