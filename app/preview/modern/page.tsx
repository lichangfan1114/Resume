import ResumeModern from "@/components/templates/modern/ResumeModern";
import { MOCK_RESUME } from "@/lib/mock";

// 用于独立查看 Modern 模板的原始尺寸（开发调试用）
export default function PreviewModernPage() {
  return (
    <main className="flex flex-1 justify-center bg-zinc-100 p-10">
      <div className="w-fit shadow-2xl shadow-zinc-900/10">
        <ResumeModern data={MOCK_RESUME} />
      </div>
    </main>
  );
}
