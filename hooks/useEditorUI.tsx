"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type EditorMode = "editor" | "split" | "preview";

interface UIState {
  mode: EditorMode;
  collapsedSections: string[];
}

const STORAGE_KEY = "resume:editor-ui";
const DEFAULT_STATE: UIState = { mode: "split", collapsedSections: [] };

function loadUI(): UIState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<UIState>;
    return {
      mode:
        parsed.mode === "editor" || parsed.mode === "preview"
          ? parsed.mode
          : "split",
      collapsedSections: Array.isArray(parsed.collapsedSections)
        ? parsed.collapsedSections.filter((v) => typeof v === "string")
        : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveUI(state: UIState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("[editor-ui] save failed:", err);
  }
}

interface ContextValue {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  isCollapsed: (sectionId: string) => boolean;
  toggleCollapse: (sectionId: string) => void;
}

const EditorUIContext = createContext<ContextValue | null>(null);

export function EditorUIProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UIState>(DEFAULT_STATE);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    setState(loadUI());
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    saveUI(state);
  }, [state, restored]);

  const setMode = useCallback((mode: EditorMode) => {
    setState((s) => (s.mode === mode ? s : { ...s, mode }));
  }, []);

  const toggleCollapse = useCallback((sectionId: string) => {
    setState((s) => {
      const exists = s.collapsedSections.includes(sectionId);
      return {
        ...s,
        collapsedSections: exists
          ? s.collapsedSections.filter((id) => id !== sectionId)
          : [...s.collapsedSections, sectionId],
      };
    });
  }, []);

  const isCollapsed = useCallback(
    (sectionId: string) => state.collapsedSections.includes(sectionId),
    [state.collapsedSections],
  );

  const value = useMemo<ContextValue>(
    () => ({ mode: state.mode, setMode, isCollapsed, toggleCollapse }),
    [state.mode, setMode, isCollapsed, toggleCollapse],
  );

  return (
    <EditorUIContext.Provider value={value}>
      {children}
    </EditorUIContext.Provider>
  );
}

export function useEditorUI(): ContextValue {
  const ctx = useContext(EditorUIContext);
  if (!ctx) {
    throw new Error("useEditorUI must be used inside <EditorUIProvider>");
  }
  return ctx;
}
