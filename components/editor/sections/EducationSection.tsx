"use client";

import { useResumeData } from "@/hooks/useResumeData";
import MonthYearInput from "./MonthYearInput";
import { EmptyListHint, Field, ItemCard, SectionShell, inputClass } from "./ui";

export default function EducationSection() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeData();
  const items = data.education;

  return (
    <SectionShell
      sectionId="education"
      title="教育背景"
      tag="EDUCATION"
      hideable
      onAdd={() => addEducation()}
      addLabel="+ 添加学历"
    >
      {items.length === 0 ? (
        <EmptyListHint>还没有学历，点下方按钮添加。</EmptyListHint>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} onRemove={() => removeEducation(item.id)}>
            <Field label="学校">
              <input
                type="text"
                value={item.school}
                onChange={(e) => updateEducation(item.id, { school: e.target.value })}
                placeholder="示例大学"
                className={inputClass}
              />
            </Field>

            <Field label="专业 / 学历">
              <input
                type="text"
                value={item.major}
                onChange={(e) => updateEducation(item.id, { major: e.target.value })}
                placeholder="专业名称 · 学历"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="开始时间">
                <MonthYearInput
                  value={item.startDate}
                  onChange={(v) => updateEducation(item.id, { startDate: v })}
                />
              </Field>
              <Field label="结束时间">
                <MonthYearInput
                  value={item.endDate}
                  onChange={(v) => updateEducation(item.id, { endDate: v })}
                  allowPresent
                />
              </Field>
            </div>

            <Field label="补充说明" hint="可选">
              <textarea
                value={item.description}
                onChange={(e) => updateEducation(item.id, { description: e.target.value })}
                placeholder="奖项、GPA、研究方向等..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </ItemCard>
        ))
      )}
    </SectionShell>
  );
}
