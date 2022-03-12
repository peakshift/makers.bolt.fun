import { Image, Tag } from ".";

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    website?: string;
    description: string;
    tags: Tag[];
    cover_image: Image;
    thumbnail_image: Image;
    screenShots: Image[];
    votes_count: number;
}

export interface ProjectCategory {
    id: string;
    title: string;
}

export interface ProjectCard {
    id: string;
    title: string;
    thumbnail_image: string;
    category: ProjectCategory;
    votes_count: number;
}

interface AllCategoriesData {
    allCategories: ProjectCategory[];
}