"use client";

import { useResumeData } from "@/hooks/useResumeData";
import MonthYearInput from "./MonthYearInput";
import { EmptyListHint, Field, ItemCard, SectionShell, inputClass } from "./ui";

export default function ExperienceSection() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeData();
  const items = data.experience;

  return (
    <SectionShell
      sectionId="experience"
      title="工作经历"
      tag="EXPERIENCE"
      hideable
      onAdd={() => addExperience()}
      addLabel="+ 添加经历"
    >
      {items.length === 0 ? (
        <EmptyListHint>还没有经历，点下方按钮添加。</EmptyListHint>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} onRemove={() => removeExperience(item.id)}>
            <Field label="公司 / 机构">
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                placeholder="公司名称"
                className={inputClass}
              />
            </Field>

            <Field label="职位">
              <input
                type="text"
                value={item.role}
                onChange={(e) => updateExperience(item.id, { role: e.target.value })}
                placeholder="职位名称"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="开始时间">
                <MonthYearInput
                  value={item.startDate}
                  onChange={(v) => updateExperience(item.id, { startDate: v })}
                />
              </Field>
              <Field label="结束时间">
                <MonthYearInput
                  value={item.endDate}
                  onChange={(v) => updateExperience(item.id, { endDate: v })}
                  allowPresent
                />
              </Field>
            </div>

            <Field label="工作描述" hint="量化的成果最有说服力">
              <textarea
                value={item.description}
                onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                placeholder="列出主要职责与关键成果..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </ItemCard>
        ))
      )}
    </SectionShell>
  );
}
