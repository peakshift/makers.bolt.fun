import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<RootState>();

export const useMyUser = () => {
  const user = useAppSelector((state) => state.user.me);
  if (!user) throw new Error("User not logged in");
  return user;
};
