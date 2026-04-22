"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { getTemplateComponent } from "@/components/templates/registry";
import { useResumeData } from "@/hooks/useResumeData";
import { usePreviewFocus } from "@/hooks/usePreviewFocus";
import { usePreviewScale } from "@/hooks/usePreviewScale";

const MIN_SCALE = 0.25;
const MAX_SCALE = 2;
const WHEEL_STEP = 0.05;

export default function PreviewCanvas() {
  const { data } = useResumeData();
  const { focusedSection, setPreviewEl } = usePreviewFocus();
  const { containerRef, contentRef, scale: fitScale, contentHeight, templateWidth } =
    usePreviewScale();
  const Template = getTemplateComponent(data.template);

  // null = 跟随 fitScale 自适应；number = 用户手动设定
  const [userScale, setUserScale] = useState<number | null>(null);
  const effectiveScale = userScale ?? fitScale;
  const fitScaleRef = useRef(fitScale);
  fitScaleRef.current = fitScale;

  useEffect(() => {
    setPreviewEl(containerRef.current);
    return () => setPreviewEl(null);
  }, [setPreviewEl, containerRef]);

  useEffect(() => {
    const scrollEl = containerRef.current;
    if (!scrollEl || !focusedSection) return;
    const target = scrollEl.querySelector<HTMLElement>(`#${focusedSection}`);
    if (!target) return;
    const containerRect = scrollEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta = targetRect.top - containerRect.top;
    const navOffset = 56 * effectiveScale + 16;
    scrollEl.scrollTo({
      top: Math.max(0, scrollEl.scrollTop + delta - navOffset),
      behavior: "smooth",
    });
  }, [focusedSection, effectiveScale, containerRef]);

  // Cmd/Ctrl + 滚轮 或 触控板双指缩放（浏览器会设 ctrlKey）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -WHEEL_STEP : WHEEL_STEP;
      setUserScale((prev) => {
        const current = prev ?? fitScaleRef.current;
        return clamp(current + delta, MIN_SCALE, MAX_SCALE);
      });
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [containerRef]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-end border-b border-zinc-200 bg-white px-4 py-1.5">
        <ZoomControls
          scale={effectiveScale}
          isAuto={userScale === null}
          onChange={(v) => setUserScale(v)}
          onFit={() => setUserScale(null)}
        />
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-zinc-100 p-8"
      >
        <div
          className="mx-auto shadow-2xl shadow-zinc-900/10"
          style={{
            width: `${templateWidth * effectiveScale}px`,
            height: `${contentHeight * effectiveScale}px`,
          }}
        >
          <div
            ref={contentRef}
            style={{
              width: `${templateWidth}px`,
              transform: `scale(${effectiveScale})`,
              transformOrigin: "top left",
              willChange: "transform",
            }}
          >
            <Template data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomControls({
  scale,
  isAuto,
  onChange,
  onFit,
}: {
  scale: number;
  isAuto: boolean;
  onChange: (scale: number) => void;
  onFit: () => void;
}) {
  const pct = Math.round(scale * 100);
  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-3 py-1">
      <span className="w-10 text-center text-xs tabular-nums text-zinc-600">
        {pct}%
      </span>
      <input
        type="range"
        min={MIN_SCALE}
        max={MAX_SCALE}
        step={0.05}
        value={scale}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label="缩放"
        className="h-1.5 w-24 accent-zinc-900"
      />
      <div className="h-4 w-px bg-zinc-200" />
      <button
        type="button"
        onClick={onFit}
        title="适应窗口"
        aria-pressed={isAuto}
        className={`inline-flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium transition ${
          isAuto
            ? "bg-zinc-900 text-white"
            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
        }`}
      >
        <Maximize2 size={11} />
        Fit
      </button>
    </div>
  );
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
