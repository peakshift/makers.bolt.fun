import { useCallback, useEffect, useState, } from "react";
import useEmblaCarousel from 'embla-carousel-react'

export const useCarousel = (...props: Parameters<typeof useEmblaCarousel>) => {

    const [viewportRef, emblaApi] = useEmblaCarousel({ ...props[0], slidesToScroll: 1 });
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [canScrollPrev, setCanScrollPrev] = useState(false);


    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setCanScrollNext(emblaApi.canScrollNext())
        setCanScrollPrev(emblaApi.canScrollPrev())

    }, [emblaApi,]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);


    const slidesToScroll = Number(props[0]?.slidesToScroll ?? 1);

    const scrollSlides = useCallback((direction = 1) => {
        if (emblaApi) emblaApi.scrollTo(emblaApi.selectedScrollSnap() + direction * slidesToScroll)
    }, [emblaApi, slidesToScroll]);

    const isClickAllowed = useCallback(() => !!emblaApi?.clickAllowed(), [emblaApi]);

    return {
        viewportRef,
        canScrollNext,
        canScrollPrev,
        isClickAllowed,
        scrollSlides,
        emblaApi,
    }

}