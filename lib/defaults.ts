import type { ResumeData, TemplateId, TemplateMeta } from "./schema";

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "modern",
    name: "Modern",
    tagline: "所见即所得的现代风",
    description: "Hero 大标题 + 圆形头像 + 清晰分区，适合科技、产品、设计岗。",
    accent: "from-zinc-900 to-zinc-700",
    available: true,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "极简留白，专注内容",
    description: "去装饰、全黑白、排版克制，适合学术、研究、咨询岗。",
    accent: "from-zinc-400 to-zinc-200",
    available: true,
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "正式稳重，双栏布局",
    description: "左侧联系信息 + 右侧履历，适合金融、法律、传统行业。",
    accent: "from-blue-900 to-blue-700",
    available: true,
  },
];

export function getTemplateMeta(id: TemplateId): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function createEmptyResume(template: TemplateId): ResumeData {
  return {
    id: "",
    template,
    profile: {
      name: "",
      title: "",
      location: "",
      bio: "",
      avatarShape: "circle",
    },
    education: [],
    projects: [],
    experience: [],
    portfolio: [],
    skills: [],
    socials: {},
    hiddenSections: [],
  };
}
