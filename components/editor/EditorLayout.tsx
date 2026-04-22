"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Share2, Trash2 } from "lucide-react";
import type { TemplateMeta } from "@/lib/schema";
import { ResumeDataProvider, useResumeData } from "@/hooks/useResumeData";
import { PreviewFocusProvider } from "@/hooks/usePreviewFocus";
import { EditorUIProvider, useEditorUI } from "@/hooks/useEditorUI";
import { createEmptyResume } from "@/lib/defaults";
import { publishResume, type PublishResult } from "@/lib/publish";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import EditorPanel from "./EditorPanel";
import PreviewCanvas from "./PreviewCanvas";
import ModeSwitcher from "./ModeSwitcher";
import PublishDialog from "./PublishDialog";

export type { EditorMode } from "@/hooks/useEditorUI";

interface Props {
  template: TemplateMeta;
}

export default function EditorLayout({ template }: Props) {
  const initialData = useMemo(
    () => createEmptyResume(template.id),
    [template.id],
  );

  return (
    <ResumeDataProvider initialData={initialData}>
      <PreviewFocusProvider>
        <EditorUIProvider>
          <EditorLayoutInner template={template} />
        </EditorUIProvider>
      </PreviewFocusProvider>
    </ResumeDataProvider>
  );
}

function EditorLayoutInner({ template }: { template: TemplateMeta }) {
  const { mode, setMode } = useEditorUI();
  const [restored, setRestored] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [publishing, setPublishing] = useState(false);
  const { data, setResume } = useResumeData();

  // 挂载时尝试恢复本地草稿
  useEffect(() => {
    const saved = loadDraft(template.id);
    if (saved) setResume(saved);
    setRestored(true);
  }, [template.id, setResume]);

  // 数据变化 debounce 500ms 写回 localStorage（restore 完成前不写，避免覆盖）
  useEffect(() => {
    if (!restored) return;
    const id = setTimeout(() => saveDraft(template.id, data), 500);
    return () => clearTimeout(id);
  }, [data, template.id, restored]);

  const handleClear = () => {
    if (!window.confirm("确定清空所有已填内容吗？此操作不可撤销。")) return;
    setResume(createEmptyResume(template.id));
    clearDraft(template.id);
  };

  const handlePublish = async () => {
    if (publishing) return;
    setPublishing(true);
    try {
      saveDraft(template.id, data);
      const result = await publishResume(data);
      setPublishResult(result);
    } catch (err) {
      console.error("[publish] failed:", err);
      window.alert("发布失败，请重试。");
    } finally {
      setPublishing(false);
    }
  };

  const showEditor = mode !== "preview";
  const showPreview = mode !== "editor";

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="返回模板选择"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] tracking-[0.25em] text-zinc-400">
              TEMPLATE
            </span>
            <span className="text-sm font-medium text-zinc-900">
              {template.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            title="生成一个可分享的在线简历链接"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
          >
            <Share2 size={13} />
            {publishing ? "发布中..." : "发布"}
          </button>
          <a
            href={`/print/${template.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => saveDraft(template.id, data)}
            title="导出 PDF（打开打印预览）"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <Download size={13} />
            导出 PDF
          </a>
          <button
            type="button"
            onClick={handleClear}
            title="清空所有内容"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={13} />
            清空
          </button>
          <ModeSwitcher mode={mode} onChange={setMode} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {showEditor && (
          <section
            aria-label="编辑区"
            className={`min-h-0 border-r border-zinc-200 transition-[width] duration-300 ${
              showPreview ? "w-1/2" : "w-full"
            }`}
          >
            <EditorPanel />
          </section>
        )}
        {showPreview && (
          <section
            aria-label="预览区"
            className={`min-h-0 transition-[width] duration-300 ${
              showEditor ? "w-1/2" : "w-full"
            }`}
          >
            <PreviewCanvas />
          </section>
        )}
      </div>

      {publishResult && (
        <PublishDialog
          result={publishResult}
          onClose={() => setPublishResult(null)}
        />
      )}
    </div>
  );
}
