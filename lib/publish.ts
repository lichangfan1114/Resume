import type { ResumeData } from "./schema";
import { isSupabaseConfigured, supabase } from "./supabase";

// 配了 Supabase 就走真后端（跨设备可访问）；否则回退到 localStorage（仅本浏览器）。
// 接口签名稳定，上层调用方（编辑器发布按钮 / /resume/[id] 页面）不用改。

export interface PublishResult {
  id: string;
  url: string;
}

const PUB_KEY = (id: string) => `resume:published:${id}`;
const PUB_INDEX_KEY = "resume:published:index";
const TABLE = "resumes";

export async function publishResume(data: ResumeData): Promise<PublishResult> {
  if (typeof window === "undefined") {
    throw new Error("publishResume 只能在客户端调用");
  }
  const id = generateId();
  const snapshot: ResumeData = { ...data, id };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from(TABLE)
      .insert({ id, data: snapshot });
    if (error) {
      console.error("[publish] supabase insert failed:", error);
      throw new Error(`发布失败：${error.message}`);
    }
  } else {
    saveLocal(id, snapshot);
  }

  const origin = window.location.origin;
  return { id, url: `${origin}/resume/${id}` };
}

export async function getPublishedResume(
  id: string,
): Promise<ResumeData | null> {
  if (typeof window === "undefined") return null;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      console.error("[publish] supabase fetch failed:", error);
      // 网络/权限问题时仍尝试从本地兜底读取
      return loadLocal(id);
    }
    if (!data) return loadLocal(id);
    return (data as { data: ResumeData }).data ?? null;
  }

  return loadLocal(id);
}

// ——— localStorage 兜底 ———

function saveLocal(id: string, snapshot: ResumeData): void {
  try {
    localStorage.setItem(PUB_KEY(id), JSON.stringify(snapshot));
    const index = readIndex();
    index.unshift(id);
    localStorage.setItem(
      PUB_INDEX_KEY,
      JSON.stringify(Array.from(new Set(index)).slice(0, 20)),
    );
  } catch (err) {
    console.error("[publish] local save failed:", err);
  }
}

function loadLocal(id: string): ResumeData | null {
  try {
    const raw = localStorage.getItem(PUB_KEY(id));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ResumeData;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (err) {
    console.error("[publish] local load failed:", err);
    return null;
  }
}

function readIndex(): string[] {
  try {
    const raw = localStorage.getItem(PUB_INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  }
  return Math.random().toString(36).slice(2, 12);
}
