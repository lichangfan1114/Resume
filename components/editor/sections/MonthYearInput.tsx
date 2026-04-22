"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, X } from "lucide-react";

const PRESENT = "至今";
const POPOVER_WIDTH = 288;
const POPOVER_HEIGHT = 300;

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowPresent?: boolean;
}

export default function MonthYearInput({
  value,
  onChange,
  placeholder = "选择年月",
  allowPresent = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [stagedYear, setStagedYear] = useState<number>(() => new Date().getFullYear());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const isPresent = value === PRESENT;
  const [currentYear, currentMonth] = parseYearMonth(value);

  // Open popover: compute position + seed staged year
  const handleOpen = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const y =
      spaceBelow >= POPOVER_HEIGHT + 16
        ? rect.bottom + 6
        : rect.top - POPOVER_HEIGHT - 6;
    const x = Math.max(
      8,
      Math.min(rect.left, window.innerWidth - POPOVER_WIDTH - 8),
    );
    setCoords({ x, y });
    setStagedYear(currentYear ?? new Date().getFullYear());
    setOpen(true);
  };

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        popoverRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll year list so current year is visible when opening
  useLayoutEffect(() => {
    if (!open || !popoverRef.current) return;
    const active = popoverRef.current.querySelector<HTMLButtonElement>(
      "[data-active-year='true']",
    );
    active?.scrollIntoView({ block: "center" });
  }, [open]);

  const commit = (year: number, month: number) => {
    onChange(`${year}-${String(month).padStart(2, "0")}`);
    setOpen(false);
  };

  const togglePresent = () => {
    if (isPresent) {
      onChange("");
    } else {
      onChange(PRESENT);
      setOpen(false);
    }
  };

  const clearValue = () => {
    onChange("");
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className={`flex h-9 w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 text-sm transition hover:border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 ${
          value ? "text-zinc-900" : "text-zinc-300"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <Calendar size={13} className="ml-2 shrink-0 text-zinc-400" />
      </button>

      {mounted && open &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              width: POPOVER_WIDTH,
              zIndex: 50,
            }}
            className="rounded-xl border border-zinc-200 bg-white p-3 shadow-xl"
          >
            {allowPresent && (
              <div className="mb-3 flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
                <span className="text-sm font-medium text-zinc-700">
                  至今 / Present
                </span>
                <button
                  type="button"
                  onClick={togglePresent}
                  aria-pressed={isPresent}
                  className={`relative h-5 w-9 rounded-full transition ${
                    isPresent ? "bg-zinc-900" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      isPresent ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}

            {!isPresent && (
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <span className="mb-1 text-[10px] font-medium tracking-[0.2em] text-zinc-400">
                    YEAR
                  </span>
                  <div className="h-44 w-16 overflow-y-auto rounded-lg border border-zinc-100 bg-zinc-50/40">
                    {generateYears().map((y) => {
                      const active = y === stagedYear;
                      const isCurrent = y === currentYear;
                      return (
                        <button
                          key={y}
                          type="button"
                          data-active-year={active}
                          onClick={() => setStagedYear(y)}
                          className={`block w-full py-1 text-xs tabular-nums transition ${
                            active
                              ? "bg-zinc-900 text-white"
                              : isCurrent
                                ? "font-semibold text-zinc-900 hover:bg-zinc-100"
                                : "text-zinc-600 hover:bg-zinc-100"
                          }`}
                        >
                          {y}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="mb-1 text-[10px] font-medium tracking-[0.2em] text-zinc-400">
                    MONTH
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                      const active = m === currentMonth && stagedYear === currentYear;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => commit(stagedYear, m)}
                          className={`rounded-md px-1 py-2 text-xs tabular-nums transition ${
                            active
                              ? "bg-zinc-900 text-white hover:bg-zinc-800"
                              : "text-zinc-700 hover:bg-zinc-100"
                          }`}
                        >
                          {m} 月
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 text-xs">
              <button
                type="button"
                onClick={clearValue}
                className="inline-flex items-center gap-1 text-zinc-500 transition hover:text-red-600"
              >
                <X size={11} />
                清空
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-zinc-500 transition hover:text-zinc-900"
              >
                关闭
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function generateYears(): number[] {
  const now = new Date().getFullYear();
  const years: number[] = [];
  for (let y = now + 2; y >= now - 30; y--) years.push(y);
  return years;
}

function parseYearMonth(v: string): [number | null, number | null] {
  if (!v || v === PRESENT) return [null, null];
  const match = v.match(/^(\d{4})-(\d{1,2})$/);
  if (!match) return [null, null];
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (Number.isNaN(y) || Number.isNaN(m) || m < 1 || m > 12) return [null, null];
  return [y, m];
}
