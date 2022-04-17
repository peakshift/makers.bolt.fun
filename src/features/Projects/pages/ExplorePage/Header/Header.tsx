import { useMediaQuery } from "@react-hookz/web";
import Carousel from "react-multi-carousel";
import Assets from "src/assets";
import Button from "src/Components/Button/Button";
import { THEME } from "src/utils/theme";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import CustomDot from "./CustomDot/CustomDot";
import styles from './styles.module.css'

const headerLinks = [
  {
    title: "A fun directory of Lightning Enabled Applications on the Open Web",
    img: Assets.Images_ExploreHeader1,
    link: {
      content: "Submit App",
      url: "https://form.jotform.com/220301236112030",
    },
  },
  {
    title:
      "Want to learn to build lightning applications? Join Shock the Web hackathon on March 22 - 28",
    img: Assets.Images_ExploreHeader2,
    link: {
      content: "Register Now",
      url: "https://bolt.fun/hackathons/shock-the-web/",
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
        <h3 className="text-white text-h4 lg:text-h3 max-w-[80%]">
          {headerLinks[0].title}
        </h3>

        <Button href={headerLinks[0].link.url} newTab color="primary" className="font-regular mt-36">
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
        <h3 className="text-white text-h4 lg:text-h3 max-w-[80%]">
          {headerLinks[1].title}
        </h3>
        <Button href={headerLinks[1].link.url} newTab className="font-regular mt-36">
          {headerLinks[1].link.content}
        </Button>
      </div>
    </Carousel>

  );
}
