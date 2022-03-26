import { Tag } from "src/graphql";
import { Image } from ".";

export interface Project {
    id: number;
    title: string;
    category: Pick<ProjectCategory, 'id' | 'title'>;
    website?: string;
    description: string;
    tags: Pick<Tag, 'id' | 'title'>[];
    cover_image: Image;
    thumbnail_image: Image;
    lightning_address?: string | null,
    screenshots: Image[];
    votes_count: number;
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

