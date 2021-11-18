import NavMobile from "./NavMobile";
import { FaHome } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import { IoExtensionPuzzle } from 'react-icons/io5';
import { AiFillThunderbolt } from 'react-icons/ai';

export const navLinks = [
    { text: "Explore", url: "/", icon: FaHome, color: 'text-primary-600' },
    { text: "Hottest", url: "/", icon: MdLocalFireDepartment, color: 'text-primary-600' },
    { text: "Categories", url: "/", icon: IoExtensionPuzzle, color: 'text-primary-600' },

]

export default function Navbar() {

    return (
        <>
            <NavMobile />
            {/* Desktop Nav */}

            <nav className="hidden lg:flex py-36 px-32 items-center">
                <h2 className="text-h5 font-bold mr-40 lg:mr-64">makers.bolt.fun</h2>
                <ul className="flex gap-32 lg:gap-64">
                    {navLinks.map((link, idx) => <li key={idx} className="text-body4 hover:text-primary-600">
                        <a href={link.url}><link.icon className={`text-body2 align-middle inline-block mr-8 ${link.color}`} /> {link.text}</a></li>
                    )}

                </ul>
                <div className="ml-auto">
                    <button className="btn btn-primary py-12 px-32 lg:px-40">Submit <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> app️</button>
                    <span className="chip mx-12 h-full mr-24 p-12"><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> 2.2k sats </span>
                </div>
            </nav>
        </>
    )
}
