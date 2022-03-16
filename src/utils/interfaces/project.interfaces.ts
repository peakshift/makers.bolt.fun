import { Image, Tag } from ".";

export interface Project {
    id: number;
    title: string;
    category: Pick<ProjectCategory, 'id' | 'title'>;
    website?: string;
    description: string;
    tags: Tag[];
    cover_image: Image;
    thumbnail_image: Image;
    lightning_address: string,
    screenShots: Image[];
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

