
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
import { Link } from "react-router-dom";
import CategoriesList from "./CategoriesList/CategoriesList";
import { useEffect, useRef, useState } from "react";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useClickOutside, useToggle } from "@react-hookz/web";


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



    return (<nav className="bg-white w-full flex fixed h-[118px] top-0 left-0 py-36 px-32 items-center z-[2010]">
        <a href="https://bolt.fun/">
            <h2 className="text-h5 font-bold mr-40 lg:mr-64">
                <img className='h-40' src={ASSETS.Logo} alt="Bolt fun logo" />
            </h2>
        </a>
        <ul className="flex gap-32 xl:gap-64">
            {navLinks.map((link, idx) => <li key={idx} className=" relative">
                <Link to={link.url} className='text-body4 hover:text-primary-600'>
                    <link.icon className={`text-body2  inline-block mr-8 text-primary-600`} />
                    <span className="align-middle">{link.text}</span>
                </Link>
                {link.text === 'Categories' && <div className="absolute top-full left-0 w-[256px] border border-primary-50 rounded-8 shadow-2xl translate-y-16">
                    <CategoriesList />
                </div>}
            </li>
            )}
            <li
                ref={categoriesRef}
                className="relative cursor-pointer" onClick={() => toggleCategories(!categoriesOpen)}>
                <p className='text-body4 hover:text-primary-600'>
                    <IoExtensionPuzzle className={`text-body2  inline-block mr-8 text-primary-600`} />
                    <span className="align-middle">Categories</span>
                </p>
                {<motion.div
                    initial={{ opacity: 0, y: 200, display: 'none' }}
                    animate={categoriesOpen ? {
                        opacity: 1, y: 16, display: 'initial',
                        transition: { ease: 'easeOut' }
                    } : {
                        opacity: 0, y: 200,
                        transition: {
                            ease: "easeIn",
                            duration: .4
                        },
                        transitionEnd: {
                            display: 'none'
                        }
                    }}
                    className="absolute top-full left-0 w-[256px] border border-primary-50 rounded-8 shadow-2xl">
                    <CategoriesList />
                </motion.div>}
            </li>
        </ul>

        <div className="ml-auto"></div>
        <motion.div
            animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
            className="flex"
        >

            <Button
                color="primary"
                size="md"
                className="lg:px-40"
                href="https://form.jotform.com/220301236112030"
                newTab
            >
                Submit App️
            </Button>
            {/* {isWalletConnected ?
                            <Button className="ml-16 py-12 px-16 lg:px-20">Connected <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></Button>
                            : <Button className="ml-16 py-12 px-16 lg:px-20" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button>
                        } */}

            <IconButton className='ml-16 self-center' onClick={handleSearchClick}>
                <BsSearch className='scale-125 text-gray-400' />
            </IconButton>
        </motion.div>
        <Search />
        {/* <form onBlur={toggleSearch} className='relative flex items-center' onSubmit={handleSubmit}>
                        {searchOpen ? <GrClose onClick={toggleSearch} className='text-gray-500 w-24 h-24 mx-12 z-20 hover:cursor-pointer' /> : <BsSearch onClick={toggleSearch} className='text-gray-500 w-24 h-24 mx-12 z-20 hover:cursor-pointer' />}
                        {searchOpen && <motion.input
                            ref={inputRef}
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            initial={{ scaleX: .3, opacity: 0, originX: 'right' }}
                            animate={searchOpen ? { scaleX: 1, opacity: 1, originX: 'right' } : { scaleX: .3, opacity: 0, originX: 'right' }}
                            onAnimationComplete={() => {
                                if (searchOpen) inputRef.current?.focus()
                            }}
                            className="absolute top-0 right-0 z-10 bg-gray-100 text-gray-600 focus:outline-primary w-[300px] py-12 px-20 pr-40 rounded-24 placeholder-gray-500" placeholder="Search" />
                        }
                    </form> */}

    </nav>
    );
}
