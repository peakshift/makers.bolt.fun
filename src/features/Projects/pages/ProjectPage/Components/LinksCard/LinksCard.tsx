import Card from "src/Components/Card/Card";
import { Project } from "src/graphql";
import ProjectLinksList from "../ProjectLinksList/ProjectLinksList";

interface Props {
  links: Pick<
    Project,
    | "discord"
    | "website"
    | "github"
    | "twitter"
    | "slack"
    | "telegram"
    | "figma"
    | "replit"
    | "youtube"
    | "npub"
  >;
}

export default function LinksCard({ links }: Props) {
  return (
    <Card onlyMd>
      <p className="text-body2 font-bold mb-16 hidden md:block">🔗 Links</p>
      <div className="">
        <div className="flex flex-wrap gap-16">
          <ProjectLinksList project={links} />
        </div>
      </div>
    </Card>
  );
}
