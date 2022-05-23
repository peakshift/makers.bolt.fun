import TopBarProgress from "react-topbar-progress-indicator";
import THEME from "src/utils/theme";

TopBarProgress.config({
  barColors: {
    0: THEME.colors.primary[400],
    ".5": THEME.colors.primary[500],
    "1.0": THEME.colors.primary[700],
  },
});

export default function LoadingPage() {
  return <TopBarProgress />;
}
