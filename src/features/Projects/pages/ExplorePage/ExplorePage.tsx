import Header from "./Header/Header";
import ProjectsSection from "./ProjectsSection/ProjectsSection";
import Categories from "./Categories/Categories";
import OgTags from "src/Components/OgTags/OgTags";
import SkipLink from "src/Components/SkipLink/SkipLink";

export default function ExplorePage() {
  return (
    <div className="bg-white p-16 rounded-24">
      <SkipLink id="explore-projects-content">Skip To Content</SkipLink>
      <OgTags title="#BuildOnBitcoin" />
      <main id="explore-projects-content">
        <Header />
        <div className="my-32">
          <Categories />
        </div>
        <div className="w-full overflow-hidden">
          <ProjectsSection />
        </div>
      </main>
    </div>
  );
}
