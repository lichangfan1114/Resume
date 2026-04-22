"use client";

import { Columns2, Eye, PencilLine } from "lucide-react";
import type { EditorMode } from "@/hooks/useEditorUI";

interface Props {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
}

const OPTIONS: Array<{ value: EditorMode; label: string; Icon: typeof PencilLine }> = [
  { value: "editor", label: "仅编辑", Icon: PencilLine },
  { value: "split", label: "分屏", Icon: Columns2 },
  { value: "preview", label: "仅预览", Icon: Eye },
];

export default function ModeSwitcher({ mode, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="布局模式"
      className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={active}
            aria-label={label}
            title={label}
            onClick={() => onChange(value)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
              active
                ? "bg-zinc-900 text-white"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <Icon size={16} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
