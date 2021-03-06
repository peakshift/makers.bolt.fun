import Header from "./Header/Header";
import ProjectsSection from "./ProjectsSection/ProjectsSection";
import { Helmet } from "react-helmet";
import Categories from "./Categories/Categories";


export default function ExplorePage() {
    return (
        <>
            <Helmet>
                <title>{`Explore Lightning Products`}</title>
                <meta property="og:title" content={`Explore Lightning Products`} />
            </Helmet>
            <div className="page-container pt-16">

                <Header />

                <div className="my-32 overflow-hidden">
                    <Categories />
                </div>
                <div className="w-full overflow-hidden">
                    <ProjectsSection />
                </div>
            </div>
        </>
    )
}
