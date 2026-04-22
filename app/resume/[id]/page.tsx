"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Download, Home } from "lucide-react";
import type { ResumeData } from "@/lib/schema";
import { getPublishedResume } from "@/lib/publish";
import { getTemplateComponent } from "@/components/templates/registry";

export default function ResumePublicPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const [data, setData] = useState<ResumeData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPublishedResume(id).then(setData);
  }, [id]);

  if (!mounted) return null;

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center">
        <p className="text-lg font-medium text-zinc-700">简历未找到</p>
        <p className="max-w-md text-sm text-zinc-500">
          当前是本地演示阶段，只有发布该简历的浏览器可以访问这个链接。
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Home size={14} />
          制作你自己的简历
        </Link>
      </main>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 print:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 transition hover:opacity-70"
        >
          Resume Platform
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <Download size={13} />
            导出 PDF
          </button>
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-full bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800"
          >
            制作你自己的 →
          </Link>
        </div>
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
