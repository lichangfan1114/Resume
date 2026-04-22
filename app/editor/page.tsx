import { redirect } from "next/navigation";
import EditorLayout from "@/components/editor/EditorLayout";
import { getTemplateMeta } from "@/lib/defaults";
import type { TemplateId } from "@/lib/schema";

const VALID_TEMPLATES: TemplateId[] = ["modern", "minimalist", "professional"];

interface Props {
  searchParams: Promise<{ template?: string }>;
}

export default async function EditorPage({ searchParams }: Props) {
  const { template } = await searchParams;

  if (!template || !VALID_TEMPLATES.includes(template as TemplateId)) {
    redirect("/templates");
  }

  const meta = getTemplateMeta(template as TemplateId)!;

  return <EditorLayout template={meta} />;
}
