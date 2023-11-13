import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigateBack = (fallbackUrl: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationKey = location.key;

  const navigateBack = useCallback(() => {
    if (locationKey === "default")
      // user landed on this page directly
      navigate(fallbackUrl);
    else navigate(-1);
  }, [fallbackUrl, locationKey, navigate]);

  return navigateBack;
};
