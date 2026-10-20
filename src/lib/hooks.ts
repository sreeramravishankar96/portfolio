"use client";

import { useEffect, useState, useRef } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const current = window.scrollY;
      setProgress(Math.min(Math.max(current / total, 0), 1));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
