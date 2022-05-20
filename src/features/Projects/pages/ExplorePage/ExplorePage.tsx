import Header from "./Header/Header";
import ProjectsSection from "./ProjectsSection/ProjectsSection";


export default function ExplorePage() {
    return (
        <div className="page-container">

            <Header />

            {/* <div className="my-40 px-32">
                <Categories />
            </div> */}
            <div className="w-full overflow-hidden">
                <ProjectsSection />
            </div>
        </div>
    )
}
