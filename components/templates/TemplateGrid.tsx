import { TEMPLATES } from "@/lib/defaults";
import TemplateCard from "./TemplateCard";

export default function TemplateGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {TEMPLATES.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
