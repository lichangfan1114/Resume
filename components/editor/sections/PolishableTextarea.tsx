"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import PolishDialog from "./PolishDialog";

export type PolishContext = "bio" | "experience" | "project" | "education";

interface Props {
  value: string;
  onChange: (value: string) => void;
  context: PolishContext;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function PolishableTextarea({
  value,
  onChange,
  context,
  placeholder,
  rows = 3,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handlePolish = async () => {
    const text = value.trim();
    if (!text || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      if (!data.result) throw new Error("AI 没有返回内容");
      setSuggestion(data.result);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "润色失败");
    } finally {
      setLoading(false);
    }
  };

  const canPolish = value.trim().length > 0 && !loading;

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={className}
      />
      <div className="mt-1.5 flex items-center justify-end">
        <button
          type="button"
          onClick={handlePolish}
          disabled={!canPolish}
          title={
            value.trim()
              ? "用 AI 帮你把这段话润色得更专业"
              : "请先填入一些内容"
          }
          className="inline-flex h-7 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Sparkles size={12} />
          )}
          {loading ? "润色中..." : "AI 润色"}
        </button>
      </div>

      {suggestion !== null && (
        <PolishDialog
          original={value}
          suggestion={suggestion}
          onAccept={(text) => {
            onChange(text);
            setSuggestion(null);
          }}
          onClose={() => setSuggestion(null)}
        />
      )}
    </div>
  );
}
