"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type Rect = { top: number; left: number; width: number; height: number };
type TransitionAPI = {
  navigate: (rect: Rect, src: string, href: string) => void;
};

const Ctx = createContext<TransitionAPI>({ navigate: () => {} });
export const usePageTransition = () => useContext(Ctx);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Image expand (homepage)
  const [img, setImg] = useState<(Rect & { src: string }) | null>(null);
  const [imgPhase, setImgPhase] = useState(0);

  const navigate = useCallback(
    (rect: Rect, src: string, href: string) => {
      setImg({ ...rect, src });
      setImgPhase(1);
      
      // Delay to ensure the overlay is rendered before starting the animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setImgPhase(2);
        });
      });
      
      // Navigate to the new page after the expansion animation is mostly complete
      setTimeout(() => {
        router.push(href);
      }, 800);
      
      // Start fading out the overlay
      setTimeout(() => {
        setImgPhase(3);
      }, 1200);
      
      // Clean up
      setTimeout(() => {
        setImg(null);
        setImgPhase(0);
      }, 1800);
    },
    [router],
  );

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}

      {/* Image expand overlay (homepage) */}
      {img && (
        <div
          className="fixed z-[9999] overflow-hidden pointer-events-none"
          style={{
            top: imgPhase >= 2 ? 0 : img.top,
            left: imgPhase >= 2 ? 0 : img.left,
            width: imgPhase >= 2 ? "100vw" : img.width,
            height: imgPhase >= 2 ? "100dvh" : img.height,
            borderRadius: imgPhase >= 2 ? 0 : 16,
            opacity: imgPhase >= 3 ? 0 : 1,
            transition: imgPhase >= 2
              ? [
                  `top 0.9s ${EASE_OUT}`,
                  `left 0.9s ${EASE_OUT}`,
                  `width 0.9s ${EASE_OUT}`,
                  `height 0.9s ${EASE_OUT}`,
                  `border-radius 1.2s ${EASE_OUT}`,
                  `opacity 0.6s ease-out`
                ].join(", ")
              : "none",
          }}
        >
          <Image src={img.src} alt="" fill className="object-cover" sizes="100vw" />
        </div>
      )}
    </Ctx.Provider>
  );
}
