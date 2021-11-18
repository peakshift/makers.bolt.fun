import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs'
import { navLinks } from "./Navbar";
import { AiFillThunderbolt } from 'react-icons/ai';

const navBtnVariant = {
    menuHide: { rotate: 90, opacity: 0 },
    menuShow: { rotate: 0, opacity: 1 },
    closeHide: { rotate: -90, opacity: 0 },
    closeShow: { rotate: 0, opacity: 1 },
}
const navListVariants = {
    init: { x: 0 },
    show: { x: "-100%" },
    hide: { x: 0 }
}


export default function NavMobile() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        if (open)
            document.body.classList.remove('overflow-y-hidden')
        else
            document.body.classList.add('overflow-y-hidden')
        setOpen(open => !open);
    }

    return (
        <nav className='block lg:hidden overflow-hidden z-[2010]'>
            <div className="p-16   w-screen flex items-center">
                <div className="w-40 h-40 bg-gray-100 rounded-8 mr-16 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://www.figma.com/file/OFowr5RJk9YZCW35KT7D5K/image/07b85d84145942255afd215b3da26dbbf1dd03bd?fuid=772401335362859303" alt="" />
                </div>
                <h2 className="text-h5 font-bold mr-64">makers.bolt.fun</h2>
                <button className='rounded-full ml-auto mr-16 text-2xl w-[50px] h-[50px] hover:bg-gray-200' onClick={handleClick}>

                    {!open ? (<motion.div key={open ? 1 : 0} variants={navBtnVariant} initial='menuHide' animate='menuShow'><FiMenu /></motion.div>)
                        : (<motion.div key={open ? 1 : 0} variants={navBtnVariant} initial='closeHide' animate='closeShow'><GrClose /></motion.div>)}
                </button>
            </div>

            <div className="fixed overflow-hidden left-0 pointer-events-none z-[2010] w-full min-h-[calc(100vh-76px)]">
                {open && <div onClick={handleClick} className='pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20'>

                </div>}
                <motion.div
                    className="pointer-events-auto bg-white w-full sm:max-w-[400px] min-h-full absolute left-full  border shadow-2xl sm:p-32 flex flex-col"
                    variants={navListVariants}
                    animate={open ? "show" : "hide"}
                >
                    <div className="px-16">
                        <div className='relative'>
                            <BsSearch className='absolute top-1/2 left-20 transform -translate-x-1/2  -translatey-1/2 text-gray-500' />
                            <input className="btn bg-gray-100 w-full py-12 px-40 rounded-24 mt-16 placeholder-gray-500" placeholder="Search" />
                        </div>
                        <button className="btn btn-primary w-full py-12 px-40 rounded-24 my-16">Submit <AiFillThunderbolt className='inline-block text-thunder transform scale-125' />  app️</button>
                    </div>
                    <ul className="py-16 gap-64 border-t">
                        {navLinks.map((link, idx) => <li key={idx} className="text-body3 p-16 hover:bg-gray-200">
                            <a href={link.url}><link.icon className={`text-body2  inline-block mr-12 ${link.color}`} /> {link.text} </a></li>
                        )}
                    </ul>
                    <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12  border-t mt-auto">
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">About Us</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Support</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Press</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Contacts</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Careers</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Sitemap</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Legal</a></li>
                        <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2"><a href="/">Cookies Settings</a></li>
                    </ul>
                </motion.div>
            </div>

        </nav>
    )
}
