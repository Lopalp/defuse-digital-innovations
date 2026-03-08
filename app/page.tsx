"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Triangle,
  Circle,
  Hexagon,
  Square,
  Octagon,
  Zap,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const partners = [
  { icon: Triangle, name: "Partner 1" },
  { icon: Circle, name: "Partner 2" },
  { icon: Hexagon, name: "Partner 3" },
  { icon: Square, name: "Partner 4" },
  { icon: Octagon, name: "Partner 5" },
];

const IMG_1 =
  "https://images.unsplash.com/photo-1772752021285-27e336543d01?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_2 =
  "https://images.unsplash.com/photo-1628776385527-3be340a9b419?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_3 =
  "https://images.unsplash.com/photo-1588097237448-45f7aadebae1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_4 =
  "https://images.unsplash.com/photo-1597865633454-41df015240ec?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const allCards = [
  {
    icon: Zap,
    title: "Skalierbare Infrastruktur",
    description:
      "Von Startup bis Enterprise — unsere Plattform wächst mit deinem Business mit.",
    image: IMG_1,
  },
  {
    icon: BarChart3,
    title: "Echtzeit Analytics",
    description:
      "Verstehe deine Kunden besser mit detaillierten Einblicken in Echtzeit.",
    image: HERO_IMAGE,
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Deine Daten sind bei uns sicher. SOC 2 zertifiziert und DSGVO-konform.",
    image: IMG_2,
  },
  {
    separator: true,
    icon: Zap,
    title: "PROJECTS",
    description: "",
    image: "",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Datengetriebene Insights für nachhaltiges und skalierbares Wachstum.",
    image: IMG_3,
  },
  {
    icon: Hexagon,
    title: "Brand Identity",
    description:
      "Einzigartiges Branding, das deine Marke unverwechselbar macht.",
    image: IMG_4,
  },
  {
    icon: Users,
    title: "Team Scaling",
    description:
      "Skaliere dein Team effizient mit den richtigen Prozessen und Tools.",
    image: IMG_1,
  },
  {
    icon: Square,
    title: "Office Culture",
    description:
      "Arbeitskultur, die Top-Talente anzieht und langfristig bindet.",
    image: IMG_3,
  },
];

function PartnerSet() {
  return (
    <div className="flex items-center gap-12 sm:gap-20 md:gap-32 px-6 sm:px-10 md:px-16">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <partner.icon className="w-5 h-5 text-gray-900" />
          <span className="hidden sm:inline text-sm font-semibold text-gray-900">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}

const ZERO = { top: 0, right: 0, bottom: 0, left: 0 };

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hScrollRef = useRef(0);
  const scrollingBackRef = useRef(false);
  const animatingRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastDeltaRef = useRef(0);
  const hScrollRafRef = useRef<number | null>(null);
  const hoveredCardRef = useRef<number | null>(null);
  const hoverTransRef = useRef(false);
  const hoverTransTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateHScroll = useCallback((target: number, duration = 900) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    const start = hScrollRef.current;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (target - start) * eased;
      hScrollRef.current = value;
      setHScroll(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        hScrollRef.current = target;
        setHScroll(target);
        setTimeout(() => { animatingRef.current = false; }, 50);
      }
    };
    requestAnimationFrame(step);
  }, []);

  const animateVertical = useCallback((target: number, duration = 900) => {
    const container = scrollRef.current;
    if (!container || animatingRef.current) return;
    animatingRef.current = true;
    container.style.scrollSnapType = 'none';
    const start = container.scrollTop;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      container.scrollTop = start + (target - start) * eased;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        container.scrollTop = target;
        container.style.scrollSnapType = '';
        setTimeout(() => { animatingRef.current = false; }, 50);
      }
    };
    requestAnimationFrame(step);
  }, []);

  const [scrollRatio, setScrollRatio] = useState(0);
  const [partnersOpacity, setPartnersOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
  const [isMd, setIsMd] = useState(true);

  const [startInsets, setStartInsets] = useState([ZERO, ZERO, ZERO]);
  const [endInsets, setEndInsets] = useState([ZERO, ZERO, ZERO]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hScroll, setHScroll] = useState(0);
  const [peekShown, setPeekShown] = useState(false);
  const peekTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridParamsRef = useRef({ vw: 0, vh: 0, gridLeft: 0, colW: 0, gap: 20, tb: 0, entryDist: 0, s3Left: 0 });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const md = vw >= 768;
      setIsMd(md);

      if (!md) {
        setStartInsets([ZERO, ZERO, ZERO]);
        setEndInsets([ZERO, ZERO, ZERO]);
        return;
      }

      const px = 32;
      const gap = 20;
      const maxW = 1152;
      const gridW = Math.min(vw - 2 * px, maxW);
      const gridLeft = (vw - gridW) / 2;
      const colW = (gridW - 2 * gap) / 3;
      const gridH = colW * 1.4;
      const tb = Math.max(80, (vh - gridH) / 2);
      const s3Left = 2 * gap;
      const entryDist = vw - s3Left - 3 * (colW + gap);
      gridParamsRef.current = { vw, vh, gridLeft, colW, gap, tb, entryDist, s3Left };

      document.documentElement.style.setProperty('--col-w', `${colW}px`);
      document.documentElement.style.setProperty('--grid-left', `${gridLeft}px`);

      const shift = vw * 1.15;

      setStartInsets([
        { top: 0, bottom: 0, left: -shift, right: shift },
        { top: 0, bottom: 0, left: 0, right: 0 },
        { top: 0, bottom: 0, left: shift, right: -shift },
      ]);

      setEndInsets([
        { top: tb, bottom: tb, left: gridLeft, right: vw - gridLeft - colW },
        {
          top: tb,
          bottom: tb,
          left: gridLeft + colW + gap,
          right: vw - (gridLeft + 2 * colW + gap),
        },
        {
          top: tb,
          bottom: tb,
          left: gridLeft + 2 * colW + 2 * gap,
          right: gridLeft,
        },
      ]);

      // Clamp hScroll to new max on resize
      const maxH = Math.max(0, vw + (allCards.length - 5) * (colW + gap) + colW);
      if (hScrollRef.current > maxH) {
        hScrollRef.current = maxH;
        setHScroll(maxH);
      }
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const vh = el.clientHeight;
    const ratio = el.scrollTop / vh;

    setScrollRatio(ratio);
    setPartnersOpacity(1 - Math.min(ratio / 0.25, 1));
    setActiveSection(Math.round(ratio));

    // Reset hScroll when going back to hero
    if (ratio < 0.5) {
      hScrollRef.current = 0;
      setHScroll(0);
      scrollingBackRef.current = false;
    }
  }, []);

  // Wheel handler — drag & settle with threshold for all transitions
  useEffect(() => {
    const scheduleHUpdate = () => {
      if (hScrollRafRef.current === null) {
        hScrollRafRef.current = requestAnimationFrame(() => {
          hScrollRafRef.current = null;
          if (!animatingRef.current) {
            setHScroll(hScrollRef.current);
          }
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const container = scrollRef.current;
      if (!container) return;
      if (animatingRef.current) return;
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (hoveredCardRef.current !== null) {
        hoveredCardRef.current = null;
        hoverTransRef.current = false;
        if (hoverTransTimerRef.current) clearTimeout(hoverTransTimerRef.current);
        setHoveredCard(null);
      }

      lastDeltaRef.current = e.deltaY;

      const vh = container.clientHeight;
      const gp = gridParamsRef.current;
      const snapTarget = gp.vw - gp.s3Left;
      const maxH = Math.max(0, gp.vw + (allCards.length - 5) * (gp.colW + gp.gap) + gp.colW);
      const morph = container.scrollTop / vh;

      // Direction-aware settle for hScroll
      const settleH = () => {
        const ratio = hScrollRef.current / snapTarget;
        const goFwd = lastDeltaRef.current >= 0 ? ratio > 0.35 : ratio > 0.65;
        if (goFwd) animateHScroll(snapTarget);
        else animateHScroll(0);
      };

      // === Zone 1: Horizontal territory (hScroll > 0) ===
      if (hScrollRef.current > 0) {
        if (hScrollRef.current >= snapTarget) {
          // Gallery: linear scroll
          const next = Math.max(0, Math.min(hScrollRef.current + e.deltaY, maxH));
          hScrollRef.current = next;
          scheduleHUpdate();

          if (next < snapTarget) {
            settleTimerRef.current = setTimeout(settleH, 50);
          }
        } else {
          // Snap zone: drag
          const next = Math.max(0, Math.min(hScrollRef.current + e.deltaY, snapTarget));
          hScrollRef.current = next;
          scheduleHUpdate();

          // Auto-complete: forward past 50%, backward below 10%
          if (e.deltaY > 0 && next >= snapTarget * 0.5) {
            animateHScroll(snapTarget);
          } else if (e.deltaY < 0 && next <= snapTarget * 0.1) {
            animateHScroll(0);
          } else {
            settleTimerRef.current = setTimeout(settleH, 50);
          }
        }
        return;
      }

      // === Zone 2: Vertical territory (hScroll = 0) ===
      // Section 2 settled, scrolling down → enter horizontal drag
      if (morph >= 0.995 && e.deltaY > 0) {
        const next = Math.min(e.deltaY, snapTarget);
        hScrollRef.current = next;
        scheduleHUpdate();

        if (next >= snapTarget * 0.5) {
          animateHScroll(snapTarget);
        } else {
          settleTimerRef.current = setTimeout(settleH, 50);
        }
        return;
      }

      // Vertical drag (1↔2)
      if (container.style.scrollSnapType !== 'none') container.style.scrollSnapType = 'none';
      container.scrollTop = Math.max(0, Math.min(container.scrollTop + e.deltaY, vh));

      const r = container.scrollTop / vh;
      // Auto-complete: forward past 55%, backward below 45%
      if (e.deltaY > 0 && r > 0.55) {
        scrollingBackRef.current = false;
        animateVertical(vh);
      } else if (e.deltaY < 0 && r < 0.45) {
        scrollingBackRef.current = true;
        animateVertical(0);
      } else {
        settleTimerRef.current = setTimeout(() => {
          const r2 = container.scrollTop / vh;
          const goFwd = lastDeltaRef.current >= 0 ? r2 > 0.3 : r2 > 0.7;
          if (goFwd) {
            scrollingBackRef.current = false;
            animateVertical(vh);
          } else {
            scrollingBackRef.current = true;
            animateVertical(0);
          }
        }, 50);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (hScrollRafRef.current !== null) cancelAnimationFrame(hScrollRafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // --- Derived morph values ---
  const morph = isMd ? Math.min(Math.max(scrollRatio, 0), 1) : 0;
  const settled = morph >= 0.995;

  // Peek: separator card appears once after morph settles, then stays with CSS nudge animation
  useEffect(() => {
    if (settled && hScroll === 0 && !peekShown) {
      peekTimerRef.current = setTimeout(() => {
        setPeekShown(true);
      }, 1500);
    }
    if (!settled || hScroll > 0) {
      if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
      setPeekShown(false);
    }
    return () => {
      if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
    };
  }, [settled, hScroll, peekShown]);
  const gp = gridParamsRef.current;
  const snapTarget = gp.vw - gp.s3Left;
  const centerH = (gp.vw + gp.colW) / 2 + (allCards.length - 4) * (gp.colW + gp.gap);
  const heroTextOp = 1 - Math.min(morph / 0.3, 1);
  const radius = morph * 1.5;
  const gridOp = isMd ? 0 : 1;
  const centerImgOp = 0.3 + morph * 0.7;
  const gradOp = morph;
  const textOp = Math.max(0, (morph - 0.85) / 0.15);

  return (
    <div className="overflow-hidden relative h-screen">
      {/* ===== Card Overlays (Desktop) ===== */}
      {isMd && gridParamsRef.current.vw > 0 && allCards.map((card, i) => {
        const isFeature = i < 3;
        const isCenter = i === 1;
        const gp = gridParamsRef.current;

        let top: number, right: number, bottom: number, left: number;
        let tx = 0; // translateX — GPU composited, no layout thrash

        const ed = gp.entryDist;
        const phase2 = Math.max(0, hScroll - ed);

        if (isFeature) {
          const s = startInsets[i];
          const e = endInsets[i];
          top = lerp(s.top, e.top, morph);
          right = lerp(s.right, e.right, morph);
          bottom = lerp(s.bottom, e.bottom, morph);
          left = lerp(s.left, e.left, morph);
          tx = -hScroll;
        } else {
          top = gp.tb;
          bottom = gp.tb;
          left = gp.vw + (i - 3) * (gp.colW + gp.gap);
          right = gp.vw - left - gp.colW;
          tx = -hScroll;
          // Pin last card to center
          if (i === allCards.length - 1) {
            const center = (gp.vw - gp.colW) / 2;
            tx = Math.max(center - left, tx);
          }
        }

        // Hover: push-aside effect for visible group of 3
        const stepSize = gp.colW + gp.gap;
        const baseIdx = stepSize > 0 ? Math.round(phase2 / stepSize) : 0;
        const isAligned = stepSize > 0 && Math.abs(phase2 - baseIdx * stepSize) < 5;

        if (isMd && settled && hoveredCard !== null && isAligned && baseIdx >= 3) {
          const visibles = [baseIdx, baseIdx + 1, baseIdx + 2];
          if (visibles.includes(i) && visibles.includes(hoveredCard)) {
            const gridW = 3 * gp.colW + 2 * gp.gap;
            const hoverW = gp.colW * 1.2;
            const otherW = (gridW - hoverW - 2 * gp.gap) / 2;
            const localIdx = i - baseIdx;
            const localHover = hoveredCard - baseIdx;
            let x = baseIdx >= 3 ? gp.s3Left : gp.gridLeft;
            for (let j = 0; j < 3; j++) {
              const w = j === localHover ? hoverW : otherW;
              if (j === localIdx) {
                left = x;
                right = gp.vw - x - w;
                top = j === localHover ? gp.tb - 10 : gp.tb + 10;
                bottom = j === localHover ? gp.tb - 10 : gp.tb + 10;
              }
              x += w + gp.gap;
            }
            tx = 0;
          }
        }

        const isSeparator = i === 3;

        // Separator peek: resting at ~10% visible, CSS animation nudges it further
        if (isSeparator && peekShown && hScroll === 0) {
          left = gp.vw - gp.colW * 0.10;
          right = -(gp.colW * 0.90);
        }

        // Visibility: cards 3+ only appear when hScroll moves them into view
        // Separator also shows during peek
        let opacity: number;
        if (isSeparator && peekShown && hScroll === 0) {
          opacity = 1;
        } else if (!isFeature && (!settled || hScroll === 0)) {
          opacity = 0;
        } else {
          opacity = 1;
        }

        // Cull off-screen cards (use visual position with transform)
        const cardW = gp.vw - left - right;
        const visualLeft = left + tx;
        if (visualLeft + cardW < -100 || visualLeft > gp.vw + 100) {
          return null;
        }

        // Per-card visual values
        const cardGradOp = isFeature ? gradOp : 1;
        const cardTextOp = isFeature ? textOp : 1;
        const cardImgOp = isCenter ? centerImgOp : 1;

        return (
          <div
            key={`overlay-${i}`}
            className={`fixed overflow-hidden ${settled && opacity > 0 && !(isFeature && hScroll > 0) ? 'cursor-pointer' : 'pointer-events-none'}`}
            style={{
              zIndex: hoveredCard === i ? 8 : isCenter && !settled ? 6 : 4,
              backgroundColor: isSeparator ? '#000' : undefined,
              top: `${top}px`,
              left: `${left}px`,
              right: `${right}px`,
              bottom: `${bottom}px`,
              borderRadius: `${radius}rem`,
              opacity,
              transform: `translateX(${tx}px)`,
              willChange: 'transform',
              animation: (isSeparator && peekShown && hScroll === 0)
                ? 'peek-nudge 4s cubic-bezier(0.16, 1, 0.3, 1) 2s infinite'
                : 'none',
              transition: (hoverTransRef.current && settled && isAligned)
                ? 'top 0.4s ease-out, left 0.4s ease-out, right 0.4s ease-out, bottom 0.4s ease-out, transform 0.4s ease-out'
                : (isSeparator && settled && hScroll === 0)
                  ? 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1), right 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out'
                  : 'none',
            }}
            onMouseEnter={() => {
              if (settled) {
                hoveredCardRef.current = i;
                hoverTransRef.current = true;
                if (hoverTransTimerRef.current) clearTimeout(hoverTransTimerRef.current);
                setHoveredCard(i);
              }
            }}
            onMouseLeave={() => {
              hoveredCardRef.current = null;
              setHoveredCard(null);
              // Keep transition active for smooth return animation
              if (hoverTransTimerRef.current) clearTimeout(hoverTransTimerRef.current);
              hoverTransTimerRef.current = setTimeout(() => { hoverTransRef.current = false; }, 500);
            }}
          >
            {isSeparator ? (
              <div className="absolute inset-0 bg-black flex items-center justify-center"
                onClick={() => {
                  if (peekShown && hScroll === 0) {
                    const gp = gridParamsRef.current;
                    const snapTarget = gp.vw - gp.s3Left;
                    animateHScroll(snapTarget);
                  }
                }}
              >
                <div className="text-white font-extrabold text-center" style={{ fontSize: 'min(14rem, 35vw)', lineHeight: 0.8, letterSpacing: '-0.04em' }}>
                  <div>PR</div>
                  <div>OJ</div>
                  <div>EC</div>
                  <div>TS</div>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover object-center transition-transform duration-500"
                  priority={isCenter}
                  sizes="100vw"
                  style={{
                    opacity: cardImgOp,
                    transform: hoveredCard === i ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  style={{ opacity: cardGradOp }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  style={{
                    opacity: cardTextOp,
                    transform: `translateY(${(1 - cardTextOp) * 20}px)`,
                    maxWidth: `var(--col-w)`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center mb-4 transition-transform duration-300"
                    style={{ transform: hoveredCard === i ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <card.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Horizontal Scrollbar (Section 3) */}
      {isMd && (() => {
        const snapT = gp.vw - gp.s3Left;
        const maxH = Math.max(0, gp.vw + (allCards.length - 5) * (gp.colW + gp.gap) + gp.colW);
        const inS3 = hScroll >= snapT;
        const s3Progress = maxH > snapT ? (hScroll - snapT) / (maxH - snapT) : 0;
        return (
          <div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ width: 300, opacity: inS3 ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
          >
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full"
                style={{ width: `${Math.max(15, Math.min(100, s3Progress * 100))}%` }}
              />
            </div>
          </div>
        );
      })()}

      {/* Legal Links */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-8 z-40 flex items-center gap-3">
        <a href="/impressum" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Impressum
        </a>
        <a href="/datenschutz" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Datenschutz
        </a>
      </div>

      {/* Contact Link */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-40 flex items-center gap-3">
        <a href="/kontakt" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Kontakt
        </a>
      </div>


      {/* Header */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-50">
        <a
          href="/"
          aria-label="Zur Startseite"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300 text-gray-900"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-2xl font-extrabold tracking-tighter">
            defuse.
          </span>
        </a>

        <nav
          aria-label="Hauptnavigation"
          className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500"
        >
          <a href="/leistungen" className="hover:text-gray-900 transition-colors">
            Leistungen
          </a>
          <a href="/referenzen" className="hover:text-gray-900 transition-colors">
            Referenzen
          </a>
          <a href="/ueber-uns" className="hover:text-gray-900 transition-colors">
            Über uns
          </a>
          <a href="/kontakt" className="hover:text-gray-900 transition-colors">
            Kontakt
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="/kontakt"
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Projekt starten
          </a>
        </div>
      </header>

      {/* ===== Scroll Snap Container ===== */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
      >
        {/* 01 — Hero */}
        <section className="relative h-screen snap-start flex flex-col items-center justify-center px-4 text-center">
          <div className="relative z-10" style={{ opacity: heroTextOp }}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl leading-tight">
              We{" "}
              <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl mx-1 text-gray-800">
                help
              </span>{" "}
              you grow
            </h1>
            <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-gray-700 w-[95%] sm:w-[80%] lg:w-1/2 mx-auto whitespace-nowrap overflow-hidden text-ellipsis font-medium">
              Die perfekte Infrastruktur, um dein Business auf das nächste Level
              zu skalieren.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/kontakt"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-transparent bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 text-center"
              >
                Projekt starten
              </a>
              <a
                href="/leistungen"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 bg-transparent font-bold hover:bg-gray-900 hover:text-white transition-all text-center"
              >
                Leistungen ansehen
              </a>
            </div>
          </div>

          <div
            className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl overflow-hidden flex flex-col items-center z-10 transition-opacity duration-150"
            style={{ opacity: partnersOpacity }}
          >
            <h2 className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-4 md:mb-6">
              Trusted by
            </h2>
            <div className="relative w-full overflow-hidden flex items-center">
              <div
                className="flex whitespace-nowrap items-center w-max"
                style={{ animation: "marquee 25s linear infinite" }}
                aria-hidden="true"
              >
                <PartnerSet />
                <PartnerSet />
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Cards (snap target) */}
        <section className="relative h-screen snap-start flex items-center justify-center px-4 md:px-8">
          {/* Mobile: horizontal scroll of all cards */}
          <div
            className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-none w-full md:hidden"
            style={{ opacity: gridOp }}
          >
            {allCards.map((card, idx) => (
              <div
                key={card.title}
                className="group shrink-0 w-[80vw]"
              >
                {'separator' in card && card.separator ? (
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                    <div className="text-white font-extrabold text-6xl leading-[0.85] tracking-tight text-center">
                      <div>PR</div>
                      <div>OJ</div>
                      <div>EC</div>
                      <div>TS</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center mb-4">
                        <card.icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
