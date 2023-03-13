import { RefObject, useEffect, useState } from "react";
import Lightbox from "src/Components/Lightbox/Lightbox";

export default function PostImagesLightbox({
  contentDomRef,
}: {
  contentDomRef: RefObject<HTMLDivElement>;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState(-1);

  useEffect(() => {
    const listenersToClean: [HTMLImageElement, EventListener][] = [];
    let newImgsSrcs: string[] = [];

    let idx = 0;

    contentDomRef.current?.querySelectorAll("img").forEach((img) => {
      const imageUrl = img.getAttribute("src");
      if (imageUrl) {
        newImgsSrcs.push(imageUrl);
        const _idx = idx;
        const handler = () => {
          setImageOpen(_idx);
        };
        img.classList.add("cursor-pointer");
        img.addEventListener("click", handler);
        listenersToClean.push([img, handler]);

        idx++;
      }
    });

    setImages(newImgsSrcs);

    return () => {
      listenersToClean.forEach(([img, handler]) => {
        img.removeEventListener("click", handler);
      });
    };
  }, [contentDomRef]);

  return (
    <Lightbox
      images={images}
      isOpen={imageOpen !== -1}
      initOpenIndex={imageOpen}
      onClose={() => setImageOpen(-1)}
    />
  );
}
