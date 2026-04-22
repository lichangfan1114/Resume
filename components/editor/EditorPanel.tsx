import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import PortfolioSection from "./sections/PortfolioSection";
import ProfileSection from "./sections/ProfileSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import SocialsSection from "./sections/SocialsSection";

export default function EditorPanel() {
  return (
    <div className="h-full overflow-y-auto bg-zinc-50/50">
      <div className="mx-auto max-w-xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900">填写你的简历</h1>
          <p className="mt-1 text-sm text-zinc-500">
            左侧填写，右侧实时预览。数据暂存浏览器，刷新不丢。
          </p>
        </header>

        <div className="space-y-3">
          <ProfileSection />
          <EducationSection />
          <ProjectsSection />
          <ExperienceSection />
          <PortfolioSection />
          <SkillsSection />
          <SocialsSection />
        </div>
      </div>
    </div>
  );
}
