import type { ResumeData, TemplateId } from "./schema";

const draftKey = (template: TemplateId) => `resume:draft:${template}`;

export function saveDraft(template: TemplateId, data: ResumeData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(draftKey(template), JSON.stringify(data));
  } catch (err) {
    console.error("[storage] save failed:", err);
  }
}

export function loadDraft(template: TemplateId): ResumeData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(draftKey(template));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ResumeData;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (err) {
    console.error("[storage] load failed:", err);
    return null;
  }
}

export function clearDraft(template: TemplateId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(draftKey(template));
  } catch (err) {
    console.error("[storage] clear failed:", err);
  }
}
