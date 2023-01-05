import { useParams, Navigate } from "react-router-dom";
import ErrorMessage from "src/Components/Errors/ErrorMessage/ErrorMessage";
import { useCategoryPageQuery } from "src/graphql";
import HeaderImage from "./HeaderImage/HeaderImage";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";
import { Helmet } from "react-helmet";
import OgTags from "src/Components/OgTags/OgTags";

export default function CategoryPage() {
  const { id } = useParams();

  const { data, loading, error } = useCategoryPageQuery({
    skip: !id,
    variables: {
      categoryId: Number(id),
    },
  });

  if (!id || (!loading && !data)) <Navigate to="/" />;

  if (error) {
    return (
      <div className="p-32">
        <ErrorMessage type="fetching" />
      </div>
    );
  }

  return (
    <>
      <OgTags
        title={
          data?.getCategory.title &&
          `Explore ${data?.getCategory.title!} Lightning Projects`
        }
        description={
          !!data?.getCategory.apps_count
            ? `${data.getCategory.apps_count} apps in this category`
            : null
        }
      />
      <div className="page-container">
        <HeaderImage
          isLoading={loading}
          title={data?.getCategory.title!}
          img={data?.getCategory.cover_image!}
          apps_count={data?.getCategory.apps_count!}
        />
        <div className="mt-40">
          <ProjectsGrid
            isLoading={loading}
            projects={data?.projectsByCategory!}
          />
        </div>
      </div>
    </>
  );
}
