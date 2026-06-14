"use client";

import { useRef } from "react";
import { useAdminLocale } from "./AdminLocaleProvider";

interface ImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  onUpload: (files: FileList | File[]) => Promise<void>;
  uploading: boolean;
}

export default function ImageGallery({
  images,
  onChange,
  onUpload,
  uploading,
}: ImageGalleryProps) {
  const { t } = useAdminLocale();
  const dragIndex = useRef<number | null>(null);

  const reorder = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-4 rounded-sm border border-border bg-surface-elevated p-4">
      <div>
        <p className="text-sm font-medium text-gold">{t("images")}</p>
        <p className="mt-1 text-xs text-muted">{t("imageHint")}</p>
        <p className="mt-1 text-xs text-muted">{t("dragHint")}</p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-border px-4 py-6 transition hover:border-gold/50">
        <span className="text-sm text-muted">
          {uploading ? t("uploading") : t("uploadImages")}
        </span>
        <span className="mt-1 text-xs text-muted">JPG, PNG, WebP</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={uploading}
          className="sr-only"
          onChange={async (e) => {
            const files = e.target.files;
            if (files?.length) await onUpload(files);
            e.target.value = "";
          }}
        />
      </label>

      {images.length > 0 && (
        <ul className="space-y-2">
          {images.map((url, index) => (
            <li
              key={`${url}-${index}`}
              draggable
              onDragStart={() => {
                dragIndex.current = index;
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex.current !== null) {
                  reorder(dragIndex.current, index);
                  dragIndex.current = null;
                }
              }}
              onDragEnd={() => {
                dragIndex.current = null;
              }}
              className="flex cursor-grab items-center gap-3 rounded-sm border border-border bg-background p-2 active:cursor-grabbing"
            >
              <span className="select-none text-lg text-muted" aria-hidden>
                ⠿
              </span>
              <img
                src={url}
                alt=""
                className="h-16 w-24 shrink-0 rounded-sm object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted">
                  {index === 0 ? t("coverImage") : `#${index + 1}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
                className="shrink-0 rounded-sm px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
              >
                {t("delete")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
