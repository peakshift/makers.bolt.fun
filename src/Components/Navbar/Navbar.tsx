
import NavMobile from "./NavMobile";
import { MdComment, MdHomeFilled, MdLocalFireDepartment } from "react-icons/md";
import { useCallback, useEffect, } from "react";
import { useAppDispatch, useCurrentSection, useMediaQuery, useResizeListener } from "src/utils/hooks";
import { setNavHeight } from "src/redux/features/ui.slice";
import NavDesktop from "./NavDesktop";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import { IoMdTrophy } from "react-icons/io";
import Button from "../Button/Button";
import { FiArrowRight } from "react-icons/fi";
import { BiRocket } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";


export const navLinks = [];


export default function Navbar() {

  const dispatch = useAppDispatch();

  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isLarge)

  const updateNavHeight = useCallback(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      const navStyles = getComputedStyle(nav);
      if (navStyles.display !== "none") {
        dispatch(setNavHeight(nav.clientHeight));
        document.documentElement.style.setProperty('--navHeight', nav.clientHeight + 'px')
      }
    }
  }, [dispatch])

  useEffect(() => {
    updateNavHeight();
  }, [updateNavHeight]);

  useResizeListener(updateNavHeight)


  const currentSection = useCurrentSection();

  const darkNav = currentSection === 'about'

  const CTA = darkNav ?
    <Link to={PAGES_ROUTES.projects.default}
      className="font-bold text-center px-12 py-8 rounded-8 text-primary-400 hover:bg-primary-200 hover:bg-opacity-10"
    >Go explore <FiArrowRight className="ml-4" /></Link>
    :
    <a href="https://airtable.com"
      target='_blank' rel="noreferrer"
      className="font-bold text-center px-12 py-8 rounded-8 text-primary-600 hover:bg-primary-200 hover:bg-opacity-10"
    >Submit project <BiRocket className="ml-4" /></a>




  return (
    <div className={`
    sticky top-0 left-0 w-full z-[2010] 
    ${darkNav ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    `}>
      <NavDesktop cta={CTA} />
    </div>
  );
}
