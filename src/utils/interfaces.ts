
export interface AllCategoriesData {
  allCategories: ProjectCategory[]
}

export interface ProjectCategory {
  id: number;
  title: string;
}

export interface ProjectCard {
  id: number;
  title: string;
  thumbnail_image: string;
  category: ProjectCategory;
  votes_count: number;
}

export interface Tag {
  id: number;
  title: string;
}

export type Image = string;

export interface Project {
  id: number;
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
