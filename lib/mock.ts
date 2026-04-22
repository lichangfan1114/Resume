import type { ResumeData } from "./schema";

// 仅作为模板预览的占位数据，不指代任何真实人物或机构。
export const MOCK_RESUME: ResumeData = {
  id: "sample",
  template: "modern",
  profile: {
    name: "你的姓名",
    title: "职位名称 · 专长方向",
    location: "所在城市 · 国家",
    bio: "在这里写一段关于你的简介：你的经验、方向、以及你想传递给读者的第一印象。两到三行最合适。",
    avatarShape: "circle",
  },
  education: [
    {
      id: "edu-1",
      school: "示例大学",
      major: "专业名称 · 学历",
      startDate: "YYYY-MM",
      endDate: "YYYY-MM",
      description: "在此补充学业亮点：奖项、GPA、研究方向或课外项目。",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "项目名称 A",
      link: "https://example.com",
      startDate: "YYYY-MM",
      endDate: "至今",
      description: "一句话说明项目目标，再用一两句描述你的贡献与可量化的结果。",
    },
    {
      id: "proj-2",
      name: "项目名称 B",
      link: "https://example.com",
      startDate: "YYYY-MM",
      endDate: "YYYY-MM",
      description: "简述项目背景与你承担的角色，突出独立负责或协作推动的部分。",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "公司名称 A",
      role: "职位名称",
      startDate: "YYYY-MM",
      endDate: "至今",
      description: "列出你的主要职责与关键成果，用可量化的数据会更有说服力。",
    },
    {
      id: "exp-2",
      company: "公司名称 B",
      role: "职位名称",
      startDate: "YYYY-MM",
      endDate: "YYYY-MM",
      description: "这里写你在上一份工作中最值得突出的贡献或项目。",
    },
  ],
  portfolio: [
    { id: "p-1", image: "", caption: "作品 01 · 标题简介" },
    { id: "p-2", image: "", caption: "作品 02 · 标题简介" },
    { id: "p-3", image: "", caption: "作品 03 · 标题简介" },
  ],
  skills: [
    "技能 1",
    "技能 2",
    "技能 3",
    "技能 4",
    "技能 5",
    "技能 6",
    "技能 7",
    "技能 8",
  ],
  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    twitter: "https://twitter.com/your-handle",
    website: "https://your-website.com",
    email: "hello@example.com",
  },
  hiddenSections: [],
};
