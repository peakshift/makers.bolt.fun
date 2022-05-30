import { useMediaQuery } from "@react-hookz/web";
import Carousel from "react-multi-carousel";
import Assets from "src/assets";
import Button from "src/Components/Button/Button";
import THEME from "src/utils/theme";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import CustomDot from "./CustomDot/CustomDot";
import styles from './styles.module.css'

const headerLinks = [
  {
    title: <p className="text-body1 font-bolder text-white">Explore a fun directory of lightning web apps</p>,
    img: Assets.Images_ExploreHeader1,
    link: {
      content: "Submit app",
      url: "https://form.jotform.com/220301236112030",
    },
  },
  {
    title:
      <>
        <p className="text-body1 font-bolder text-white">Take part in BOLT🔩FUN’s Shock the Web 2 ⚡️</p>
        <p className="text-body3 font-medium text-white mt-8">22nd - 28th March, 2022</p>
      </>,
    img: Assets.Images_ExploreHeader2,
    link: {
      content: "Register Now",
      url: "https://bolt.fun/hackathons/shock-the-web-2/",
    },
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: THEME.screens.md },
    items: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1
  }
}


export default function Header() {

  const isDesktop = useMediaQuery(MEDIA_QUERIES.isMedium);

  return (
    <Carousel
      showDots={!isDesktop}
      arrows={false}
      responsive={responsive}
      customDot={<CustomDot />}
      className={styles.header}
      containerClass='!overflow-hidden'
    >
      <div className=" rounded-20 md:mr-20 h-[280px] relative overflow-hidden p-24 flex flex-col items-start justify-end">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-[-2]"
          src={headerLinks[0].img}
          alt=""
        />
        <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
        <div className="max-w-[90%]">
          {headerLinks[0].title}
        </div>

        <Button href={headerLinks[0].link.url} newTab color="white" className="mt-24">
          {headerLinks[0].link.content}
        </Button>
      </div>
      <div className="rounded-20 md:ml-20 h-[280px] relative overflow-hidden p-24 flex flex-col items-start justify-end">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-[-2]"
          src={headerLinks[1].img}
          alt=""
        />
        <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
        <div className="max-w-[90%]">
          {headerLinks[1].title}
        </div>
        <Button color="white" href={headerLinks[1].link.url} newTab className="mt-24">
          {headerLinks[1].link.content}
        </Button>
      </div>
    </Carousel>

  );
}
