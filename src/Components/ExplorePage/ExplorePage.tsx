import Categories from "./partials/Categories";
import Header from "./partials/Header";
import ProjectsSection from "./partials/ProjectsSection";


export default function ExplorePage() {
    return (
        <>
            <div className="px-32">
                <Header />
            </div>
            <div className="my-40 px-32">
                <Categories />
            </div>
            <ProjectsSection />
        </>
    )
}
