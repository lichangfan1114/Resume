"use client";

import { useEffect, useRef, useState } from "react";

export const TEMPLATE_WIDTH = 794;
const INITIAL_HEIGHT = 1123;

export function usePreviewScale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = (width: number) => {
      if (width <= 0) return;
      setScale(Math.min(1, width / TEMPLATE_WIDTH));
    };
    update(el.clientWidth);
    const observer = new ResizeObserver((entries) => {
      update(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setContentHeight(el.offsetHeight);
    const observer = new ResizeObserver((entries) => {
      setContentHeight(entries[0].contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { containerRef, contentRef, scale, contentHeight, templateWidth: TEMPLATE_WIDTH };
}
