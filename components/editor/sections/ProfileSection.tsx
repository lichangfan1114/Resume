"use client";

import { useRef } from "react";
import { Circle, ImagePlus, RectangleVertical } from "lucide-react";
import { useResumeData } from "@/hooks/useResumeData";
import { compressImage } from "@/lib/image";
import type { AvatarShape } from "@/lib/schema";
import DefaultAvatar from "@/components/templates/modern/DefaultAvatar";
import { Field, SectionShell, inputClass } from "./ui";

export default function ProfileSection() {
  const { data, updateProfile } = useResumeData();
  const { profile } = data;
  const inputRef = useRef<HTMLInputElement>(null);
  const shape: AvatarShape = profile.avatarShape ?? "circle";
  const isRect = shape === "rectangle";

  const handleFile = async (file: File) => {
    try {
      const base64 = await compressImage(file, {
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.85,
      });
      updateProfile({ avatar: base64 });
    } catch (err) {
      console.error("[avatar] 上传失败:", err);
      window.alert("图片读取失败，请换一张试试。");
    }
  };

  return (
    <SectionShell sectionId="top" title="基本信息" tag="PROFILE">
      <Field label="姓名">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          placeholder="你的姓名"
          className={inputClass}
        />
      </Field>

      <Field label="头衔 / 职位">
        <input
          type="text"
          value={profile.title}
          onChange={(e) => updateProfile({ title: e.target.value })}
          placeholder="职位名称 · 专长方向"
          className={inputClass}
        />
      </Field>

      <Field label="地点">
        <input
          type="text"
          value={profile.location}
          onChange={(e) => updateProfile({ location: e.target.value })}
          placeholder="城市 · 国家"
          className={inputClass}
        />
      </Field>

      <Field label="一句话介绍" hint="建议 2 到 3 行内">
        <textarea
          value={profile.bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          placeholder="在这里写一段关于你的简介..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field label="头像形状">
        <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1">
          <ShapeButton
            label="圆形"
            Icon={Circle}
            active={shape === "circle"}
            onClick={() => updateProfile({ avatarShape: "circle" })}
          />
          <ShapeButton
            label="长方形"
            Icon={RectangleVertical}
            active={shape === "rectangle"}
            onClick={() => updateProfile({ avatarShape: "rectangle" })}
          />
        </div>
      </Field>

      <Field label="头像照片" hint="建议正方形，自动压缩至 512px">
        <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white px-3 py-3">
          <div
            className={`relative shrink-0 overflow-hidden bg-zinc-100 ${
              isRect ? "h-20 w-[60px] rounded-xl" : "h-16 w-16 rounded-full"
            }`}
          >
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <DefaultAvatar shape={shape} className="h-full w-full" />
            )}
          </div>
          <div className="flex flex-1 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <ImagePlus size={13} />
              {profile.avatar ? "更换头像" : "上传头像"}
            </button>
            {profile.avatar && (
              <button
                type="button"
                onClick={() => updateProfile({ avatar: "" })}
                className="inline-flex h-8 items-center rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                恢复默认
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </Field>
    </SectionShell>
  );
}

function ShapeButton({
  label,
  Icon,
  active,
  onClick,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
      aria-pressed={active}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}
