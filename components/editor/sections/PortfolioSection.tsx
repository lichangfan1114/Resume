"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { useResumeData } from "@/hooks/useResumeData";
import { compressImage } from "@/lib/image";
import { EmptyListHint, Field, ItemCard, SectionShell, inputClass } from "./ui";

export default function PortfolioSection() {
  const { data, addPortfolio, updatePortfolio, removePortfolio } = useResumeData();
  const items = data.portfolio;

  return (
    <SectionShell
      sectionId="portfolio"
      title="作品集"
      tag="PORTFOLIO"
      hideable
      onAdd={() => addPortfolio()}
      addLabel="+ 添加作品"
    >
      {items.length === 0 ? (
        <EmptyListHint>还没有作品，点下方按钮添加。</EmptyListHint>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} onRemove={() => removePortfolio(item.id)}>
            <Field label="封面图" hint="支持 JPG / PNG">
              <ImageUploader
                image={item.image}
                onChange={(image) => updatePortfolio(item.id, { image })}
                onClear={() => updatePortfolio(item.id, { image: "" })}
              />
            </Field>

            <Field label="说明">
              <input
                type="text"
                value={item.caption}
                onChange={(e) => updatePortfolio(item.id, { caption: e.target.value })}
                placeholder="作品标题 · 简短描述"
                className={inputClass}
              />
            </Field>
          </ItemCard>
        ))
      )}
    </SectionShell>
  );
}

function ImageUploader({
  image,
  onChange,
  onClear,
}: {
  image: string;
  onChange: (base64: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    try {
      const base64 = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 900,
        quality: 0.85,
      });
      onChange(base64);
    } catch (err) {
      console.error("[portfolio] 上传失败:", err);
      window.alert("图片读取失败，请换一张试试。");
    }
  };

  if (image) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-zinc-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="portfolio preview" className="aspect-[4/3] w-full object-cover" />
        <div className="flex items-center justify-between border-t border-zinc-100 bg-white px-3 py-2 text-xs">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-zinc-600 hover:text-zinc-900"
          >
            更换
          </button>
          <button
            type="button"
            onClick={onClear}
            className="text-red-500 hover:text-red-600"
          >
            移除
          </button>
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
    );
  }

  return (
    <label className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 transition hover:border-zinc-400 hover:bg-zinc-100">
      <ImagePlus size={20} />
      <span>点击或拖拽上传图片</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </label>
  );
}
