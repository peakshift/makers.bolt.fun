import NavMobile from "./NavMobile";
import { FaHome } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import { IoExtensionPuzzle } from 'react-icons/io5';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsSearch } from "react-icons/bs";
import { FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GrClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { setNavHeight } from "src/redux/features/theme.slice";
import { useResizeListener } from 'src/utils/hooks'

export const navLinks = [
    { text: "Explore", url: "/", icon: FaHome, color: 'text-primary-600' },
    { text: "Hottest", url: "/categories/hottest", icon: MdLocalFireDepartment, color: 'text-primary-600' },
    { text: "Categories", url: "/categories", icon: IoExtensionPuzzle, color: 'text-primary-600' },

]

export default function Navbar() {

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const { isWalletConnected } = useAppSelector(state => ({
        isWalletConnected: state.wallet.isConnected,
    }));

    const toggleSearch = () => {
        if (!searchOpen) {
            console.log(inputRef.current);
            inputRef.current?.focus();

        }
        setSearchOpen(!searchOpen);
    }

    const onSearch = (search: string) => {
        // Make Search Request
        alert(`Your Searched for: ${search}`)
    }

    const onConnectWallet = () => {
        dispatch(openModal({
            Modal: 'Login_ScanningWalletCard'
        }));
    }

    const onWithdraw = () => {
        dispatch(openModal({
            Modal: 'Claim_FundWithdrawCard'
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Make Search Request
        onSearch(searchInput)
    }


    useResizeListener(function calcNavHeight() {
        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => {
            const navStyles = getComputedStyle(nav);
            if (navStyles.display !== 'none') {
                dispatch(setNavHeight(nav.clientHeight))
                document.body.style.paddingTop = `${nav.clientHeight}px`
            }
        });
    }, [])


    return (
        <>
            {/* Mobile Nav */}
            <NavMobile onSearch={onSearch} />

            {/* Desktop Nav */}
            <nav className="hidden bg-white w-full lg:flex fixed top-0 left-0 py-36 px-32 items-center z-[2010]">
                <Link to='/'><h2 className="text-h5 font-bold mr-40 lg:mr-64">makers.bolt.fun</h2></Link>
                {/* <ul className="flex gap-32 xl:gap-64">
                    {navLinks.map((link, idx) => <li key={idx} className="text-body4 hover:text-primary-600">
                        <Link to={link.url}><link.icon className={`text-body2 align-middle inline-block mr-8 ${link.color}`} /> {link.text}</Link></li>
                    )}

                </ul> */}
                <div className="ml-auto flex">
                    <motion.div
                        animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="flex">
                        <Button color='primary' size='md' className="lg:px-40">Submit App️</Button>
                        {/* {isWalletConnected ?
                            <Button className="ml-16 py-12 px-16 lg:px-20">Connected <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></Button>
                            : <Button className="ml-16 py-12 px-16 lg:px-20" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button>
                        } */}
                    </motion.div>
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
                </div>
            </nav>
        </>
    )
}
