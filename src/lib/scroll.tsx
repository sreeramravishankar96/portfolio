"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollTo: () => {}
});

export function useScroll(): ScrollContextValue {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReduced) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (typeof window === "undefined") return;

    if (prefersReduced || !lenisRef.current) {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target.startsWith("#") ? target : `#${target}`);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
      } else if (target) {
        target.scrollIntoView({ behavior: "auto" });
      }
      return;
    }

    const lenisTarget =
      typeof target === "string" && !target.startsWith("#")
        ? document.getElementById(target) ?? target
        : target;

    lenisRef.current.scrollTo(lenisTarget, {
      offset: options?.offset ?? -30,
      duration: options?.duration ?? 1.2
    });
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
