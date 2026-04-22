"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

interface Props {
  original: string;
  suggestion: string;
  onAccept: (text: string) => void;
  onClose: () => void;
}

export default function PolishDialog({
  original,
  suggestion,
  onAccept,
  onClose,
}: Props) {
  const [edited, setEdited] = useState(suggestion);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="polish-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <X size={15} />
        </button>

        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-zinc-700" />
          <h3 id="polish-title" className="text-lg font-semibold text-zinc-900">
            AI 润色建议
          </h3>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          对比下面两段，觉得合适就采用；不合适就保留原文。你也可以先编辑再采用。
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-xs font-medium text-zinc-500">
              原文
            </span>
            <div className="min-h-[120px] whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm leading-relaxed text-zinc-700">
              {original}
            </div>
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-zinc-900">
              润色后
              <span className="ml-1 text-[10px] font-normal tracking-wider text-zinc-400">
                可继续编辑
              </span>
            </span>
            <textarea
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              rows={6}
              className="min-h-[120px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm leading-relaxed text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            保留原文
          </button>
          <button
            type="button"
            onClick={() => onAccept(edited)}
            disabled={!edited.trim()}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            <Check size={14} />
            采用建议
          </button>
        </div>
      </div>
    </div>
  );
}
