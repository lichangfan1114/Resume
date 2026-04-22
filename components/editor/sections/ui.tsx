"use client";

import { ChevronDown, ChevronRight, Eye, EyeOff, Plus, X } from "lucide-react";
import { usePreviewFocus } from "@/hooks/usePreviewFocus";
import { useResumeData } from "@/hooks/useResumeData";
import { useEditorUI } from "@/hooks/useEditorUI";

export const inputClass =
  "block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition placeholder:text-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-zinc-700">{label}</span>
        {hint && <span className="text-xs text-zinc-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export function SectionShell({
  sectionId,
  title,
  tag,
  children,
  onAdd,
  addLabel,
  hideable = false,
}: {
  sectionId: string;
  title: string;
  tag: string;
  children: React.ReactNode;
  onAdd?: () => void;
  addLabel?: string;
  hideable?: boolean;
}) {
  const { focusSection } = usePreviewFocus();
  const { data, toggleSection } = useResumeData();
  const { isCollapsed, toggleCollapse } = useEditorUI();
  const hidden = (data.hiddenSections ?? []).includes(sectionId);
  const collapsed = isCollapsed(sectionId);

  if (hideable && hidden) {
    return (
      <section className="flex items-center justify-between rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <EyeOff size={14} />
          <span className="line-through">{title}</span>
          <span className="text-[10px] tracking-[0.25em]">（已隐藏）</span>
        </div>
        <button
          type="button"
          onClick={() => toggleSection(sectionId)}
          className="inline-flex h-7 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          <Eye size={12} />
          恢复显示
        </button>
      </section>
    );
  }

  return (
    <section
      onFocusCapture={() => focusSection(sectionId)}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <header
        className={`flex items-center justify-between px-4 py-3 ${
          collapsed ? "" : "border-b border-zinc-100"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleCollapse(sectionId)}
          aria-expanded={!collapsed}
          aria-controls={`${sectionId}-body`}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-zinc-400 transition group-hover:text-zinc-700">
            {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </span>
          <h3 className="truncate text-sm font-semibold text-zinc-900">
            {title}
          </h3>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          {hideable && (
            <button
              type="button"
              onClick={() => toggleSection(sectionId)}
              aria-label="隐藏此章节"
              title="隐藏此章节（不会在预览和 PDF 中显示）"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            >
              <EyeOff size={13} />
            </button>
          )}
          <span className="text-[10px] tracking-[0.25em] text-zinc-400">{tag}</span>
        </div>
      </header>

      {!collapsed && (
        <div id={`${sectionId}-body`}>
          <div className="space-y-4 p-4">{children}</div>
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="flex w-full items-center justify-center gap-1.5 border-t border-zinc-100 py-3 text-sm font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
            >
              <Plus size={14} />
              {addLabel ?? "添加一项"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export function ItemCard({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <div className="relative space-y-3 rounded-lg border border-zinc-200 bg-zinc-50/40 p-3">
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="删除该条目"
          className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={14} />
        </button>
      )}
      {children}
    </div>
  );
}

export function EmptyListHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/40 px-3 py-4 text-center text-sm text-zinc-400">
      {children}
    </p>
  );
}
