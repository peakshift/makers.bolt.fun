import { useCallback, useEffect, useRef, useState, } from "react";
import { useAppDispatch, useAppSelector, useCurrentSection, useMediaQuery, useResizeListener } from "src/utils/hooks";
import { setNavHeight } from "src/redux/features/ui.slice";
import NavDesktop from "./NavDesktop";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import { FiArrowRight } from "react-icons/fi";
import { BiRocket } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";
import { motion } from "framer-motion";
import throttle from "lodash.throttle";


export const navLinks = [];


export default function Navbar() {

  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme)
  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isLarge)

  const [navTransparent, setNavTransparent] = useState(true);
  const isNavTransparentRef = useRef(true);

  isNavTransparentRef.current = navTransparent;

  const updateNavHeight = useCallback(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      const navStyles = getComputedStyle(nav);
      if (navStyles.display !== "none") {
        dispatch(setNavHeight(nav.clientHeight));
        document.documentElement.style.setProperty('--navHeight', nav.clientHeight + 'px')
      }
    }
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    const inTop = window.scrollY < 10;
    if (inTop && !isNavTransparentRef.current) setNavTransparent(true);
    if (!inTop && isNavTransparentRef.current) setNavTransparent(false);
  }, [])

  useEffect(() => {
    updateNavHeight();
    handleScroll();

    const throttledScrollHandler = throttle(handleScroll, 500)

    document.addEventListener('scroll', throttledScrollHandler)

    return () => {
      document.removeEventListener('scroll', throttledScrollHandler);
    }
  }, [handleScroll, updateNavHeight]);

  useResizeListener(updateNavHeight)


  const currentSection = useCurrentSection();


  const CTA = currentSection === 'about' ?
    <Link to={PAGES_ROUTES.projects.default}
      className="font-bold text-center px-12 py-8 rounded-8 text-primary-400 hover:bg-primary-200 hover:bg-opacity-10"
    >Go explore <FiArrowRight className="ml-4" /></Link>
    :
    <a href="https://airtable.com/shrlL6c8benYf86zB"
      target='_blank' rel="noreferrer"
      className="font-bold text-center px-12 py-8 rounded-8 text-primary-600 hover:bg-primary-200 hover:bg-opacity-10"
    >Submit project <BiRocket className="ml-4" /></a>



  const bgColor = theme === 'dark' ? "rgba(16 24 40,1)" : "rgba(255 255 255,1)";
  const bgColorTrans = theme === 'dark' ? "rgba(16 24 40,0)" : "rgba(255 255 255,0)";


  return (
    <motion.header
      animate={navTransparent ? { background: bgColorTrans } : { background: bgColor, }}
      className={`
    fixed top-0 left-0 w-full z-[2010] block
    ${theme === 'dark' ? "text-white" : "text-gray-900"}
    `}>
      <NavDesktop cta={CTA} />
    </motion.header>
  );
}

