"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Hexagon,
  Users,
  Square,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const partners = [
  { name: "Vodafone", showName: true },
  { name: "Microsoft", showName: true },
  { name: "Intel", showName: false },
  { name: "Siemens", showName: false },
  { name: "O2", showName: false },
  { name: "OpenAI", showName: false },
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
    icon: BarChart3,
    title: "Business Intelligence",
    description:
      "Wir übersetzen komplexe Geschäftsprozesse in digitale Systeme — von individuellen Anwendungen über Datenarchitekturen bis zu Deep-Tech-Lösungen, die Ihre Entscheidungen messbar verbessern.",
    image: IMG_1,
  },
  {
    icon: Zap,
    title: "Web & App Development",
    description:
      "Fullstack-Entwicklung mit Next.js, Headless-Architekturen und Sanity CMS — performante, skalierbare Plattformen, die exakt auf Ihre Anforderungen zugeschnitten sind.",
    image: HERO_IMAGE,
  },
  {
    icon: ShieldCheck,
    title: "Unsere Produkte",
    description:
      "Plauderbot und Lumera.ai sind proprietäre Lösungen, die wir selbst entwickeln und betreiben — bewährte Technologie aus eigener Hand, die direkt in Ihr Projekt integriert werden kann.",
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

function VodafoneLogo() {
  return <svg height="18" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M12 0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12A12 12 0 0 0 12 0M16.25 1.12C16.57 1.12 16.9 1.15 17.11 1.22C14.94 1.67 13.21 3.69 13.22 6C13.22 6.05 13.22 6.11 13.23 6.17C16.87 7.06 18.5 9.25 18.5 12.28C18.54 15.31 16.14 18.64 12.09 18.65C8.82 18.66 5.41 15.86 5.39 11.37C5.38 8.4 7 5.54 9.04 3.85C11.04 2.19 13.77 1.13 16.25 1.12Z"/></svg>;
}

function MicrosoftLogo() {
  return <svg height="18" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h11.5v11.5H0z"/><path d="M12.5 0H24v11.5H12.5z"/><path d="M0 12.5h11.5V24H0z"/><path d="M12.5 12.5H24V24H12.5z"/></svg>;
}

function IntelLogo() {
  return <svg height="30" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053c0 .513.044.945.13 1.292.087.34.235.618.44.828.203.21.475.359.803.451.334.093.754.136 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.672.672 0 0 1-.39-.173.693.693 0 0 1-.173-.377 4.002 4.002 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241-.327.161-.6.384-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214c.018-.588.16-1.02.433-1.299.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09-.458-.495-1.1-.742-1.917-.742zm10.065.006a3.252 3.252 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.145 3.145 0 0 0-.254 1.273c0 .452.08.878.241 1.274.161.395.39.742.674 1.032.284.29.637.526 1.045.693.408.173.86.26 1.342.26 1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699-.464 0-.847-.105-1.138-.321a1.588 1.588 0 0 1-.593-.872l-.019-.056h4.915v-.587c0-.451-.08-.872-.235-1.267a3.393 3.393 0 0 0-.661-1.033 3.013 3.013 0 0 0-1.02-.692 3.345 3.345 0 0 0-1.311-.248zm-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261zm7.073 3.814a.606.606 0 0 0-.606.606.606.606 0 0 0 .606.606.606.606 0 0 0 .606-.606.606.606 0 0 0-.606-.606zm-.008.105a.5.5 0 0 1 .002 0 .5.5 0 0 1 .5.501.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .498-.5zm-.233.155v.699h.13v-.285h.093l.173.285h.136l-.18-.297a.191.191 0 0 0 .118-.056c.03-.03.05-.074.05-.136 0-.068-.02-.117-.063-.154-.037-.038-.105-.056-.185-.056zm.13.099h.154c.019 0 .037.006.056.012a.064.064 0 0 1 .037.031c.013.013.012.031.012.056a.124.124 0 0 1-.012.055.164.164 0 0 1-.037.031c-.019.006-.037.013-.056.013h-.154Z"/></svg>;
}

function SiemensLogo() {
  return <svg height="46" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M1.478 10.016c.24 0 .59.046 1.046.14v.726a2.465 2.465 0 0 0-.946-.213c-.41 0-.615.118-.615.354 0 .088.041.16.124.216.069.045.258.14.568.286.446.208.743.388.89.541.176.182.264.417.264.705 0 .415-.172.73-.516.949-.279.176-.64.264-1.085.264-.375 0-.753-.046-1.133-.139v-.755c.41.135.774.203 1.09.203.437 0 .655-.121.655-.362a.302.302 0 0 0-.095-.227c-.065-.065-.232-.155-.5-.27-.481-.208-.795-.384-.94-.53a.999.999 0 0 1-.284-.73c0-.377.137-.666.413-.864.272-.196.626-.294 1.064-.294zm21.19 0c.246 0 .565.04.956.123l.09.016v.727a2.471 2.471 0 0 0-.948-.213c-.409 0-.612.118-.612.354 0 .088.04.16.123.216.066.043.256.139.57.286.443.208.74.388.889.541.176.182.264.417.264.705 0 .415-.172.73-.514.949-.28.176-.643.264-1.087.264-.376 0-.754-.046-1.134-.139v-.755c.407.135.77.203 1.09.203.437 0 .655-.121.655-.362 0-.09-.03-.166-.092-.227-.066-.065-.233-.155-.503-.27-.48-.206-.793-.382-.94-.53a.997.997 0 0 1-.284-.732c0-.376.137-.664.413-.862.272-.196.627-.294 1.064-.294zm-12.674.066l.92 2.444.942-2.444h1.257v3.825h-.968v-2.708l-1.072 2.747h-.632l-1.052-2.747v2.708H8.67v-3.825zm-5.587 0v3.825H3.386v-3.825zm3.554 0v.692H6.327v.864H7.75v.63H6.327v.908h1.677v.73h-2.66v-3.824zm8.707 0v.692h-1.634v.864h1.422v.63h-1.422v.908h1.677v.73H14.05v-3.824zm1.898 0l1.255 2.56v-2.56h.719v3.825h-1.15l-1.288-2.595v2.595h-.72v-3.825z"/></svg>;
}

function O2Logo() {
  return <svg height="20" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M9.473.191C3.827.191 0 4.271 0 9.917c0 5.317 3.86 9.726 9.472 9.726 5.61 0 9.433-4.409 9.433-9.726C18.905 4.27 15.116.19 9.473.19zm-.002 2.77c3.677 0 5.79 3.422 5.79 6.956 0 3.314-1.785 6.956-5.79 6.956-4.007 0-5.827-3.642-5.827-6.956 0-3.534 2.148-6.956 5.827-6.956zm11.69 12.48a5.47 5.47 0 0 0-2.44.588l.13 1.367c.543-.353 1.204-.66 1.9-.66.695 0 1.34.355 1.34 1.11 0 1.509-2.791 3.84-3.558 4.584v1.38H24v-1.298h-3.36c1.344-1.32 3.1-2.924 3.1-4.668 0-1.614-1.013-2.403-2.58-2.403z"/></svg>;
}

function OpenAILogo() {
  return <svg height="20" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>;
}

const partnerLogos: Record<string, () => React.ReactNode> = {
  Vodafone: VodafoneLogo,
  Microsoft: MicrosoftLogo,
  Intel: IntelLogo,
  Siemens: SiemensLogo,
  O2: O2Logo,
  OpenAI: OpenAILogo,
};

function PartnerSet() {
  return (
    <div className="flex items-center gap-12 sm:gap-20 md:gap-32 px-6 sm:px-10 md:px-16">
      {partners.map((partner) => {
        const Logo = partnerLogos[partner.name];
        return (
          <div
            key={partner.name}
            className="partner-item flex items-center gap-2 opacity-70 cursor-pointer"
          >
            <Logo />
            {partner.showName && (
              <span className="hidden sm:inline text-sm font-semibold text-black/50">
                {partner.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ZERO = { top: 0, right: 0, bottom: 0, left: 0 };

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN = "cubic-bezier(0.7, 0, 0.84, 0)";

const MENU_LEFT = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Blog", href: "/blog" },
];

const MENU_RIGHT = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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
  const partnersRef = useRef<HTMLDivElement>(null);
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
    if (partnersRef.current) {
      partnersRef.current.style.opacity = String(1 - Math.min(ratio / 0.08, 1));
    }
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
    <>
    {/* ===== Full-Screen Menu Overlay — OUTSIDE overflow-hidden container ===== */}
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: menuOpen ? "auto" : "none" }}>
      {/* Window click area — "Hier fortsetzen" on hover, click closes */}
      <div
        onClick={() => setMenuOpen(false)}
        className="group/window cursor-pointer flex items-center justify-center"
        style={menuOpen ? {
          position: "absolute",
          top: "10vh", right: "36vw", bottom: "10vh", left: "36vw",
          borderRadius: "1.5rem",
          zIndex: 5,
          transition: [
            `top 0.9s ${EASE_OUT} 0.3s`,
            `right 0.9s ${EASE_OUT} 0.3s`,
            `bottom 0.9s ${EASE_OUT} 0.3s`,
            `left 0.9s ${EASE_OUT} 0.3s`,
          ].join(", "),
        } : {
          position: "absolute",
          top: "0", right: "0", bottom: "0", left: "0",
          borderRadius: "0",
          zIndex: 5,
          pointerEvents: "none" as const,
          transition: [
            `top 0.55s ${EASE_IN}`,
            `right 0.55s ${EASE_IN}`,
            `bottom 0.55s ${EASE_IN}`,
            `left 0.55s ${EASE_IN}`,
          ].join(", "),
        }}
      >
        <span className="text-black/0 group-hover/window:text-black/60 text-lg font-bold uppercase tracking-[0.25em] transition-all duration-300 group-hover/window:scale-110">
          Hier fortsetzen
        </span>
      </div>

      {/* White frame with window cutout (Lucram box-shadow) */}
      <div style={menuOpen ? {
        position: "absolute",
        top: "10vh", right: "36vw", bottom: "10vh", left: "36vw",
        borderRadius: "1.5rem",
        boxShadow: "0 0 0 100vmax #ffffff",
        transition: [
          `top 0.9s ${EASE_OUT} 0.3s`,
          `right 0.9s ${EASE_OUT} 0.3s`,
          `bottom 0.9s ${EASE_OUT} 0.3s`,
          `left 0.9s ${EASE_OUT} 0.3s`,
          `border-radius 0.9s ${EASE_OUT} 0.3s`,
        ].join(", "),
      } : {
        position: "absolute",
        top: "0", right: "0", bottom: "0", left: "0",
        borderRadius: "0",
        boxShadow: "0 0 0 100vmax #ffffff",
        transition: [
          `top 0.55s ${EASE_IN}`,
          `right 0.55s ${EASE_IN}`,
          `bottom 0.55s ${EASE_IN}`,
          `left 0.55s ${EASE_IN}`,
          `border-radius 0.55s ${EASE_IN}`,
        ].join(", "),
      }} />

      {/* Close button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="text-[11px] font-medium uppercase tracking-[0.25em] text-black/30 hover:text-black transition-colors cursor-pointer"
        style={{
          position: "fixed",
          top: "calc(1rem + 1rem)",
          left: "50%",
          zIndex: 10000,
          pointerEvents: menuOpen ? "auto" as const : "none" as const,
          ...(menuOpen ? {
            opacity: 1,
            transform: "translateX(-50%) translateY(0)",
            transition: `opacity 0.5s ease 1.2s, transform 0.6s ${EASE_OUT} 1.2s`,
          } : {
            opacity: 0,
            transform: "translateX(-50%) translateY(-10px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }),
        }}
      >
        Schließen
      </button>

      {/* Left — Navigation */}
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center z-10" style={{ width: "36vw" }}>
        <nav className="flex flex-col gap-4 lg:gap-6 items-end pr-8 lg:pr-12">
          {MENU_LEFT.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="menu-link text-4xl lg:text-6xl xl:text-7xl font-extralight text-gray-900 hover:text-black transition-colors pb-2"
              style={menuOpen ? {
                transform: "translateX(0)", opacity: 1,
                transition: `transform 0.7s ${EASE_OUT} ${1.25 + i * 0.07}s, opacity 0.5s ease ${1.25 + i * 0.07}s`,
              } : {
                transform: "translateX(-60px)", opacity: 0,
                transition: `transform 0.3s ${EASE_IN}, opacity 0.2s ease`,
              }}
            >{item.label}</a>
          ))}
        </nav>
      </div>

      {/* Right — Navigation */}
      <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center z-10" style={{ width: "36vw" }}>
        <nav className="flex flex-col gap-4 lg:gap-6 items-end pr-8 lg:pr-12">
          {MENU_RIGHT.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="menu-link text-4xl lg:text-6xl xl:text-7xl font-extralight text-gray-900 hover:text-black transition-colors pb-2"
              style={menuOpen ? {
                transform: "translateX(0)", opacity: 1,
                transition: `transform 0.7s ${EASE_OUT} ${1.25 + i * 0.07}s, opacity 0.5s ease ${1.25 + i * 0.07}s`,
              } : {
                transform: "translateX(60px)", opacity: 0,
                transition: `transform 0.3s ${EASE_IN}, opacity 0.2s ease`,
              }}
            >{item.label}</a>
          ))}
        </nav>
      {/* Legal Links im Menü */}
      <div
        className="absolute bottom-6 left-8 lg:bottom-8 lg:left-10 flex items-center gap-4 z-10"
        style={menuOpen ? {
          opacity: 1,
          transition: `opacity 0.5s ease 1.3s`,
        } : {
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <a href="/impressum" onClick={() => setMenuOpen(false)} className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25 hover:text-black/60 transition-colors">Impressum</a>
        <a href="/datenschutz" onClick={() => setMenuOpen(false)} className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25 hover:text-black/60 transition-colors">Datenschutz</a>
      </div>
      <div
        className="absolute bottom-6 right-8 lg:bottom-8 lg:right-10 flex items-center gap-4 z-10"
        style={menuOpen ? {
          opacity: 1,
          transition: `opacity 0.5s ease 1.3s`,
        } : {
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <a href="/kontakt" onClick={() => setMenuOpen(false)} className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25 hover:text-black/60 transition-colors">Kontakt</a>
      </div>
      </div>
    </div>

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
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-8 flex items-center gap-3" style={{ zIndex: 10001 }}>
        <a href="/impressum" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Impressum
        </a>
        <a href="/datenschutz" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Datenschutz
        </a>
      </div>

      {/* Contact Link */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 flex items-center gap-3" style={{ zIndex: 10001 }}>
        <a href="/kontakt" className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Kontakt
        </a>
      </div>


      {/* Header */}
      <header
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-50"
        style={{ opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s ease", pointerEvents: menuOpen ? "none" : "auto" }}
      >
        {/* Logo — links */}
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

        {/* Menü — Mitte */}
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Menü
        </button>

        {/* CTA — rechts */}
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
          <div className="relative z-10" style={{ opacity: menuOpen ? 0 : heroTextOp, transition: "opacity 0.4s ease" }}>
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
            ref={partnersRef}
            className="absolute left-1/2 -translate-x-1/2 w-[95%] max-w-6xl overflow-hidden flex flex-col items-center z-10"
            style={{ bottom: "44px", opacity: menuOpen ? 0 : undefined, transition: "opacity 0.4s ease" }}
          >
            <h2 className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-3">
              Trusted by
            </h2>
            <div className="marquee-wrap relative w-full overflow-hidden flex items-center">
              <div
                className="marquee-track flex whitespace-nowrap items-center w-max"
                style={{ animation: "marquee 25s linear infinite", willChange: "transform" }}
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
    </>
  );
}
