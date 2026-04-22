import Link from "next/link";
import type { TemplateMeta } from "@/lib/schema";

interface Props {
  template: TemplateMeta;
}

export default function TemplateCard({ template }: Props) {
  const { id, name, tagline, description, accent, available } = template;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/5">
      <div
        className={`relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${accent}`}
      >
        <TemplatePreviewSkeleton templateId={id} />
        {!available && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-wider text-zinc-700">
            即将上线
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{description}</p>

        <div className="mt-5 pt-5 border-t border-zinc-100">
          {available ? (
            <Link
              href={{ pathname: "/editor", query: { template: id } }}
              className="inline-flex h-10 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              选择此模板 →
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-10 w-full cursor-not-allowed items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-400"
            >
              敬请期待
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplatePreviewSkeleton({ templateId }: { templateId: string }) {
  if (templateId === "modern") {
    return (
      <div className="flex h-[72%] w-[68%] flex-col rounded-lg bg-white p-4 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex gap-1">
            <div className="h-1.5 w-6 rounded-full bg-zinc-300" />
            <div className="h-1.5 w-8 rounded-full bg-zinc-200" />
            <div className="h-1.5 w-6 rounded-full bg-zinc-200" />
          </div>
          <div className="h-1.5 w-4 rounded-full bg-zinc-300" />
        </div>
        <div className="mt-3 flex gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-20 rounded bg-zinc-800" />
            <div className="h-1 w-14 rounded bg-zinc-300" />
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-zinc-200" />
              <div className="h-1 w-4/5 rounded bg-zinc-200" />
            </div>
          </div>
          <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-10 rounded bg-zinc-700" />
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-3/4 rounded bg-zinc-200" />
        </div>
      </div>
    );
  }
  if (templateId === "minimalist") {
    return (
      <div className="flex h-[72%] w-[68%] flex-col rounded-lg bg-white p-5 shadow-2xl shadow-black/30">
        <div className="mb-4 h-2.5 w-24 rounded bg-zinc-800" />
        <div className="h-1 w-12 rounded bg-zinc-300" />
        <div className="mt-5 space-y-2">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-5/6 rounded bg-zinc-200" />
          <div className="h-1 w-4/6 rounded bg-zinc-200" />
        </div>
        <div className="mt-5 h-px bg-zinc-100" />
        <div className="mt-4 space-y-2">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-3/6 rounded bg-zinc-200" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-[72%] w-[68%] rounded-lg bg-white shadow-2xl shadow-black/30">
      <div className="w-1/3 space-y-2 border-r border-zinc-100 bg-zinc-50 p-3">
        <div className="h-6 w-6 rounded-full bg-zinc-300" />
        <div className="h-1 w-12 rounded bg-zinc-300" />
        <div className="h-1 w-10 rounded bg-zinc-200" />
        <div className="h-1 w-14 rounded bg-zinc-200" />
      </div>
      <div className="flex-1 p-3">
        <div className="h-2 w-16 rounded bg-zinc-800" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-5/6 rounded bg-zinc-200" />
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-4/6 rounded bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
