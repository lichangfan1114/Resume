import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { getPublishedResume } from "@/lib/publish";
import { getTemplateComponent } from "@/components/templates/registry";
import PrintButton from "./PrintButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getPublishedResume(id);

  if (!data) {
    return {
      title: "简历未找到 · Resume Platform",
      description: "这个链接可能已失效。",
    };
  }

  const name = data.profile.name?.trim() || "在线简历";
  const role = data.profile.title?.trim();
  const title = role ? `${name} · ${role}` : name;
  const description =
    data.profile.bio?.trim() ||
    [data.profile.location, data.profile.title].filter(Boolean).join(" · ") ||
    "由 Resume Platform 生成的在线简历";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      siteName: "Resume Platform",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ResumePublicPage({ params }: Props) {
  const { id } = await params;
  const data = await getPublishedResume(id);

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center">
        <p className="text-lg font-medium text-zinc-700">简历未找到</p>
        <p className="max-w-md text-sm text-zinc-500">
          这个链接可能已失效，或者尚未发布。
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

  const Template = getTemplateComponent(data.template);

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
          <PrintButton />
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
          <Template data={data} />
        </div>
      </main>
    </>
  );
}
