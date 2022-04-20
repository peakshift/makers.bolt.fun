import Header from "./Header/Header";
import ProjectsSection from "./ProjectsSection/ProjectsSection";


export default function ExplorePage() {
    return (
        <>
            <div className="px-32">
                <Header />
            </div>
            {/* <div className="my-40 px-32">
                <Categories />
            </div> */}
            <ProjectsSection />
        </>
    )
}
