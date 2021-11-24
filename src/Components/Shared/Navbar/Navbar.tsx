import NavMobile from "./NavMobile";
import { FaHome } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import { IoExtensionPuzzle } from 'react-icons/io5';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsSearch } from "react-icons/bs";
import { FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GrClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { ModalId, openModal } from "../../../redux/features/modals.slice";

export const navLinks = [
    { text: "Explore", url: "/", icon: FaHome, color: 'text-primary-600' },
    { text: "Hottest", url: "/", icon: MdLocalFireDepartment, color: 'text-primary-600' },
    { text: "Categories", url: "/", icon: IoExtensionPuzzle, color: 'text-primary-600' },

]

export default function Navbar() {

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const { isWalletConnected } = useAppSelector(state => ({ isWalletConnected: state.wallet.isConnected }))

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
            modalId: ModalId.Login_ScanWallet
        }));
    }

    const onWithdraw = () => {
        dispatch(openModal({
            modalId: ModalId.Claim_FundWithdraw
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Make Search Request
        onSearch(searchInput)
    }

    return (
        <>
            <NavMobile onSearch={onSearch} />
            {/* Desktop Nav */}

            <nav className="hidden lg:flex py-36 px-32 items-center">
                <h2 className="text-h5 font-bold mr-40 lg:mr-64">makers.bolt.fun</h2>
                <ul className="flex gap-32 xl:gap-64">
                    {navLinks.map((link, idx) => <li key={idx} className="text-body4 hover:text-primary-600">
                        <a href={link.url}><link.icon className={`text-body2 align-middle inline-block mr-8 ${link.color}`} /> {link.text}</a></li>
                    )}

                </ul>
                <div className="ml-auto flex">
                    <motion.div
                        animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="flex">
                        <button className="btn btn-primary py-12 px-32 lg:px-40">Submit App️</button>
                        {isWalletConnected ?
                            <button className="btn ml-16 py-12 px-16 lg:px-20" onClick={onWithdraw}>2.2k Sats <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></button>
                            : <button className="btn ml-16 py-12 px-16 lg:px-20" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </button>
                        }
                    </motion.div>
                    <form onBlur={toggleSearch} className='relative flex items-center' onSubmit={handleSubmit}>
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
                    </form>
                </div>
            </nav>
        </>
    )
}
