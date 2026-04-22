export type TemplateId = "modern" | "minimalist" | "professional";

export type AvatarShape = "circle" | "rectangle";

export interface Profile {
  avatar?: string;
  avatarShape?: AvatarShape;
  name: string;
  title: string;
  location: string;
  bio: string;
}

export interface EducationItem {
  id: string;
  school: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link?: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  caption: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface ResumeData {
  id: string;
  template: TemplateId;
  profile: Profile;
  education: EducationItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
  skills: string[];
  socials: SocialLinks;
  hiddenSections?: string[];
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  available: boolean;
}
