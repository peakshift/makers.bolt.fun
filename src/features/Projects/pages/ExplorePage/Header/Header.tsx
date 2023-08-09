import Assets from "src/assets";
import Button from "src/Components/Button/Button";
import { MEDIA_QUERIES } from "src/utils/theme/media_queries";
import CustomDot from "./CustomDot/CustomDot";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { createRoute } from "src/utils/routing";
import { IoLocationOutline } from "react-icons/io5";

export const bannerData = {
  title: (
    <>
      <p className="text-body1 font-bolder text-white">Nostrasia Hackathon</p>
      <p className="text-body3 font-medium text-white mt-8">
        3rd Oct - 3rd Nov, 2023
      </p>
      <p className="text-body4 text-white mt-8">
        <IoLocationOutline className="mr-8" /> Online
      </p>
    </>
  ),
  img: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/9818c8ea-54f9-49d2-1fb0-0bf62db71500/public",
  link: {
    content: "Registration Open",
    url: createRoute({ type: "tournament", idOrSlug: "nostrasia" }),
    newTab: false,
  },
};

const headerLinks = [
  bannerData,
  {
    title: (
      <p className="text-body1 font-bolder text-white">
        Working on a Lightning, Nostr and AI project? Let's build together.
      </p>
    ),
    img: Assets.Images_ExploreHeader1,
    link: {
      content: "Submit your project",
      url: createRoute({ type: "edit-project" }),
      newTab: false,
    },
  },
];

export default function Header() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: {
      [MEDIA_QUERIES.isMinMedium]: {
        draggable: false,
      },
    },
  });

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
            <div className="max-w-[90%]">{headerLinks[0].title}</div>
            <Button
              color="gray"
              href={headerLinks[0].link.url}
              className="mt-24"
            >
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
            <div className="max-w-[90%]">{headerLinks[1].title}</div>
            <Button
              color="gray"
              href={headerLinks[1].link.url}
              newTab={headerLinks[1].link.newTab ?? false}
              className="mt-24"
            >
              {headerLinks[1].link.content}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4 md:hidden">
        {scrollSnaps.map((_, index) => (
          <CustomDot key={index} active={index === selectedIndex} />
        ))}
      </div>
    </div>
  );
}
