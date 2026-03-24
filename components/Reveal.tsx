"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";
type Animation = "slide" | "scale" | "fade";

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  animation = "slide",
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  animation?: Animation;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  const translates: Record<Direction, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "",
  };

  let initialTransform: string;
  switch (animation) {
    case "scale":
      initialTransform = `scale(0.9) ${translates[direction]}`.trim();
      break;
    case "fade":
      initialTransform = "none";
      break;
    default:
      initialTransform = translates[direction] || "none";
      break;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialTransform,
        transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
