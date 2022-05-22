import NavMobile from "./NavMobile";
import { MdComment, MdHomeFilled, MdLocalFireDepartment } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { setNavHeight } from "src/redux/features/ui.slice";
import NavDesktop from "./NavDesktop";
import { useMediaQuery } from "@react-hookz/web";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import { IoMdTrophy } from "react-icons/io";


export const navLinks = [
  { text: "Explore", url: "/", icon: MdHomeFilled, color: "text-primary-600" },
  {
    text: "Blog",
    url: "/blog",
    icon: MdComment,
    color: "text-primary-600",
  },
  {
    text: "Hackathons",
    url: "/hackathons",
    icon: IoMdTrophy,
    color: "text-primary-600",
  },
  {
    text: "Hottest",
    url: "/hottest",
    icon: MdLocalFireDepartment,
    color: "text-primary-600",
  },
  // {
  //   text: "Categories",
  //   url: "/categories",
  //   icon: IoExtensionPuzzle,
  //   color: "text-primary-600",
  // },
];

export default function Navbar() {

  const dispatch = useAppDispatch();
  const { isWalletConnected, isMobileScreen } = useAppSelector((state) => ({
    isWalletConnected: state.wallet.isConnected,
    isMobileScreen: state.ui.isMobileScreen
  }));

  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isLarge)
  console.log(isLargeScreen, MEDIA_QUERIES.isLarge);


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


  useEffect(() => {
    const nav = document.querySelector("nav");

    let oldPadding = '';
    if (nav) {
      const navStyles = getComputedStyle(nav);
      if (navStyles.display !== "none") {
        dispatch(setNavHeight(nav.clientHeight));
        oldPadding = document.body.style.paddingTop
        document.body.style.paddingTop = `${nav.clientHeight}px`;
      }
    }

    return () => {
      document.body.style.paddingTop = oldPadding
    }

  }, [dispatch, isMobileScreen, isLargeScreen])




  return (
    <>
      {(isMobileScreen || !isLargeScreen) ?
        <NavMobile />
        :
        <NavDesktop />
      }
    </>
  );
}
