"use client";

import { useResumeData } from "@/hooks/useResumeData";
import type { SocialLinks } from "@/lib/schema";
import { Field, SectionShell, inputClass } from "./ui";

const FIELDS: Array<{
  key: keyof SocialLinks;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "url";
}> = [
  { key: "email", label: "邮箱", placeholder: "hello@example.com", type: "email" },
  { key: "phone", label: "电话", placeholder: "+86 138 0000 0000", type: "tel" },
  { key: "github", label: "GitHub", placeholder: "https://github.com/your-handle", type: "url" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/your-handle", type: "url" },
  { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/your-handle", type: "url" },
  { key: "website", label: "个人网站", placeholder: "https://your-website.com", type: "url" },
];

export default function SocialsSection() {
  const { data, updateSocials } = useResumeData();

  return (
    <SectionShell sectionId="contact" title="联系与社交" tag="CONTACT" hideable>
      {FIELDS.map(({ key, label, placeholder, type }) => (
        <Field key={key} label={label} hint="留空则不显示">
          <input
            type={type}
            value={data.socials[key] ?? ""}
            onChange={(e) => updateSocials({ [key]: e.target.value } as Partial<SocialLinks>)}
            placeholder={placeholder}
            className={inputClass}
          />
        </Field>
      ))}
    </SectionShell>
  );
}
