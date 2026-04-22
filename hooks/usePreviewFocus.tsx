"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface ContextValue {
  focusedSection: string | null;
  focusSection: (id: string) => void;
  setPreviewEl: (el: HTMLDivElement | null) => void;
}

const PreviewFocusContext = createContext<ContextValue | null>(null);

export function PreviewFocusProvider({ children }: { children: React.ReactNode }) {
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const previewElRef = useRef<HTMLDivElement | null>(null);

  const focusSection = useCallback((id: string) => setFocusedSection(id), []);

  const setPreviewEl = useCallback((el: HTMLDivElement | null) => {
    previewElRef.current = el;
  }, []);

  return (
    <PreviewFocusContext.Provider
      value={{ focusedSection, focusSection, setPreviewEl }}
    >
      {children}
    </PreviewFocusContext.Provider>
  );
}

export function usePreviewFocus(): ContextValue {
  const ctx = useContext(PreviewFocusContext);
  if (!ctx) {
    throw new Error("usePreviewFocus must be used inside <PreviewFocusProvider>");
  }
  return ctx;
}
