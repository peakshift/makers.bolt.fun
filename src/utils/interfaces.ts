export interface ProjectCategory {
  id: string;
  title: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  img: string;
  category: ProjectCategory;
  votes_count: number;
}

export interface Tag {
  id: string;
  title: string;
}

export type Image = string;

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
