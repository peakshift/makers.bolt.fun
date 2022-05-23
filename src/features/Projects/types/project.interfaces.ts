import { Project as ApiProject, Tag } from "src/graphql";
import { Image } from "../../../utils/interfaces";

export interface Project {
    id: ApiProject['id'];
    title: ApiProject['title'];
    category: Pick<ProjectCategory, 'id' | 'title'>;
    website?: ApiProject['website'];
    description: ApiProject['description'];
    tags: Pick<Tag, 'id' | 'title'>[];
    cover_image: ApiProject['cover_image'];
    thumbnail_image: ApiProject['thumbnail_image'];
    lightning_address?: ApiProject['lightning_address'] | null,
    screenshots: Image[];
    votes_count: ApiProject['votes_count'];
}

export interface ProjectCategory {
    id: number;
    title: string;
    cover_image: string;
    icon: string;
    apps_count: number;
    votes_sum: number;
}

export interface ProjectCard {
    id: number;
    title: string;
    thumbnail_image: string;
    category: Pick<ProjectCategory, 'id' | 'title'>;
    votes_count: number;
}

