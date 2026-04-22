import type { ComponentType } from "react";
import type { ResumeData, TemplateId } from "@/lib/schema";
import ResumeModern from "./modern/ResumeModern";
import ResumeMinimalist from "./minimalist/ResumeMinimalist";
import ResumeProfessional from "./professional/ResumeProfessional";

export type TemplateComponent = ComponentType<{ data: ResumeData }>;

export const TEMPLATE_COMPONENTS: Record<TemplateId, TemplateComponent> = {
  modern: ResumeModern,
  minimalist: ResumeMinimalist,
  professional: ResumeProfessional,
};

export function getTemplateComponent(id: TemplateId | string): TemplateComponent {
  if (id in TEMPLATE_COMPONENTS) {
    return TEMPLATE_COMPONENTS[id as TemplateId];
  }
  return ResumeModern;
}
