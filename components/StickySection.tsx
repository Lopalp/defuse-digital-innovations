"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export function StickySection({
  children,
  scrollHeight = "250vh",
}: {
  children: (progress: number) => ReactNode;
  scrollHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScroll = container.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      setProgress(Math.min(1, scrolled / totalScroll));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-dvh overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
