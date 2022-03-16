import NavMobile from "./NavMobile";
import { MdHomeFilled, MdLocalFireDepartment } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { setNavHeight } from "src/redux/features/ui.slice";
import { useResizeListener } from "src/utils/hooks";
import NavDesktop from "./NavDesktop";
import { useMediaQuery } from "@react-hookz/web";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";

export const navLinks = [
  { text: "Explore", url: "/", icon: MdHomeFilled, color: "text-primary-600" },
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



  const resizeCb = useCallback(
    () => {
      const nav = document.querySelector("nav");
      if (nav) {
        const navStyles = getComputedStyle(nav);
        if (navStyles.display !== "none") {
          dispatch(setNavHeight(nav.clientHeight));
          document.body.style.paddingTop = `${nav.clientHeight}px`;
        }
      }
    },
    [dispatch],
  )
  useResizeListener(resizeCb);


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
