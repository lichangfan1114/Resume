"use client";

import { useResumeData } from "@/hooks/useResumeData";
import MonthYearInput from "./MonthYearInput";
import { EmptyListHint, Field, ItemCard, SectionShell, inputClass } from "./ui";

export default function ProjectsSection() {
  const { data, addProject, updateProject, removeProject } = useResumeData();
  const items = data.projects;

  return (
    <SectionShell
      sectionId="projects"
      title="项目"
      tag="PROJECTS"
      hideable
      onAdd={() => addProject()}
      addLabel="+ 添加项目"
    >
      {items.length === 0 ? (
        <EmptyListHint>还没有项目，点下方按钮添加。</EmptyListHint>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} onRemove={() => removeProject(item.id)}>
            <Field label="项目名称">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateProject(item.id, { name: e.target.value })}
                placeholder="项目名称"
                className={inputClass}
              />
            </Field>

            <Field label="链接" hint="可选">
              <input
                type="url"
                value={item.link ?? ""}
                onChange={(e) => updateProject(item.id, { link: e.target.value })}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="开始时间">
                <MonthYearInput
                  value={item.startDate}
                  onChange={(v) => updateProject(item.id, { startDate: v })}
                />
              </Field>
              <Field label="结束时间">
                <MonthYearInput
                  value={item.endDate}
                  onChange={(v) => updateProject(item.id, { endDate: v })}
                  allowPresent
                />
              </Field>
            </div>

            <Field label="项目描述" hint="突出贡献和成果">
              <textarea
                value={item.description}
                onChange={(e) => updateProject(item.id, { description: e.target.value })}
                placeholder="简述项目目标、你的角色与可量化的结果..."
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
