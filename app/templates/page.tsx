import Link from "next/link";
import TemplateGrid from "@/components/templates/TemplateGrid";

export default function TemplatesPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex h-8 items-center text-sm text-zinc-500 transition hover:text-zinc-900"
          >
            ← 返回首页
          </Link>
        </div>

        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs tracking-[0.3em] text-zinc-400">
            STEP 1 / 3 · CHOOSE TEMPLATE
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            选一个适合你的模板
          </h1>
          <p className="mt-4 text-base text-zinc-600">
            每个模板都支持实时编辑与 PDF 导出，后续可随时切换。
          </p>
        </div>

        <TemplateGrid />
      </div>
    </main>
  );
}
