import { Link } from "react-router-dom";
import OgTags from "src/Components/OgTags/OgTags";

export default function HomePage() {
  return (
    <>
      <OgTags
        title="Welcome to Bolt Fun"
        description="A FUN community for the makers and designers in the Bitcoin & Nostr space"
      />

      <div className={`page-container`}>
        <h1 className="text-h1 text-center">Welcome To Bolt🔩Fun!</h1>
        <div className="flex flex-col gap-16 mx-auto text-center underline mt-40 text-body1 text-primary-500">
          <Link to={"/feed"}>Stories Feed</Link>{" "}
          <Link to={"/projects"}>Explore Projects</Link>
        </div>
      </div>
    </>
  );
}
