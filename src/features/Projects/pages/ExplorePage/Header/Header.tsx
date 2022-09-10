
import Assets from "src/assets";
import Button from "src/Components/Button/Button";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import CustomDot from "./CustomDot/CustomDot";
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react";
import { createRoute } from "src/utils/routing";

const headerLinks = [
  {
    title:
      <>
        <p className="text-body1 font-bolder text-white">Legends of Lightning ⚡️ Tournament</p>
        <p className="text-body3 font-medium text-white mt-8">1st Oct - 31st Nov, 2022</p>
      </>,
    img: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
    link: {
      content: "Register Now",
      url: createRoute({ type: "tournament", id: 1, tab: 'overview' }),
    },
  },
  {
    title: <p className="text-body1 font-bolder text-white">Explore a fun directory of lightning web apps</p>,
    img: Assets.Images_ExploreHeader1,
    link: {
      content: "Submit project",
      url: "https://form.jotform.com/220301236112030",
    },
  },
];



export default function Header() {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    breakpoints: {
      [MEDIA_QUERIES.isMedium]: {
        draggable: false
      }
    }
  })

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="w-full flex gap-16">
          <div className="flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] rounded-20 h-[280px] relative overflow-hidden p-24 flex flex-col items-start justify-end">
            <img
              className="w-full h-full object-cover absolute top-0 left-0 z-[-2]"
              src={headerLinks[0].img}
              alt=""
            />
            <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
            <div className="max-w-[90%]">
              {headerLinks[0].title}
            </div>

            <Button href={headerLinks[0].link.url} color="white" className="mt-24">
              {headerLinks[0].link.content}
            </Button>
          </div>
          <div className="flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] rounded-20 h-[280px] relative overflow-hidden p-24 flex flex-col items-start justify-end">
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
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4 md:hidden">
        {scrollSnaps.map((_, index) => (
          <CustomDot
            key={index}
            active={index === selectedIndex}
          />
        ))}
      </div>
    </div>

  );
}
