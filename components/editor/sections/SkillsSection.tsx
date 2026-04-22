"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useResumeData } from "@/hooks/useResumeData";
import { EmptyListHint, Field, SectionShell, inputClass } from "./ui";

export default function SkillsSection() {
  const { data, setSkills } = useResumeData();
  const [draft, setDraft] = useState("");

  const addSkill = () => {
    const value = draft.trim();
    if (!value || data.skills.includes(value)) {
      setDraft("");
      return;
    }
    setSkills([...data.skills, value]);
    setDraft("");
  };

  const updateAt = (idx: number, value: string) => {
    const next = [...data.skills];
    next[idx] = value;
    setSkills(next);
  };

  const removeAt = (idx: number) => {
    setSkills(data.skills.filter((_, i) => i !== idx));
  };

  const commitAt = (idx: number) => {
    const current = data.skills[idx] ?? "";
    const trimmed = current.trim();
    if (!trimmed) {
      removeAt(idx);
    } else if (trimmed !== current) {
      updateAt(idx, trimmed);
    }
  };

  return (
    <SectionShell sectionId="skills" title="技能" tag="SKILLS" hideable>
      <Field label="已添加技能" hint="点击标签可直接编辑">
        {data.skills.length === 0 ? (
          <EmptyListHint>还没有技能，下方输入回车添加。</EmptyListHint>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 py-1 pl-2.5 pr-1 text-sm text-zinc-700 transition focus-within:border-zinc-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-zinc-900/10"
              >
                <input
                  type="text"
                  value={skill}
                  size={Math.max(skill.length + 1, 3)}
                  onChange={(e) => updateAt(idx, e.target.value)}
                  onBlur={() => commitAt(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  aria-label={`技能 ${idx + 1}`}
                  className="min-w-[2ch] bg-transparent text-zinc-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  aria-label={`删除 ${skill}`}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700"
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </Field>

      <Field label="新增技能" hint="回车确认">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="例如：TypeScript"
          className={inputClass}
        />
      </Field>
    </SectionShell>
  );
}
