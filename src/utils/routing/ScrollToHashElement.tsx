import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  let location = useLocation();

  let hash = useMemo(() => {
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (location.hash) return removeHashCharacter(location.hash);
    return null;
  }, [location]);

  useEffect(() => {
    if (hash) {
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      const interval = setInterval(() => {
        const elm = document.getElementById(hash!);
        if (elm) {
          clearInterval(interval);
          clearTimeout(timeout);
          elm?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
          });
        }
      }, 100);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [hash]);

  return null;
};

export default ScrollToHashElement;
