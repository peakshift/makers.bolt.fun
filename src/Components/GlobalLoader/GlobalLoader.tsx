import { useNavigation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import THEME from "src/utils/theme";

export default function GlobalLoader() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? <TopBarProgress /> : null;
}

TopBarProgress.config({
  barColors: {
    0: THEME.colors.primary[400],
    ".5": THEME.colors.primary[500],
    "1.0": THEME.colors.primary[700],
  },
});
