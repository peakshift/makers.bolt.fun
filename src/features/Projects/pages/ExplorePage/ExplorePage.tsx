import Header from "./Header/Header";
import ProjectsSection from "./ProjectsSection/ProjectsSection";
import { Helmet } from "react-helmet";
import Categories from "./Categories/Categories";
import OgTags from "src/Components/OgTags/OgTags";

export default function ExplorePage() {
  return (
    <div className="bg-white">
      <OgTags title="#BuildOnBitcoin" />
      <div className="page-container">
        <Header />
        <div className="my-32">
          <Categories />
        </div>
        <div className="w-full overflow-hidden">
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
}
