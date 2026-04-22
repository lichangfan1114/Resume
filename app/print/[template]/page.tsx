"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import type { ResumeData, TemplateId } from "@/lib/schema";
import { loadDraft } from "@/lib/storage";
import { getTemplateComponent } from "@/components/templates/registry";

const VALID_TEMPLATES: readonly TemplateId[] = [
  "modern",
  "minimalist",
  "professional",
];

export default function PrintPage() {
  const params = useParams<{ template: string }>();
  const templateRaw = params?.template ?? "modern";
  const template = (
    VALID_TEMPLATES.includes(templateRaw as TemplateId)
      ? templateRaw
      : "modern"
  ) as TemplateId;

  const [data, setData] = useState<ResumeData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setData(loadDraft(template));
  }, [template]);

  useEffect(() => {
    if (!mounted || !data) return;
    const t = setTimeout(() => window.print(), 500);
    return () => clearTimeout(t);
  }, [mounted, data]);

  if (!mounted) return null;

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center">
        <p className="text-base text-zinc-700">没有找到草稿</p>
        <p className="text-sm text-zinc-500">
          请回到编辑器填写内容，内容会自动保存后再次导出。
        </p>
        <Link
          href={`/editor?template=${template}`}
          className="inline-flex h-10 items-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          回到编辑器
        </Link>
      </main>
    );
  }

  return (
    <>
      {/* 屏幕上显示的工具栏（打印时隐藏） */}
      <header className="sticky top-0 z-20 flex h-14 w-full shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 print:hidden">
        <Link
          href={`/editor?template=${template}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <ArrowLeft size={14} />
          返回编辑器
        </Link>
        <div className="text-xs text-zinc-400">预览后会自动唤起打印对话框</div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800"
        >
          <Printer size={13} />
          再次打印
        </button>
      </header>

      <main className="flex min-h-screen justify-center bg-zinc-100 py-8 print:min-h-0 print:bg-white print:py-0">
        <div className="bg-white shadow-2xl shadow-zinc-900/10 print:shadow-none">
          {(() => {
            const Template = getTemplateComponent(data.template);
            return <Template data={data} />;
          })()}
        </div>
      </main>
    </>
  );
}
