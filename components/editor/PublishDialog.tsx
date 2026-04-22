"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import type { PublishResult } from "@/lib/publish";

interface Props {
  result: PublishResult;
  onClose: () => void;
}

export default function PublishDialog({ result, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[publish] copy failed:", err);
      window.alert("复制失败，请手动选中链接复制。");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="publish-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <X size={15} />
        </button>

        <h3 id="publish-title" className="text-lg font-semibold text-zinc-900">
          简历已发布
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          下面的链接可以分享给任何人查看你的简历。
        </p>

        <div className="mt-5 flex gap-2">
          <input
            readOnly
            value={result.url}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-700 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "已复制" : "复制"}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
          <p className="text-xs leading-relaxed text-zinc-400">
            演示阶段：链接仅本浏览器可访问，真实后端对接后将开放跨设备访问。
          </p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-900 hover:underline"
          >
            打开
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
